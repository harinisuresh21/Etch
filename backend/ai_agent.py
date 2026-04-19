import google.generativeai as genai
import os
import json
from dotenv import load_dotenv
from db import get_all_links, save_chat_message, get_chat_history

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

if API_KEY:
    genai.configure(api_key=API_KEY)
    
# Initialize models
summary_model = genai.GenerativeModel('gemini-2.5-flash')
chat_model = genai.GenerativeModel('gemini-2.5-flash')

def summarize_content(text: str):
    if not API_KEY:
        return {
            "title": "API Key Missing",
            "short_summary": "Please configure GEMINI_API_KEY in backend/.env",
            "detailed_content": "Cannot synthesize content without Gemini API Key.",
            "tags": "error"
        }
    
    prompt = f"""
    You are an expert archivist and technical synthesizer. 
    Read the following scraped web content and return a JSON object with EXACTLY these 4 keys:
    1. "title": A concise, fitting title for the content.
    2. "short_summary": A 2-3 sentence high-level summary of the core concepts (max 40 words).
    3. "detailed_content": A structured, formatted markdown analysis of the key insights, arguments, and takeaways. Use bullet points and paragraphs.
    4. "tags": 1 to 3 comma-separated keywords representing the topic (e.g. "Quantum Computing, Hardware").
    
    Return ONLY valid JSON, no markdown code block fences (like ```json).
    
    Scraped Content:
    {text[:10000]}
    """
    
    try:
        response = summary_model.generate_content(prompt)
        response_text = response.text.replace('```json', '').replace('```', '').strip()
        data = json.loads(response_text)
        return data
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return {
            "title": "Synthesis Failed",
            "short_summary": "The AI engine encountered an anomaly while processing the content.",
            "detailed_content": f"Raw scraped content excerpt:\n\n{text[:1000]}...",
            "tags": "error"
        }

def chat_knowledge_relay(prompt: str):
    if not API_KEY:
        return "I am currently offline. Please configure a GEMINI_API_KEY in the `.env` file to reboot the synthesis engine."
        
    links = get_all_links()
    context_builder = "User's Curated Knowledge Base (from uploaded links):\n\n"
    
    for idx, link in enumerate(links[:15]): # Use top 15 to stay within limits
        context_builder += f"--- Source {idx+1}: {link['title']} ---\n"
        context_builder += f"Summary: {link['short_summary']}\n"
        context_builder += f"Details Excerpt: {link['detailed_content'][:500]}...\n\n"

    history = get_chat_history()
    
    system_prompt = f"""
    You are 'The Curator', a highly intelligent AI assistant in an application named Knowledge Relay.
    You have direct access to the user's saved library of links and articles.
    
    {context_builder}
    
    Instructions:
    1. Answer the user's questions primarily using the information from their Curated Knowledge Base provided above.
    2. If the answer exists in their documents, cite the source title.
    3. If the user asks something NOT related to their documents, state clearly that it's not in their archives, but then provide a helpful answer from your general knowledge anyway.
    4. Maintain an articulate, slightly academic, and helpful 'librarian-like' persona.
    """
    
    chat = chat_model.start_chat()
    
    # Preload the chat history for context
    chat.history = [
        {"role": "user", "parts": [system_prompt]},
        {"role": "model", "parts": ["I have assimilated the archives. How may I assist you, researcher?"]}
    ]
    
    for msg in history[-10:]: # Load last 10 messages from DB
        gemini_role = "user" if msg['role'] == "user" else "model"
        chat.history.append({"role": gemini_role, "parts": [msg['content']]})
        
    try:
        response = chat.send_message(prompt)
        return response.text
    except Exception as e:
        print(e)
        return "The cognitive pathways experienced interference. Please try asking again."
