import re
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

try:
    from playwright.sync_api import sync_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False
    print("[WARNING] Playwright not installed. Install with: pip install playwright")


def _extract_title(soup: BeautifulSoup) -> str:
    title_tag = soup.find("title")
    if title_tag and title_tag.get_text().strip():
        return title_tag.get_text().strip()
    og_title = soup.find("meta", attrs={"property": "og:title"})
    if og_title and og_title.get("content"):
        return og_title.get("content")
    return ""


def _extract_domain(url: str) -> str:
    parsed = urlparse(url)
    domain = parsed.netloc.lower()
    return domain


def _normalize_url(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path.rstrip("/")
    return f"{parsed.scheme}://{parsed.netloc}{path}" if path else f"{parsed.scheme}://{parsed.netloc}"


def scrape_url(url: str) -> dict:
    """
    Scrape URL content with smart fallback strategies.
    Returns a dict with keys: raw_content, source_title, source_domain, url, normalized_url, status, error_message
    """
    source_domain = _extract_domain(url)
    normalized_url = _normalize_url(url)

    # Sites known to require JS rendering - skip straight to Playwright
    js_heavy_domains = {'msn.com', 'linkedin.com', 'twitter.com', 'x.com', 'instagram.com', 'facebook.com', 'reddit.com'}
    skip_to_playwright = any(domain in source_domain for domain in js_heavy_domains)

    try:
        # Try simple HTTP request first (unless we know it's JS-heavy)
        if not skip_to_playwright:
            text = scrape_with_requests(url)
            if text and len(text.strip()) > 20:
                print(f"[SCRAPER] Successfully scraped with requests: {len(text)} chars")
                soup = BeautifulSoup(requests.get(url, headers=_default_headers(), timeout=10).content, "html.parser")
                source_title = _extract_title(soup)
                return _result(url, normalized_url, source_domain, text, source_title)

        # Render page with a headless browser (handles JS-heavy sites like MSN)
        if PLAYWRIGHT_AVAILABLE:
            print(f"[SCRAPER] Trying Playwright rendering for {url}")
            browser_text, browser_title = scrape_with_playwright(url)
            if browser_text and len(browser_text.strip()) > 20:
                print(f"[SCRAPER] Successfully scraped with Playwright: {len(browser_text)} chars")
                return _result(url, normalized_url, source_domain, browser_text, browser_title)
            else:
                print(f"[SCRAPER] Playwright returned empty/short content for {url}")

        # Try to extract metadata (works even for blocked sites)
        print(f"[SCRAPER] Main content extraction failed, trying metadata extraction...")
        metadata = extract_metadata(url)
        if metadata and len(metadata.strip()) > 80:
            print(f"[SCRAPER] Successfully extracted metadata: {len(metadata)} chars")
            soup = BeautifulSoup(requests.get(url, headers=_default_headers(), timeout=10).content, "html.parser")
            source_title = _extract_title(soup)
            return _result(url, normalized_url, source_domain, metadata, source_title)

        # Try to get any text at all
        print(f"[SCRAPER] Metadata extraction failed, trying fallback...")
        fallback = extract_any_text(url)
        if fallback and len(fallback.strip()) > 40:
            print(f"[SCRAPER] Successfully extracted fallback text: {len(fallback)} chars")
            return _result(url, normalized_url, source_domain, fallback)

        # Ultimate fallback: use URL as content
        print(f"[SCRAPER] All methods failed, using URL as content...")
        return _result(url, normalized_url, source_domain, f"Content from: {url}", status="error", error_message="Could not extract any content")

    except Exception as e:
        print(f"[SCRAPER] Error in scrape_url: {e}")
        return _result(url, normalized_url, source_domain, f"Content from: {url}", status="error", error_message=str(e))


def _result(url: str, normalized_url: str, source_domain: str, raw_content: str,
            source_title: str = "", status: str = "ready", error_message: str = "") -> dict:
    return {
        "url": url,
        "normalized_url": normalized_url,
        "source_title": source_title,
        "source_domain": source_domain,
        "raw_content": raw_content,
        "status": status,
        "error_message": error_message,
    }


def _default_headers() -> dict:
    return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
    }

