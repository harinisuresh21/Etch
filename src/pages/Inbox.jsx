import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Inbox() {
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

  return (
    <>
      <div className="fixed inset-0 grain-overlay z-50 pointer-events-none"></div>

<nav className="bg-[#fbf9f5] dark:bg-slate-950 backdrop-blur-md bg-opacity-90 sticky top-0 z-40">
<div className="flex justify-between items-center px-8 py-4 w-full max-w-screen-2xl mx-auto">
<div className="flex items-center gap-12">
<span className="font-['Newsreader'] font-bold text-[#003527] dark:text-emerald-500 text-2xl tracking-tight">Knowledge Relay</span>
<div className="hidden md:flex items-center gap-8">
<Link className="text-[#003527] dark:text-emerald-400 border-b-2 border-[#003527] dark:border-emerald-500 font-bold font-label text-xs tracking-widest uppercase" to="/inbox">INBOX</Link>
<Link className="text-slate-500 dark:text-slate-400 font-medium font-label text-xs tracking-widest hover:text-[#003527] dark:hover:text-emerald-300 transition-colors duration-300 uppercase" to="/library">LIBRARY</Link>
<Link className="text-slate-500 dark:text-slate-400 font-medium font-label text-xs tracking-widest hover:text-[#003527] dark:hover:text-emerald-300 transition-colors duration-300 uppercase" to="/lab">THE_LAB</Link>
<Link className="text-slate-500 dark:text-slate-400 font-medium font-label text-xs tracking-widest hover:text-[#003527] dark:hover:text-emerald-300 transition-colors duration-300 uppercase" to="/settings">SETTINGS</Link>
</div>
</div>
<div className="flex items-center gap-6">
<div className="relative hidden sm:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline scale-75">search</span>
<input className="bg-surface-container-lowest border-none border-b border-outline-variant/50 focus:border-primary focus:ring-0 text-sm pl-10 pr-4 py-2 w-64 rounded-xl" placeholder="Query the archive..." type="text"/>
</div>
<button onClick={() => alert('Action triggered!')} className="text-primary hover:opacity-80 transition-opacity">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
</button>
</div>
</div>
</nav>
<main className="max-w-4xl mx-auto px-6 py-16">

<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-16 gap-6">
<header className="border-l-4 border-primary pl-8 py-2">
<p className="font-label text-xs tracking-[0.3em] text-secondary uppercase mb-2">Current Volume</p>
<h1 className="font-headline text-5xl italic font-bold text-on-secondary-fixed tracking-tighter">Tuesday, Oct 24</h1>
<p className="text-on-surface-variant mt-4 max-w-md leading-relaxed">A curated selection of technical intelligence briefings, distilled for the lead archivist. All transmissions are verified via decentralized consensus.</p>
</header>
<button 
  onClick={() => setIsDialogOpen(true)} className="bg-primary text-white px-6 py-3 rounded-lg font-label text-xs uppercase tracking-widest shadow-md hover:bg-primary/90 transition-colors flex items-center gap-2 self-start">
  <span className="material-symbols-outlined text-sm">add_link</span>
  Upload Link
</button>
</div>

<div className="space-y-12">
{links.length === 0 && <p className="text-center font-body text-slate-500 py-12">Archive empty. Upload a link to start standardizing knowledge.</p>}
{links.map((link, i) => {
    const delay = Math.min((i+1)*100, 500);
    return (
    <article key={link.id} onClick={() => navigate(`/deepdive/${link.id}`)} className={`animate-fade-in-up opacity-0-init delay-${delay} group relative bg-surface-container-low p-8 rounded-xl hover:bg-surface-container hover:-translate-y-1 hover:shadow-xl transition-all duration-500 cursor-pointer`}>
        <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary-container text-on-primary-container font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">{link.tags || 'General'}</span>
                    <span className="text-outline-variant">•</span>
                    <time className="font-label text-[10px] text-secondary tracking-widest uppercase">ID: {link.id}</time>
                </div>
                <h2 className="font-headline text-3xl font-bold text-on-secondary-fixed mb-4 group-hover:text-primary transition-colors leading-tight">
                    {link.title || 'Untitled Source'}
                </h2>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-6 font-body italic">
                    {link.short_summary}
                </p>
                <div className="text-[10px] text-outline font-label overflow-hidden text-ellipsis whitespace-nowrap opacity-60">
                    {link.url}
                </div>
            </div>
        </div>
    </article>
    );
})}
</div>
</main>

<aside className="animate-fade-in-right opacity-0-init hidden xl:flex fixed left-0 top-0 h-full w-64 flex-col py-6 bg-[#f5f3ef] dark:bg-slate-900 z-30">
<div className="px-8 mb-12">
<div className="flex items-center gap-3 mb-8">
<div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-inner">
<span className="material-symbols-outlined">menu_book</span>
</div>
<div>
<h3 className="font-headline font-bold text-primary leading-tight">The Curator</h3>
<p className="font-label text-[9px] text-secondary tracking-widest uppercase">Lead Archivist</p>
</div>
</div>
<nav className="space-y-1">
<Link className="flex items-center gap-4 px-4 py-3 bg-[#064e3b] text-white rounded-lg mx-2 transition-all" to="/inbox">
<span className="material-symbols-outlined text-[20px]" data-icon="mail">mail</span>
<span className="font-['Space_Grotesk'] uppercase tracking-widest text-xs">INBOX</span>
</Link>
<Link className="flex items-center gap-4 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-[#dbdad6] dark:hover:bg-slate-800 rounded-lg mx-2 transition-all" to="/library">
<span className="material-symbols-outlined text-[20px]" data-icon="book_2">book_2</span>
<span className="font-['Space_Grotesk'] uppercase tracking-widest text-xs">LIBRARY</span>
</Link>
<Link className="flex items-center gap-4 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-[#dbdad6] dark:hover:bg-slate-800 rounded-lg mx-2 transition-all" to="/lab">
<span className="material-symbols-outlined text-[20px]" data-icon="science">science</span>
<span className="font-['Space_Grotesk'] uppercase tracking-widest text-xs">THE_LAB</span>
</Link>
<Link className="flex items-center gap-4 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-[#dbdad6] dark:hover:bg-slate-800 rounded-lg mx-2 transition-all" to="/settings">
<span className="material-symbols-outlined text-[20px]" data-icon="settings">settings</span>
<span className="font-['Space_Grotesk'] uppercase tracking-widest text-xs">SETTINGS</span>
</Link>
</nav>
</div>
<div className="mt-auto px-8 space-y-6">
<div className="bg-surface p-4 rounded-lg border border-outline-variant/30">
<p className="font-label text-[9px] text-secondary uppercase tracking-widest mb-3">Quick Action</p>
<button onClick={() => alert('Action triggered!')} className="w-full text-left font-headline italic text-sm text-primary hover:opacity-70 transition-opacity">
                    Inquire with The Curator...
                </button>
</div>
<div className="space-y-1">
<Link className="flex items-center gap-4 px-4 py-2 text-slate-500 hover:text-primary transition-all" to="#">
<span className="material-symbols-outlined text-[18px]" data-icon="help">help</span>
<span className="font-['Space_Grotesk'] uppercase tracking-widest text-[10px]">Support</span>
</Link>
<Link className="flex items-center gap-4 px-4 py-2 text-slate-500 hover:text-error transition-all" to="#">
<span className="material-symbols-outlined text-[18px]" data-icon="logout">logout</span>
<span className="font-['Space_Grotesk'] uppercase tracking-widest text-[10px]">Sign Out</span>
</Link>
</div>
</div>
</aside>

<button onClick={() => alert('Action triggered!')} className="fixed bottom-10 right-10 w-16 h-16 animate-float bg-primary-container text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all z-40 group">
<span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">add</span>
<div className="absolute right-20 bg-on-secondary-fixed text-white px-4 py-2 rounded-lg text-xs font-label tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            New Briefing
        </div>
</button>

<footer className="max-w-4xl mx-auto px-6 py-12 border-t border-outline-variant/10 text-center mb-16 xl:mb-0">
<p className="font-label text-[9px] text-outline tracking-[0.4em] uppercase">Knowledge Relay © 2023 | Established for the Perpetual Archive</p>
</footer>

<nav className="xl:hidden fixed bottom-0 left-0 w-full bg-surface-container-highest/90 backdrop-blur-lg flex justify-around py-4 border-t-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-50">
<Link className="flex flex-col items-center text-primary" to="/inbox">
<span className="material-symbols-outlined" data-icon="mail" data-weight="fill">mail</span>
</Link>
<Link className="flex flex-col items-center text-primary/40" to="/library">
<span className="material-symbols-outlined" data-icon="book_2">book_2</span>
</Link>
<Link className="flex flex-col items-center text-primary/40" to="/lab">
<span className="material-symbols-outlined" data-icon="science">science</span>
</Link>
<Link className="flex flex-col items-center text-primary/40" to="/settings">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
</Link>
</nav>

{isDialogOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
    <div className="bg-surface-container-lowest animate-fade-in-up w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/20 p-8 relative">
      <button 
        onClick={() => setIsDialogOpen(false)} 
        className="absolute top-4 right-4 text-outline-variant hover:text-on-surface transition-colors"
      >
        <span className="material-symbols-outlined">close</span>
      </button>
      <h2 className="font-headline text-2xl font-bold text-primary mb-2">Upload Resource Link</h2>
      <p className="text-sm font-body text-on-surface-variant mb-6">Archive a new technical briefing into the current volume.</p>
      
      <div className="space-y-4">
        <div>
          <label className="block font-label text-xs tracking-widest uppercase text-secondary mb-1">URL</label>
          <input type="url" placeholder="https://" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="w-full bg-surface-dim border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary text-sm px-4 py-3" />
        </div>
        <div>
          <label className="block font-label text-xs tracking-widest uppercase text-secondary mb-1">Brief Title (Optional)</label>
          <input type="text" placeholder="Quantum Architecture..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full bg-surface-dim border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary text-sm px-4 py-3" />
        </div>
        
        <div className="pt-4 flex justify-end gap-3">
          <button 
            onClick={() => setIsDialogOpen(false)} 
            className="px-6 py-2 rounded-lg font-label text-xs uppercase tracking-widest hover:bg-surface-dim transition-colors text-slate-600 border border-outline-variant/30"
          >
            Cancel
          </button>
          <button 
            onClick={handleUpload} disabled={loading} className="disabled:opacity-50 bg-primary text-white px-6 py-2 rounded-lg font-label text-xs uppercase tracking-widest shadow hover:shadow-lg transition-all"
          >
            Submit Link
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
}
