import json
import os
import re
from collections import Counter

import google.generativeai as genai
from dotenv import load_dotenv

try:
    from .db import get_all_links, get_chat_history, search_links
    from .config.categories import ALL_CATEGORIES
except ImportError:
    from db import get_all_links, get_chat_history, search_links
    from config.categories import ALL_CATEGORIES

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
SUMMARY_MODEL_NAME = os.getenv("GEMINI_SUMMARY_MODEL", "gemini-2.5-flash")
CHAT_MODEL_NAME = os.getenv("GEMINI_CHAT_MODEL", "gemini-2.5-flash")
REQUEST_TIMEOUT_SECONDS = int(os.getenv("GEMINI_TIMEOUT_SECONDS", "20"))

STOP_WORDS = {
    "about",
    "after",
    "also",
    "article",
    "because",
    "could",
    "from",
    "have",
    "into",
    "just",
    "more",
    "page",
    "that",
    "their",
    "there",
    "these",
    "they",
    "this",
    "with",
    "would",
    "your",
}

if API_KEY:
    genai.configure(api_key=API_KEY)
    summary_model = genai.GenerativeModel(SUMMARY_MODEL_NAME)
    chat_model = genai.GenerativeModel(CHAT_MODEL_NAME)
else:
    summary_model = None
    chat_model = None


def split_sentences(text: str) -> list[str]:
    return [part.strip() for part in re.split(r"(?<=[.!?])\s+", text) if part.strip()]


def pick_title(source_title: str, text: str, source_domain: str) -> str:
    if source_title:
        return source_title[:160]
    sentences = split_sentences(text[:240]) if text else []
    if sentences:
        return sentences[0][:160]
    return source_domain or "Untitled Source"


def extract_tags(text: str, source_domain: str) -> str:
    words = re.findall(r"[A-Za-z][A-Za-z\-]{3,}", text.lower())
    filtered = [
        word
        for word in words
        if word not in STOP_WORDS and not word.startswith("http") and len(word) < 20
    ]
    counts = Counter(filtered)
    tags = [word.title() for word, _ in counts.most_common(3)]
    if source_domain and source_domain not in " ".join(tags).lower():
        tags.append(source_domain.split(".")[0].title())
    return ", ".join(tags[:3]) or "General"


def local_summarize_content(raw_content: str, source_title: str, source_domain: str) -> dict[str, str]:
    sentences = split_sentences(raw_content)
    short_summary = " ".join(sentences[:2])[:280] if sentences else raw_content[:280]
    detail_points = sentences[:5] if sentences else [raw_content[:600]]
    detailed_content = "\n".join(
        [
            "Overview",
            short_summary or "Content extracted successfully.",
            "",
            "Key points",
            *[f"- {point}" for point in detail_points if point],
        ]
    ).strip()
    return {
        "title": pick_title(source_title, raw_content, source_domain),
        "short_summary": short_summary or "Content archived successfully.",
        "detailed_content": detailed_content,
        "tags": extract_tags(raw_content, source_domain),
    }


def summarize_content(raw_content: str, source_title: str = "", source_domain: str = "") -> dict[str, str]:
    if not raw_content or len(raw_content.strip()) < 40:
        return {
            "title": pick_title(source_title, raw_content, source_domain),
            "short_summary": "The page did not expose enough readable text to create a strong summary.",
            "detailed_content": (
                "Overview\n"
                "This source was archived, but the extracted text is limited.\n\n"
                "Key points\n"
                "- The page may be blocked, highly dynamic, or require authentication.\n"
                "- Re-uploading later with a better extraction path may produce a richer archive entry."
            ),
            "tags": extract_tags(raw_content or source_title or source_domain, source_domain),
        }

    if not summary_model:
        return local_summarize_content(raw_content, source_title, source_domain)

    prompt = f"""
You are building a personal Wikipedia entry from scraped web content.
Return valid JSON with exactly these keys:
- "title": concise, useful entry title
- "short_summary": 2 or 3 sentences, under 60 words
- "detailed_content": markdown-like plain text with sections "Overview", "Key points", and "Why it matters"
- "tags": 1 to 4 comma-separated topic tags

Prefer the source title when it is accurate: {source_title or "unknown"}
Source domain: {source_domain or "unknown"}

Return only JSON.

Scraped content:
{raw_content[:12000]}
"""
    try:
        response = summary_model.generate_content(
            prompt,
            request_options={"timeout": REQUEST_TIMEOUT_SECONDS},
        )
        response_text = (response.text or "").replace("```json", "").replace("```", "").strip()
        data = json.loads(response_text)
        fallback = local_summarize_content(raw_content, source_title, source_domain)
        return {
            "title": data.get("title") or fallback["title"],
            "short_summary": data.get("short_summary") or fallback["short_summary"],
            "detailed_content": data.get("detailed_content") or fallback["detailed_content"],
            "tags": data.get("tags") or fallback["tags"],
        }
    except Exception as exc:
        print(f"[AI] Summary fallback triggered: {exc}")
        return local_summarize_content(raw_content, source_title, source_domain)


