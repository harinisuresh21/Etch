import re

def process_file(filepath, pattern, base_class):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    parts = content.split(pattern)
    if len(parts) > 1:
        new_content = parts[0]
        # Skip injecting base class if it already exists to be idempotent
        if base_class not in parts[1]:
            for i in range(1, len(parts)):
                delay = min(i * 100, 500)
                new_content += f'{pattern}{base_class} delay-{delay} ' + parts[i]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Processed {filepath}')

process_file('src/pages/Inbox.jsx', '<article onClick={() => navigate(\'/deepdive\')} className="', 'animate-fade-in-up opacity-0-init')
process_file('src/pages/Library.jsx', '<div className="group cursor-pointer"', ' className="group cursor-pointer animate-fade-in-up opacity-0-init')

# Fix DeepDive reading typography fade-in
with open('src/pages/DeepDive.jsx', 'r', encoding='utf-8') as f:
    dd_content = f.read()

dd_content = dd_content.replace('<header className="mb-12">', '<header className="mb-12 animate-fade-in-up opacity-0-init delay-100">')
dd_content = dd_content.replace('<div className="prose prose-slate max-w-none">', '<div className="prose prose-slate max-w-none animate-fade-in-up opacity-0-init delay-200">')

with open('src/pages/DeepDive.jsx', 'w', encoding='utf-8') as f:
    f.write(dd_content)
    
print("Finished stagger animations.")
