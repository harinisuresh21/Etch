with open('src/pages/Library.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('className=\\"group cursor-pointer', 'className=\"group cursor-pointer')

with open('src/pages/Library.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print('Fixed quotes')
