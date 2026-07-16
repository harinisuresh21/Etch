from typing import Optional

import uvicorn
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl

try:
    from .ai_agent import chat_knowledge_relay, summarize_content, ai_categorize
    from .db import get_all_links, get_chat_history, get_link, save_chat_message, save_link
    from .scraper import scrape_url
    from .config.categories import rule_based_categorize
except ImportError:
    from ai_agent import chat_knowledge_relay, summarize_content, ai_categorize
    from db import get_all_links, get_chat_history, get_link, save_chat_message, save_link
    from scraper import scrape_url
    from config.categories import rule_based_categorize

app = FastAPI(title="Etch Knowledge API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LinkSubmission(BaseModel):
    url: HttpUrl
    title: Optional[str] = None


class ChatPrompt(BaseModel):
    message: str


@app.get("/api/links")
def list_links(query: Optional[str] = None, category: Optional[str] = Query(default=None)):
    links = get_all_links(query=query)
    if category:
        import json
        filtered = []
        for link in links:
            cats = json.loads(link.get("categories", "[]"))
            if any(category in c for c in cats):
                filtered.append(link)
        links = filtered
    return {
        "items": links,
        "count": len(links),
        "query": query or "",
        "category": category or "",
    }


@app.get("/api/links/{link_id}")
def get_single_link(link_id: int):
    link = get_link(link_id)
    if not link:
        raise HTTPException(status_code=404, detail="Link not found in archives.")
    return link


@app.post("/api/links")
def analyze_and_save_link(payload: LinkSubmission):
    scraped = scrape_url(str(payload.url))
    raw_text = scraped.get("raw_content", "").strip()
    synthesis = summarize_content(
        raw_text,
        source_title=scraped.get("source_title", ""),
        source_domain=scraped.get("source_domain", ""),
    )
    final_title = (
        payload.title
        or synthesis.get("title")
        or scraped.get("source_title")
        or "Untitled Source"
    ).strip()

    # Hybrid categorization: rule-based first, then AI if available
    tags = synthesis.get("tags", "")
    rule_categories = rule_based_categorize(tags, final_title, raw_text)
    ai_categories = ai_categorize(final_title, raw_text, tags) if synthesis.get("tags") else ["General"]
    # Prefer AI categories if they differ from "General", else rule-based
    categories = ai_categories if ai_categories != ["General"] else rule_categories
    import json
    categories_json = json.dumps(categories)

    link_id = save_link(
        url=scraped["url"],
        normalized_url=scraped["normalized_url"],
        title=final_title,
        source_title=scraped.get("source_title", ""),
        source_domain=scraped.get("source_domain", ""),
        short_summary=synthesis.get("short_summary", ""),
        detailed_content=synthesis.get("detailed_content", ""),
        tags=tags,
        raw_content=raw_text,
        status=scraped.get("status", "ready"),
        error_message=scraped.get("error_message") or None,
        categories=categories_json,
    )
    saved = get_link(link_id)
    if not saved:
        raise HTTPException(status_code=500, detail="Failed to save the link.")
    return saved


@app.post("/api/chat")
def chat_with_lab(prompt: ChatPrompt):
    message = prompt.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="Message is required.")

    save_chat_message("user", message)
    response_payload = chat_knowledge_relay(message)
    save_chat_message("assistant", str(response_payload.get("response", "")).strip())
    return response_payload


@app.get("/api/chat/history")
def chat_history():
    return get_chat_history()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
