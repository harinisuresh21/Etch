from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

from db import get_all_links, get_link, save_link, get_chat_history, save_chat_message
from scraper import scrape_url
from ai_agent import summarize_content, chat_knowledge_relay

app = FastAPI(title="Etch Knowledge API")

class LinkSubmission(BaseModel):
    url: str
    title: Optional[str] = None

class ChatPrompt(BaseModel):
    message: str

@app.get("/api/links")
def get_links():
    return get_all_links()

@app.get("/api/links/{link_id}")
def get_single_link(link_id: int):
    link = get_link(link_id)
    if not link:
        raise HTTPException(status_code=404, detail="Link not found in archives.")
    return link

@app.post("/api/links")
def analyze_and_save_link(payload: LinkSubmission):
    # 1. Scrape URL
    raw_text = scrape_url(payload.url)
    if not raw_text:
        raise HTTPException(status_code=400, detail="Could not scrape content from URL.")
        
    # 2. Synthesize with Gemini
    synthesis = summarize_content(raw_text)
    
    # 3. Save to DB
    final_title = payload.title if payload.title else synthesis.get('title', 'Unknown Source')
    
    link_id = save_link(
        url=payload.url,
        title=final_title,
        short_summary=synthesis.get('short_summary', ''),
        detailed_content=synthesis.get('detailed_content', ''),
        tags=synthesis.get('tags', '')
    )
    
    return get_link(link_id)

@app.post("/api/chat")
def chat_with_lab(prompt: ChatPrompt):
    # Save user message
    save_chat_message("user", prompt.message)
    
    # Get Gemini response based on context
    response_text = chat_knowledge_relay(prompt.message)
    
    # Save AI message
    save_chat_message("assistant", response_text)
    
    return {"response": response_text}

@app.get("/api/chat/history")
def chat_history():
    return get_chat_history()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