def ai_categorize(title: str, content: str, tags: str = "") -> list[str]:
    """Use AI to assign categories from the predefined taxonomy."""
    if not summary_model:
        return ["General"]
    
    from config.categories import ALL_CATEGORIES
    
    prompt = f"""
You are categorizing a saved article for a personal knowledge base.
Assign 1-3 categories from the list below that best fit the content.

Available categories:
{', '.join(ALL_CATEGORIES)}

Title: {title or "unknown"}
Tags: {tags or "none"}
Content preview: {content[:2000]}

Return ONLY a JSON array of category strings, e.g. ["Technology > Python Development", "Science > Physics"]
"""
    try:
        response = summary_model.generate_content(
            prompt,
            request_options={"timeout": REQUEST_TIMEOUT_SECONDS},
        )
        response_text = (response.text or "").replace("```json", "").replace("```", "").strip()
        categories = json.loads(response_text)
        if isinstance(categories, list):
            # Validate against known categories
            valid = [c for c in categories if c in ALL_CATEGORIES]
            return valid[:3] if valid else ["General"]
    except Exception as exc:
        print(f"[AI] Categorize fallback triggered: {exc}")
    
    return ["General"]


def build_link_context(link: dict) -> str:
    return "\n".join(
        [
            f"Title: {link.get('title') or 'Untitled'}",
            f"Source: {link.get('source_domain') or 'unknown'}",
            f"Tags: {link.get('tags') or 'General'}",
            f"Summary: {link.get('short_summary') or ''}",
            f"Details: {(link.get('detailed_content') or '')[:900]}",
        ]
    )


def local_chat_response(prompt: str, relevant_links: list[dict]) -> dict[str, object]:
    if not relevant_links:
        total = len(get_all_links())
        return {
            "response": (
                f"I could not match that question to a saved article. "
                f"Your archive currently has {total} saved link{'s' if total != 1 else ''}. "
                "Try using a topic, title fragment, or source name."
            ),
            "sources": [],
        }

    top = relevant_links[0]
    if len(relevant_links) == 1:
        response = (
            f"The closest match is '{top.get('title')}' from {top.get('source_domain') or 'the archive'}.\n\n"
            f"{top.get('short_summary')}\n\n"
            f"Key notes:\n{top.get('detailed_content')[:1200]}"
        )
    else:
        lines = ["I found these relevant archived articles:"]
        for link in relevant_links[:4]:
            lines.append(
                f"- {link.get('title')} ({link.get('source_domain') or 'unknown source'}): {link.get('short_summary')}"
            )
        response = "\n".join(lines)
    return {
        "response": response,
        "sources": [
            {
                "id": link["id"],
                "title": link.get("title"),
                "source_domain": link.get("source_domain"),
                "tags": link.get("tags"),
            }
            for link in relevant_links[:4]
        ],
    }


def chat_knowledge_relay(prompt: str) -> dict[str, object]:
    relevant_links = search_links(prompt, limit=4)
    history = get_chat_history(limit=8)

    if not chat_model:
        return local_chat_response(prompt, relevant_links)

    archive_context = "\n\n".join(
        [f"Source {index + 1}\n{build_link_context(link)}" for index, link in enumerate(relevant_links)]
    )
    if not archive_context:
        archive_context = "No strongly relevant saved source matched the query."

    history_block = "\n".join(
        [f"{item['role'].upper()}: {item['content']}" for item in history]
    )
    prompt_text = f"""
You are Etch, an archive assistant for a personal Wikipedia.
Answer using the saved sources first. If you infer something, say so.
If the user is trying to find an article, explicitly name the best matching saved items.
Keep answers concise and cite source titles naturally in the response.

Relevant saved sources:
{archive_context}

Recent chat:
{history_block}

User question:
{prompt}
"""
    try:
        response = chat_model.generate_content(
            prompt_text,
            request_options={"timeout": REQUEST_TIMEOUT_SECONDS},
        )
        text = (response.text or "").strip()
        if not text:
            raise ValueError("Empty chat response")
        return {
            "response": text,
            "sources": [
                {
                    "id": link["id"],
                    "title": link.get("title"),
                    "source_domain": link.get("source_domain"),
                    "tags": link.get("tags"),
                }
                for link in relevant_links[:4]
            ],
        }
    except Exception as exc:
        print(f"[AI] Chat fallback triggered: {exc}")
        return local_chat_response(prompt, relevant_links)


def ai_categorize(title: str, content: str, tags: str) -> list[str]:
    """Use AI to assign categories from the predefined taxonomy."""
    if not chat_model:
        return ["General"]

    category_list = ", ".join(ALL_CATEGORIES)
    prompt = f"""
Assign 1-3 categories from this predefined list to the content below.
Return ONLY a JSON array of category strings, e.g., ["Technology > Python Development", "Science > Physics"].

Categories:
{category_list}

Title: {title or "unknown"}
Tags: {tags or "none"}
Content preview: {content[:3000]}
"""
    try:
        response = chat_model.generate_content(
            prompt,
            request_options={"timeout": REQUEST_TIMEOUT_SECONDS},
        )
        text = (response.text or "").strip()
        text = text.replace("```json", "").replace("```", "").strip()
        categories = json.loads(text)
        if isinstance(categories, list) and categories:
            # Validate against allowed categories
            valid = [c for c in categories if c in ALL_CATEGORIES]
            return valid if valid else ["General"]
    except Exception as exc:
        print(f"[AI] Categorization fallback: {exc}")
    return ["General"]
