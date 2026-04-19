import os
import re

def convert_html_to_jsx(html_str):
    # Extract body content
    body_match = re.search(r'<body[^>]*>(.*?)</body>', html_str, re.DOTALL | re.IGNORECASE)
    if not body_match:
        return ""
    
    content = body_match.group(1)
    
    # 1. Provide self-closing for img and input
    content = re.sub(r'(<(?:img|input|br|hr)[^>]*?)(?<!/)>', r'\1 />', content)
    
    # 2. Convert class to className
    content = content.replace('class="', 'className="')
    
    # 3. Convert inline style="font-variation-settings: 'FILL' 1;" to style={{ fontVariationSettings: "'FILL' 1" }}
    def style_replacer(match):
        style_str = match.group(1)
        # simplistic conversion for the specific styles seen
        if "font-variation-settings:" in style_str:
            val = style_str.split("font-variation-settings:")[1].strip().strip(';')
            return 'style={{ fontVariationSettings: "' + val.replace("'", "\\'") + '" }}'
        return 'style={{}}'
    
    content = re.sub(r'style="([^"]*)"', style_replacer, content)
    
    # 4. Remove comments
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    
    return content.strip()

template = """import React from 'react';

export default function {name}() {{
  return (
    <>
      {content}
    </>
  );
}}
"""

files = {
    'inbox.html': 'Inbox',
    'library.html': 'Library',
    'thelab.html': 'TheLab',
    'deepdive.html': 'DeepDive'
}

for filename, comp_name in files.items():
    if not os.path.exists(filename):
        print(f"Skipping {filename}")
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()
    
    jsx = convert_html_to_jsx(html)
    
    with open(f"pages/{comp_name}.jsx", 'w', encoding='utf-8') as f:
        f.write(template.format(name=comp_name, content=jsx))
    print(f"Created pages/{comp_name}.jsx")
