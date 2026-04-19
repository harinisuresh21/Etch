import re

with open('src/pages/DeepDive.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace React imports
text = text.replace("import React from 'react';", "import React, { useState, useEffect } from 'react';")
text = text.replace("import { Link } from 'react-router-dom';", "import { Link, useParams } from 'react-router-dom';")

# Add state and effect
state_injection = """export default function DeepDive() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/links/${id}`);
        if(res.ok) {
           const data = await res.json();
           setArticle(data);
        }
      } catch(e) { console.error(e); }
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  if(loading) return <div className="min-h-screen flex items-center justify-center font-headline text-3xl italic text-primary">Accessing Archives...</div>;
  if(!article) return <div className="min-h-screen flex items-center justify-center font-headline text-3xl italic text-error">Architectural Anomaly: Record Not Found.</div>;

"""
text = text.replace("export default function DeepDive() {", state_injection)

# Replace Title
text = re.sub(
    r'<h1 className="font-headline text-4xl md:text-6xl text-on-secondary-fixed font-bold tracking-tight leading-tight mb-8">.*?</h1>',
    '<h1 className="font-headline text-4xl md:text-6xl text-on-secondary-fixed font-bold tracking-tight leading-tight mb-8">{article.title}</h1>',
    text,
    flags=re.DOTALL
)

# Replace Summary in the header
text = re.sub(
    r'<p className="font-body text-xl md:text-2xl text-on-surface-variant italic leading-relaxed">.*?</p>',
    '<p className="font-body text-xl md:text-2xl text-on-surface-variant italic leading-relaxed">{article.short_summary}</p>',
    text,
    flags=re.DOTALL
)

# Replace Detailed Content
content_pattern = re.compile(r'<div className="prose prose-slate max-w-none animate-fade-in-up opacity-0-init delay-200">.*?</div>\n\n<footer', re.DOTALL)
dynamic_content = """<div className="prose prose-slate max-w-none animate-fade-in-up opacity-0-init delay-200" dangerouslySetInnerHTML={{__html: article.detailed_content}} />
<footer"""

text = content_pattern.sub(dynamic_content, text)

# Map tags in DeepDive
tag_pattern = re.compile(r'<div className="flex flex-wrap gap-2 mb-8">.*?</div>', re.DOTALL)
dynamic_tags = """<div className="flex flex-wrap gap-2 mb-8">
{article.tags?.split(',').map((tag, i) => (
    <span key={i} className="px-3 py-1.5 bg-surface-dim font-label text-[10px] text-tertiary border border-outline-variant/20 rounded-md uppercase tracking-wider">{tag.trim()}</span>
))}
</div>"""

text = tag_pattern.sub(dynamic_tags, text, count=1) 

with open('src/pages/DeepDive.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Patched DeepDive.jsx successfully.")
