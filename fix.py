import re
with open('src/pages/Library.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

fixed_text = re.sub(
    r'<div className=\"group cursor-pointer\" className=\"group cursor-pointer animate-fade-in-up opacity-0-init delay-(\d+) >\s*',
    r'<div className=\"group cursor-pointer animate-fade-in-up opacity-0-init delay-\1\">\n',
    text
)

with open('src/pages/Library.jsx', 'w', encoding='utf-8') as f:
    f.write(fixed_text)
print('Fixed Library syntax')
