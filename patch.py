import glob

files = ['src/pages/Inbox.jsx', 'src/pages/TheLab.jsx', 'src/pages/Library.jsx']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Target aside block
    content = content.replace('<aside className="hidden xl:flex fixed left-0 top-0 ', '<aside className="animate-fade-in-right opacity-0-init hidden xl:flex fixed left-0 top-0 ')
    
    # Also add standard hover physics to standard articles and buttons
    # In Library: 'journal-cover'
    content = content.replace('className="journal-cover', 'className="journal-cover hover:-translate-y-2 hover:shadow-2xl transition-all duration-300')
    
    # Inbox: articles
    content = content.replace('hover:bg-surface-container transition-all duration-500', 'hover:bg-surface-container hover:-translate-y-1 hover:shadow-xl transition-all duration-500')
    
    # Floating buttons
    content = content.replace('fixed bottom-10 right-10 w-16 h-16', 'fixed bottom-10 right-10 w-16 h-16 animate-float')
    content = content.replace('fixed bottom-12 right-12 w-16 h-16', 'fixed bottom-12 right-12 w-16 h-16 animate-float')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print('Patched sidebars and hover effects in Inbox and Library.')
