import re

with open('src/pages/TheLab.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Imports and State
text = text.replace("import React from 'react';", "import React, { useState, useEffect } from 'react';")

state_injection = """export default function TheLab() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/chat/history');
        const data = await res.json();
        setMessages(data);
      } catch(e) { console.error(e); }
    };
    fetchHistory();
  }, []);

  const handleSend = async () => {
    if(!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection anomalous. Failed to reach synthesis engine.' }]);
    }
    setLoading(false);
  };
"""
text = text.replace("export default function TheLab() {", state_injection)

# Replace the giant static cards with dynamic chat feed
feed_pattern = re.compile(r'<div className="w-full max-w-3xl space-y-12">.*?</div>\n</div>\n\n<footer', re.DOTALL)
dynamic_feed = """<div className="w-full max-w-3xl space-y-12 pb-32">
<div className="text-center space-y-4 mb-20 animate-fade-in-up opacity-0-init delay-100">
<div className="inline-block px-4 py-1 rounded-full border border-primary/10 font-label text-[10px] tracking-[0.2em] text-primary/60 uppercase">
    Synthesis Protocol Active
</div>
<h2 className="font-headline text-5xl md:text-6xl text-on-secondary-fixed italic tracking-tight">Consult the Archives.</h2>
</div>

{messages.map((msg, i) => (
  msg.role === 'user' ? (
    <div key={i} className="flex justify-end animate-fade-in-up">
       <div className="max-w-[80%] bg-surface-dim p-4 rounded-xl rounded-tr-sm text-sm text-on-surface-variant font-body">
         {msg.content}
       </div>
    </div>
  ) : (
    <div key={i} className="group relative bg-surface-container-low p-8 rounded-xl transition-all animate-fade-in-up">
      <div className="absolute -left-4 top-8 flex flex-col items-center gap-2">
        <div className="w-1 h-12 bg-primary/20 rounded-full"></div>
        <span className="font-label text-[10px] text-primary -rotate-90 origin-left translate-y-8">VERIFIED</span>
      </div>
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <span className="font-label text-xs uppercase tracking-widest text-primary/60">Response Analysis</span>
          <span className="material-symbols-outlined text-primary/40 text-sm" data-icon="auto_awesome">auto_awesome</span>
        </header>
        <div className="font-body text-sm leading-relaxed text-on-surface-variant" dangerouslySetInnerHTML={{__html: msg.content.replace(/\\n/g, '<br/>')}} />
      </div>
    </div>
  )
))}
{loading && (
    <div className="group relative bg-surface-container-low p-8 rounded-xl animate-pulse">
        <div className="space-y-4">
            <div className="h-4 bg-outline-variant/20 rounded w-1/4"></div>
            <div className="h-4 bg-outline-variant/20 rounded w-full"></div>
            <div className="h-4 bg-outline-variant/20 rounded w-5/6"></div>
        </div>
    </div>
)}
</div>
</div>

<footer"""

text = feed_pattern.sub(dynamic_feed, text)

# Map the input area
text = text.replace(
    '<textarea className="flex-1 bg-transparent',
    '<textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }} className="flex-1 bg-transparent'
)
text = text.replace(
    '<button onClick={() => alert(\'Action triggered!\')} className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">',
    '<button onClick={handleSend} disabled={loading} className="w-12 h-12 disabled:opacity-50 disabled:scale-100 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">'
)

with open('src/pages/TheLab.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Patched TheLab.jsx successfully.")