def scrape_with_requests(url: str) -> str:
    """Scrape using simple requests + BeautifulSoup"""
    try:
        response = requests.get(url, headers=_default_headers(), timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Remove script and style elements, nav, footer, sidebar, ads
        for element in soup(["script", "style", "nav", "footer", "aside", "noscript"]):
            element.extract()
        
        # Remove common ad and tracking elements
        for element in soup.select('[class*="ad"], [id*="ad"], [class*="sidebar"], [id*="sidebar"], [class*="related"], [id*="related"], [class*="advertisement"]'):
            element.extract()
        
        # Try to find main article content
        article_text = ""
        
        # Strategy 1: Look for <article> tag
        article = soup.find('article')
        if article:
            article_text = article.get_text()
        
        # Strategy 2: Look for common main content containers
        if not article_text:
            main_content = soup.find(['main', 'div[role="main"]'])
            if main_content:
                article_text = main_content.get_text()
        
        # Strategy 3: Look for divs with common content class names
        if not article_text:
            for class_name in ['content', 'post-content', 'article-content', 'entry-content', 'page-content', 'story-body', 'feed-item', 'body-content', 'article-body']:
                content_div = soup.find('div', class_=re.compile(class_name, re.I))
                if content_div:
                    article_text = content_div.get_text()
                    break
        
        # Strategy 4: Look for specific news site patterns
        if not article_text:
            # MSN, news sites often use these patterns
            for selector in ['div[data-testid="article-body"]', 'div[data-testid="content"]', 'div.article', 'div.news-content']:
                elements = soup.select(selector)
                if elements:
                    article_text = ' '.join([e.get_text() for e in elements])
                    break
        
        # Strategy 5: If still nothing, use paragraphs and headings
        if not article_text:
            text_elements = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'li', 'span'])
            if text_elements:
                article_text = ' '.join([e.get_text() for e in text_elements if e.get_text().strip()])
            else:
                # Last resort: get all text from body
                body = soup.find('body')
                if body:
                    article_text = body.get_text()
                else:
                    article_text = soup.get_text()
        
        # Clean up the text
        lines = (line.strip() for line in article_text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = ' '.join(chunk for chunk in chunks if chunk).strip()
        
        # Return text even if it's shorter than before - better than nothing
        return text[:15000]
        
    except Exception as e:
        print(f"[SCRAPER] Error with requests for {url}: {e}")
        return ""

def scrape_with_playwright(url: str) -> tuple[str, str]:
    """Render JS-heavy pages with Playwright and extract text. Returns (text, title)."""
    if not PLAYWRIGHT_AVAILABLE:
        return "", ""
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
            page = browser.new_page()
            page.set_extra_http_headers({
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            })
            page.goto(url, wait_until='networkidle', timeout=20000)
            page.wait_for_timeout(2000)
            title = page.title()
            html = page.content()
            browser.close()

            soup = BeautifulSoup(html, 'html.parser')
            for element in soup(["script", "style", "nav", "footer", "aside", "noscript"]):
                element.extract()
            for element in soup.select('[class*="ad"], [id*="ad"], [class*="sidebar"], [id*="sidebar"], [class*="related"], [id*="related"], [class*="advertisement"]'):
                element.extract()

            article_text = ""
            if 'linkedin.com' in url:
                for selector in ['article', 'div[class*="feed"]', 'div[class*="update"]', 'div[class*="comments"]']:
                    element = soup.select_one(selector)
                    if element:
                        article_text = element.get_text(separator=' ')
                        break
            elif 'msn.com' in url:
                for selector in ['article', 'div[class*="statis"]', 'div[class*="storyBody"]', 'div[class*="articleBody"]', 'div[data-id]']:
                    elements = soup.select(selector)
                    if elements:
                        article_text = ' '.join([e.get_text(separator=' ') for e in elements])
                        break
            else:
                article = soup.find('article')
                if article:
                    article_text = article.get_text(separator=' ')
                else:
                    main_content = soup.find(['main', 'div[role="main"]'])
                    if main_content:
                        article_text = main_content.get_text(separator=' ')
            if not article_text:
                text_elements = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'li', 'span'])
                article_text = ' '.join([e.get_text(separator=' ') for e in text_elements if e.get_text().strip()])

            lines = (line.strip() for line in article_text.splitlines())
            chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
            text = ' '.join(chunk for chunk in chunks if chunk).strip()
            return text[:15000], title
    except Exception as e:
        print(f"[SCRAPER] Error with Playwright for {url}: {e}")
        return "", ""

