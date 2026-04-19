import os
import re

pages_dir = "pages"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if "from 'react-router-dom'" not in content:
        content = content.replace("import React from 'react';", "import React from 'react';\nimport { Link } from 'react-router-dom';")

    # Replace <a ... href="#">...</a> with <Link ... to="...">...</Link>
    
    # Let's target specific links to make sure
    routes_map = {
        "INBOX": "/inbox",
        "LIBRARY": "/library",
        "THE_LAB": "/lab", 
        "Lab": "/lab", # handling bottom nav case
        "Inbox": "/inbox",
        "Library": "/library",
        "SETTINGS": "/settings",
        "Settings": "/settings"
    }

    # First, replace <a> tags
    def a_replacer(match):
        pre_content = match.group(1) # <a ...
        inner_content = match.group(2) # INSIDE the <a>
        
        # Determine route based on visible text
        route = "#"
        for label, path in routes_map.items():
            if label in inner_content:
                route = path
                break
                
        # Fix the href="#" -> to="{route}"
        pre_content = pre_content.replace('href="#"', f'to="{route}"')
        
        # Ensure it turns into <Link>
        if pre_content.startswith("<a"):
            pre_content = "<Link" + pre_content[2:]
            
        return f"{pre_content}{inner_content}</Link>"
        
    content = re.sub(r'(<a[^>]*href="#">)(.*?)</a>', a_replacer, content, flags=re.DOTALL)
    
    # Second, mobile bottom nav uses <button> for navigation in DeepDive and probably others
    # Let's convert those buttons to <Link> if they contain matching text
    def btn_replacer(match):
        btn_tag = match.group(1)
        inner = match.group(2)
        
        route = None
        for label, path in routes_map.items():
            if f">{label}<" in inner or f">{label.upper()}<" in inner.upper() or f">{label.capitalize()}<" in inner:
                if "w-full" not in btn_tag: # avoid action buttons inside sidebar
                    route = path
                    break
        
        if route:
            btn_tag = btn_tag.replace("<button", f'<Link to="{route}"')
            return f"{btn_tag}>{inner}</Link>"
        
        return match.group(0)

    content = re.sub(r'(<button[^>]*>)(.*?)</button>', btn_replacer, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed {filepath}")

for filename in os.listdir(pages_dir):
    if filename.endswith(".jsx"):
        process_file(os.path.join(pages_dir, filename))
