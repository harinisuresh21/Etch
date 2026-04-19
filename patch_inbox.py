import re

with open('src/pages/Inbox.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace Imports and State
text = text.replace(
    "import React, { useState } from 'react';",
    "import React, { useState, useEffect } from 'react';"
)

state_declaration = """export default function Inbox() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [links, setLinks] = useState([]);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => { fetchLinks(); }, []);
  
  const fetchLinks = async () => {
      try {
          const res = await fetch('/api/links');
          const data = await res.json();
          setLinks(data);
      } catch(e) { console.error(e); }
  };
  
  const handleUpload = async () => {
      if(!newUrl) return;
      setLoading(true);
      try {
          const res = await fetch('/api/links', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ url: newUrl, title: newTitle })
          });
          if(res.ok) {
              setIsDialogOpen(false);
              setNewUrl('');
              setNewTitle('');
              fetchLinks();
          }
      } catch(e) { console.error(e); }
      setLoading(false);
  };
"""
text = text.replace("""export default function Inbox() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);""", state_declaration)

# Replace the giant static article list with dynamic mapping
articles_pattern = re.compile(r'<div className="space-y-12">.*?</div>\n<div className="flex justify-center mt-12"', re.DOTALL)

dynamic_articles = """<div className="space-y-12">
{links.length === 0 && <p className="text-center font-body text-slate-500 py-12">Archive empty. Upload a link to start standardizing knowledge.</p>}
{links.map((link, i) => {
    const delay = Math.min((i+1)*100, 500);
    return (
    <article key={link.id} onClick={() => navigate(`/deepdive/${link.id}`)} className={`animate-fade-in-up opacity-0-init delay-${delay} group relative bg-surface-container-low p-8 rounded-xl hover:bg-surface-container hover:-translate-y-1 hover:shadow-xl transition-all duration-500 cursor-pointer`}>
        <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary-container text-on-primary-container font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">{link.tags || 'General'}</span>
                </div>
                <h2 className="font-headline text-3xl font-bold text-on-secondary-fixed mb-4 group-hover:text-primary transition-colors leading-tight">{link.title || 'Untitled Source'}</h2>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-6 font-body italic">{link.short_summary}</p>
                <div className="text-[10px] text-outline font-label overflow-hidden text-ellipsis whitespace-nowrap opacity-60">{link.url}</div>
            </div>
        </div>
    </article>
    );
})}
</div>
<div className="flex justify-center mt-12"
"""

text = articles_pattern.sub(dynamic_articles, text)

# Map the dialog inputs
text = text.replace(
    'onChange={(e) => setNewUrl(e.target.value)}', '' # cleanup if running twice
)
text = text.replace(
    'type="url" placeholder="https://"',
    'type="url" placeholder="https://" value={newUrl} onChange={(e) => setNewUrl(e.target.value)}'
)
text = text.replace(
    'type="text" placeholder="Quantum Architecture..."',
    'type="text" placeholder="Quantum Architecture..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)}'
)

# Connect Submit Link button
submit_pattern = r"onClick=\{.*?\}\s*className=\"bg-primary text-white"
text = re.sub(submit_pattern, 'onClick={handleUpload} disabled={loading} className="disabled:opacity-50 bg-primary text-white', text)

with open('src/pages/Inbox.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Patched Inbox.jsx successfully.")