def extract_metadata(url: str) -> str:
    """
    Extract metadata from page when main content is not accessible.
    Works for blocked sites like LinkedIn, Instagram, etc.
    Pulls: title, description, og:description, og:image, keywords
    """
    try:
        response = requests.get(url, headers=_default_headers(), timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        metadata_parts = []
        
        # Extract title (most important)
        title = soup.find('title')
        if title and title.get_text().strip():
            title_text = title.get_text().strip()
            metadata_parts.append(f"Title: {title_text}")
        
        # Extract meta description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc and meta_desc.get('content'):
            metadata_parts.append(meta_desc.get('content'))
        
        # Extract og:description (for social media posts)
        og_desc = soup.find('meta', attrs={'property': 'og:description'})
        if og_desc and og_desc.get('content'):
            metadata_parts.append(og_desc.get('content'))
        
        # Extract og:title
        og_title = soup.find('meta', attrs={'property': 'og:title'})
        if og_title and og_title.get('content'):
            metadata_parts.append(og_title.get('content'))
        
        # Extract twitter:description
        twitter_desc = soup.find('meta', attrs={'name': 'twitter:description'})
        if twitter_desc and twitter_desc.get('content'):
            metadata_parts.append(twitter_desc.get('content'))
        
        # Extract keywords
        meta_keywords = soup.find('meta', attrs={'name': 'keywords'})
        if meta_keywords and meta_keywords.get('content'):
            metadata_parts.append(f"Keywords: {meta_keywords.get('content')}")
        
        # If we have a title but no other content, that's still valuable
        if metadata_parts and len(' '.join(metadata_parts)) > 10:
            combined = ' '.join(metadata_parts)
            lines = (line.strip() for line in combined.splitlines())
            chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
            text = ' '.join(chunk for chunk in chunks if chunk).strip()
            return text[:15000]
        
        # Remove script and style for paragraph extraction
        for element in soup(["script", "style", "nav", "footer"]):
            element.extract()
        
        # Extract all paragraphs as fallback (first 20 for content-heavy sites)
        paragraphs = soup.find_all('p')
        if paragraphs:
            para_text = ' '.join([p.get_text().strip() for p in paragraphs[:20] if p.get_text().strip()])
            if para_text and len(para_text) > 5:  # Very low threshold
                metadata_parts.append(para_text)
        
        # If still empty, try to get text from common content containers
        if not metadata_parts or len(' '.join(metadata_parts)) < 15:
            # Try to find main content div
            main_content = soup.find(['main', 'article', 'section[role="main"]', 'div[role="main"]'])
            if main_content:
                content_text = main_content.get_text().strip()
                if content_text and len(content_text) > 5:
                    metadata_parts.append(content_text[:3000])  # More chars
        
        # Try to find any div with substantial text content
        if not metadata_parts or len(' '.join(metadata_parts)) < 15:
            all_divs = soup.find_all('div')
            for div in all_divs[:50]:  # Check first 50 divs
                div_text = div.get_text().strip()
                if div_text and len(div_text) > 20:  # Substantial text
                    metadata_parts.append(div_text[:2000])
                    break
        
        # Combine and clean
        combined = ' '.join(metadata_parts)
        lines = (line.strip() for line in combined.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = ' '.join(chunk for chunk in chunks if chunk).strip()
        
        return text[:15000]
        
    except Exception as e:
        print(f"[SCRAPER] Error extracting metadata: {e}")
        return f"Content from: {url}"

def extract_any_text(url: str) -> str:
    """
    Last resort: extract any text content from the page
    """
    try:
        response = requests.get(url, headers=_default_headers(), timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'html.parser')

        # Remove scripts and styles
        for element in soup(["script", "style"]):
            element.extract()

        # Get all text content
        text = soup.get_text()

        # Clean up
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        cleaned_text = ' '.join(chunk for chunk in chunks if chunk).strip()

        # If we have meaningful text, return it
        if len(cleaned_text) > 20:
            return cleaned_text[:15000]

        return ""

    except Exception as e:
        print(f"[SCRAPER] Error in extract_any_text: {e}")
        return ""
