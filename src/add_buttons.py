import os

pages_dir = "pages"

for filename in os.listdir(pages_dir):
    if filename.endswith(".jsx"):
        filepath = os.path.join(pages_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # If it hasn't been added yet
        if "Action triggered!" not in content:
            content = content.replace("<button", "<button onClick={() => alert('Action triggered!')}")

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Processed {filepath}")
