import React from 'react';
import { Link } from 'react-router-dom';

export default function TheLab() {
  return (
    <>
      <aside className="hidden xl:flex fixed left-0 top-0 h-full flex-col py-6 bg-[#f5f3ef] dark:bg-slate-900 h-screen w-64 border-r-0 z-50">
<div className="px-6 mb-8">
<h1 className="font-['Newsreader'] font-bold text-[#003527] dark:text-emerald-500 text-2xl">Knowledge Relay</h1>
</div>
<nav className="flex-1 space-y-2">
<Link className="flex items-center px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-[#dbdad6] dark:hover:bg-slate-800 rounded-lg mx-2 transition-all font-['Space_Grotesk'] uppercase tracking-widest text-xs" to="/inbox">
<span className="material-symbols-outlined mr-3" data-icon="mail">mail</span>
                INBOX
            </Link>
<Link className="flex items-center px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-[#dbdad6] dark:hover:bg-slate-800 rounded-lg mx-2 transition-all font-['Space_Grotesk'] uppercase tracking-widest text-xs" to="/library">
<span className="material-symbols-outlined mr-3" data-icon="book_2">book_2</span>
                LIBRARY
            </Link>
<Link className="flex items-center px-4 py-3 bg-[#064e3b] text-white rounded-lg mx-2 font-['Space_Grotesk'] uppercase tracking-widest text-xs" to="/lab">
<span className="material-symbols-outlined mr-3" data-icon="science">science</span>
                THE_LAB
            </Link>
<Link className="flex items-center px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-[#dbdad6] dark:hover:bg-slate-800 rounded-lg mx-2 transition-all font-['Space_Grotesk'] uppercase tracking-widest text-xs" to="/settings">
<span className="material-symbols-outlined mr-3" data-icon="settings">settings</span>
                SETTINGS
            </Link>
</nav>
<div className="px-4 py-4 mt-auto border-t border-outline-variant/20">
<div className="flex items-center p-2 mb-4 bg-surface-container-highest/30 rounded-xl">
<img alt="The Curator" className="w-10 h-10 rounded-full object-cover grayscale border-2 border-primary/20" data-alt="portrait of a distinguished elderly librarian with spectacles in a softly lit archive environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtGDlSH1z7OaT8ohriRUSXLLlQ7JOPMqF2WieoFARfVZ3Q1aZyrH9uL-FFypLHQ5fEQ4a9PCRk8wsuFkgAoVUmJrHBx8KZmQ09qeecYYfREPhxmDb3vkPLWmD1oZtD0nHvNODWLKbHpa2TGaTg56A-L6ZffjdWTwcyMAaCKz3FYiEfsQxYbcd-AQ_8be1dX8y4HVa-fkVIlUccuGfLOgb9MhtAQgyig5voEKgNDAimlgxAupNJpUjzKWx_qwKkHmufRz2XlIFexq0"/>
<div className="ml-3">
<p className="font-headline font-bold text-sm text-primary">The Curator</p>
<p className="font-label text-[10px] uppercase tracking-tighter opacity-60">Lead Archivist</p>
</div>
</div>
<button onClick={() => alert('Action triggered!')} className="w-full py-2 px-4 bg-primary-container text-on-primary-container rounded-xl font-label text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                Inquire with The Curator...
            </button>
<div className="mt-4 space-y-1">
<Link className="flex items-center px-4 py-2 text-slate-500 text-[10px] font-label uppercase tracking-widest" to="#">
<span className="material-symbols-outlined text-sm mr-2" data-icon="help">help</span> Support
                </Link>
<Link className="flex items-center px-4 py-2 text-slate-500 text-[10px] font-label uppercase tracking-widest" to="#">
<span className="material-symbols-outlined text-sm mr-2" data-icon="logout">logout</span> Sign Out
                </Link>
</div>
</div>
</aside>

<main className="flex-1 ml-0 md:ml-64 relative flex flex-col h-screen">

<header className="sticky top-0 z-40 bg-[#fbf9f5] dark:bg-slate-950 backdrop-blur-md bg-opacity-90 w-full">
<div className="flex justify-between items-center px-8 py-4 w-full max-w-screen-2xl mx-auto">
<div className="flex items-center gap-8">
<span className="font-['Newsreader'] font-bold text-[#003527] dark:text-emerald-500 text-2xl">THE_LAB</span>
<nav className="hidden lg:flex gap-6">
<Link className="text-slate-500 dark:text-slate-400 font-medium font-['Newsreader'] italic text-2xl tracking-tight hover:text-[#003527] transition-colors" to="/inbox">INBOX</Link>
<Link className="text-slate-500 dark:text-slate-400 font-medium font-['Newsreader'] italic text-2xl tracking-tight hover:text-[#003527] transition-colors" to="/library">LIBRARY</Link>
<Link className="text-[#003527] dark:text-emerald-400 border-b-2 border-[#003527] dark:border-emerald-500 font-bold font-['Newsreader'] italic text-2xl tracking-tight" to="/lab">THE_LAB</Link>
</nav>
</div>
<div className="flex items-center gap-4">
<div className="relative group hidden sm:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant" data-icon="search">search</span>
<input className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary w-64" placeholder="Scan archives..." type="text"/>
</div>
<span className="material-symbols-outlined text-primary cursor-pointer" data-icon="account_circle">account_circle</span>
</div>
</div>
</header>

<div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col items-center">
<div className="w-full max-w-3xl space-y-12">

<div className="text-center space-y-4 mb-20">
<div className="inline-block px-4 py-1 rounded-full border border-primary/10 font-label text-[10px] tracking-[0.2em] text-primary/60 uppercase">
                        Active Experiment: Neural Retrieval
                    </div>
<h2 className="font-headline text-5xl md:text-6xl text-on-secondary-fixed italic tracking-tight">Synthesize your world.</h2>
</div>

<div className="group relative bg-surface-container-low p-8 rounded-xl transition-all hover:bg-surface-container transition-colors duration-500">
<div className="absolute -left-4 top-8 flex flex-col items-center gap-2">
<div className="w-1 h-12 bg-primary/20 rounded-full"></div>
<span className="font-label text-[10px] text-primary -rotate-90 origin-left translate-y-8">VERIFIED</span>
</div>
<div className="space-y-6">
<header className="flex justify-between items-center">
<span className="font-label text-xs uppercase tracking-widest text-primary/60">Response Analysis / Vol. 42</span>
<span className="material-symbols-outlined text-primary/40 text-sm" data-icon="auto_awesome">auto_awesome</span>
</header>
<div className="font-body text-lg leading-relaxed text-on-surface-variant">
                            Based on your private archives and the connected scholarly nodes, the convergence of <span className="text-primary font-semibold">asymmetric design</span> and <span className="text-primary font-semibold">cognitive load</span> suggests that intentional friction can actually enhance retention rates by 12.4%.
                        </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
<div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/10 shadow-sm">
<span className="font-label text-[10px] uppercase tracking-widest text-tertiary">Citation A</span>
<p className="text-xs font-body mt-2 leading-snug">"The Friction Principle in Digital Architecture" — Dr. Aris Thorne (2023)</p>
</div>
<div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/10 shadow-sm">
<span className="font-label text-[10px] uppercase tracking-widest text-tertiary">Citation B</span>
<p className="text-xs font-body mt-2 leading-snug">Journal of Neuro-Typography, Issue #09, Personal Library</p>
</div>
</div>
<div className="flex gap-4 pt-4 border-t border-outline-variant/10">
<button onClick={() => alert('Action triggered!')} className="flex items-center gap-2 font-label text-[10px] uppercase tracking-widest text-primary hover:text-tertiary transition-colors">
<span className="material-symbols-outlined text-base" data-icon="content_copy">content_copy</span> Copy Synthesis
                            </button>
<button onClick={() => alert('Action triggered!')} className="flex items-center gap-2 font-label text-[10px] uppercase tracking-widest text-primary hover:text-tertiary transition-colors">
<span className="material-symbols-outlined text-base" data-icon="bookmark">bookmark</span> Add to Library
                            </button>
</div>
</div>
</div>

<div className="group relative bg-surface p-8 rounded-xl">
<div className="space-y-6">
<header className="flex justify-between items-center">
<span className="font-label text-xs uppercase tracking-widest text-primary/40">Supplemental Data</span>
</header>
<div className="bg-surface-dim p-6 rounded-lg font-mono text-sm border-l-4 border-primary/30">
<code>
                                GET /api/v1/knowledge/graph?node="asymmetry"<br/>
                                STATUS: 200 OK<br/>
                                CORRELATIONS: Found 14 related nodes in "Design Philosophy".
                            </code>
</div>
</div>
</div>
</div>
</div>

<footer className="w-full bg-[#fbf9f5]/80 backdrop-blur-md pt-8 pb-10 px-6">
<div className="max-w-3xl mx-auto space-y-6">

<div className="flex flex-wrap gap-2 justify-center">
<button onClick={() => alert('Action triggered!')} className="px-4 py-2 rounded-full border border-outline-variant/30 font-label text-[11px] uppercase tracking-wider text-on-surface-variant hover:border-primary hover:text-primary transition-all bg-surface-container-lowest">
                        Summarize my recent research
                    </button>
<button onClick={() => alert('Action triggered!')} className="px-4 py-2 rounded-full border border-outline-variant/30 font-label text-[11px] uppercase tracking-wider text-on-surface-variant hover:border-primary hover:text-primary transition-all bg-surface-container-lowest">
                        Draft a thesis overview
                    </button>
<button onClick={() => alert('Action triggered!')} className="px-4 py-2 rounded-full border border-outline-variant/30 font-label text-[11px] uppercase tracking-wider text-on-surface-variant hover:border-primary hover:text-primary transition-all bg-surface-container-lowest">
                        Find contradictions in my notes
                    </button>
</div>

<div className="relative group">
<div className="absolute -inset-0.5 bg-gradient-to-r from-primary/5 to-tertiary/5 rounded-2xl blur opacity-30 group-focus-within:opacity-100 transition duration-1000"></div>
<div className="relative bg-surface-container-lowest border-b-2 border-outline-variant/40 focus-within:border-primary transition-colors flex items-end p-4 rounded-xl shadow-sm">
<textarea className="flex-1 bg-transparent border-none focus:ring-0 font-headline italic text-2xl text-primary resize-none placeholder:text-outline-variant/50 placeholder:italic min-h-[60px]" placeholder="Ask your Second Brain..." rows="1"></textarea>
<div className="flex items-center gap-3 pb-2 pr-2">
<button onClick={() => alert('Action triggered!')} className="p-2 text-primary/40 hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="attach_file">attach_file</span>
</button>
<button onClick={() => alert('Action triggered!')} className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
<span className="material-symbols-outlined" data-icon="arrow_upward">arrow_upward</span>
</button>
</div>
</div>
</div>
<p className="text-center font-label text-[9px] uppercase tracking-[0.3em] text-outline-variant">
                    Synthesis engine is currently referencing 12,431 archival entries
                </p>
</div>
</footer>
</main>

<nav className="xl:hidden fixed bottom-0 left-0 w-full bg-surface-container-highest/90 backdrop-blur-lg flex justify-around py-4 border-t-0 shadow-2xl z-50">
<Link className="flex flex-col items-center text-primary/40" to="#">
<span className="material-symbols-outlined" data-icon="mail">mail</span>
</Link>
<Link className="flex flex-col items-center text-primary/40" to="#">
<span className="material-symbols-outlined" data-icon="book_2">book_2</span>
</Link>
<Link className="flex flex-col items-center text-primary" to="#">
<span className="material-symbols-outlined" data-icon="science" data-weight="fill">science</span>
</Link>
<Link className="flex flex-col items-center text-primary/40" to="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
</Link>
</nav>
    </>
  );
}
