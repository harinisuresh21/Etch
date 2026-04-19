import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Inbox() {
  const navigate = useNavigate();
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

<header className="mb-16 border-l-4 border-primary pl-8 py-2">
<p className="font-label text-xs tracking-[0.3em] text-secondary uppercase mb-2">Current Volume</p>
<h1 className="font-headline text-5xl italic font-bold text-on-secondary-fixed tracking-tighter">Tuesday, Oct 24</h1>
<p className="text-on-surface-variant mt-4 max-w-md leading-relaxed">A curated selection of technical intelligence briefings, distilled for the lead archivist. All transmissions are verified via decentralized consensus.</p>
</header>

<div className="space-y-12">

<article onClick={() => navigate('/deepdive')} className="group relative bg-surface-container-low p-8 rounded-xl hover:bg-surface-container transition-all duration-500 cursor-pointer">
<div className="flex flex-col md:flex-row gap-8 items-start">
<div className="w-full md:w-2/3">
<div className="flex items-center gap-3 mb-4">
<span className="bg-primary-container text-on-primary-container font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">Quantum Computing</span>
<span className="text-outline-variant">•</span>
<time className="font-label text-[10px] text-secondary tracking-widest uppercase">08:14 UTC</time>
</div>
<h2 className="font-headline text-3xl font-bold text-on-secondary-fixed mb-4 group-hover:text-primary transition-colors leading-tight">
                            The parity-check violation in topological error correction.
                        </h2>
<p className="text-on-surface-variant text-lg leading-relaxed mb-6 font-body italic">
                            Recent experimental data suggests a recurring decoherence pattern in surface code implementations, potentially redefining our approach to cryogenic noise isolation.
                        </p>
<div className="flex flex-wrap gap-2 mb-6">
<span className="px-2 py-1 bg-surface-dim font-mono text-[10px] text-on-surface-variant border border-outline-variant/20 rounded">#surface_code</span>
<span className="px-2 py-1 bg-surface-dim font-mono text-[10px] text-on-surface-variant border border-outline-variant/20 rounded">#parity_check</span>
<span className="px-2 py-1 bg-surface-dim font-mono text-[10px] text-on-surface-variant border border-outline-variant/20 rounded">#error_correction</span>
</div>
</div>
<div className="w-full md:w-1/3 flex flex-col gap-4">
<div className="aspect-square bg-surface-container-highest rounded-lg overflow-hidden relative border border-outline-variant/10">
<img alt="abstract visualization" className="w-full h-full object-cover mix-blend-multiply opacity-80" data-alt="abstract fractal geometric pattern in deep emerald and charcoal colors resembling a microscopic silicon circuit architecture with sharp edges" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAotNApm1QFWUgc-tgrXEM7pCPTq-OLmsuMZgIw8d5rlORIOBUv9PbMY5K1xGiyslB0-je7Pw_LUAcODFn4msNBOKivzYymq9FeY6bJA9KzRYofs9Ehv2jUAC9DvHcUQrsd4hxQpupDhnlJpf8DRi38QQx8bYwXRQ1b81LtuhsO_TlMd19dDG7ZMrV6pCdeJ2D89HFIW6oyaXWJDNj49yeOlgkjVqlmiiL__41r8a2rd8h4NuDrturor-3HOzC0oIzL8nKjIsDnOQU"/>
<div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
</div>
<div className="bg-surface-container-highest p-4 rounded-lg flex justify-between items-center">
<div>
<p className="font-label text-[9px] uppercase tracking-widest text-secondary mb-1">Relevance</p>
<div className="flex gap-1">
<div className="h-1.5 w-6 bg-primary rounded-full"></div>
<div className="h-1.5 w-6 bg-primary rounded-full"></div>
<div className="h-1.5 w-6 bg-primary rounded-full"></div>
<div className="h-1.5 w-6 bg-outline-variant/30 rounded-full"></div>
</div>
</div>
<button onClick={() => alert('Action triggered!')} className="w-10 h-10 rounded-full border border-outline-variant/50 flex items-center justify-center text-primary hover:bg-primary-container hover:text-white transition-all">
<span className="material-symbols-outlined" data-icon="bookmark">bookmark</span>
</button>
</div>
</div>
</div>
</article>

<article onClick={() => navigate('/deepdive')} className="group relative bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 border-l-8 border-tertiary cursor-pointer">
<div className="flex flex-col md:flex-row gap-8 items-start">
<div className="w-full">
<div className="flex items-center gap-3 mb-4">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-tertiary scale-75" style={{ fontVariationSettings: "\'FILL\' 1" }}>star</span>
<span className="text-tertiary font-label text-[10px] font-bold tracking-widest uppercase">Editor's Choice</span>
</div>
<span className="text-outline-variant">•</span>
<span className="bg-secondary-container text-on-secondary-container font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">Distributed Systems</span>
<span className="text-outline-variant">•</span>
<time className="font-label text-[10px] text-secondary tracking-widest uppercase">04:30 UTC</time>
</div>
<h2 className="font-headline text-4xl font-bold text-on-secondary-fixed mb-4 group-hover:text-tertiary transition-colors leading-tight max-w-2xl">
                            Consensus mechanics in asynchronous high-latency environments.
                        </h2>
<div className="flex items-center gap-6 mb-6">
<div className="flex -space-x-3">
<img alt="Contributor" className="w-8 h-8 rounded-full border-2 border-surface" data-alt="close-up portrait of a thoughtful man with glasses in a scholarly environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDON-wqqs_0uA6-xGjRz0yLNZ1xe8digduISQDcg1eWBo8Ox7MQ5q_VFW7KsynOF4-F3vMO84-xtEru_slwooK9_uNzpV1AYXe99nN-_SI2dprHM1ryRACWeibfq3ER1FHe90qcOvJlQBwDn3qge1ZaPj37fedrEBHSVbxKuS9NgoSorwZd7r1l-1pJqjp9lxEek0vSOxqiRK28qutcjk9ohtRHKPOGDWrQEv7zCgG3mb2wqQEpAzmKvIi-i3u-XK-KoOPcRrkSGCQ"/>
<img alt="Contributor" className="w-8 h-8 rounded-full border-2 border-surface" data-alt="professional woman in her 40s looking directly at camera with neutral expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1zN_IBG_WgPIWAU95t8ic0JBn0A38jcqT2dmaGTXBd6nuZDl1UvDvedn63WGoQNxrwLvycyhwsIpeSMifOYEpCV8xB7Usmo4B9cO1CUEqrDZzVGrnTgKCYoGVu0mN5_t1eeoc0NO0aM2aQiEe56LtRI3ieWRU8knX2Z0evGO1NZbhzMyZsmXDk4g0wMo9VZbodEfNBSYUBsIKmWTqb_n1V9o7bsSStzVuWwPbaqffo_8pbSR2BXboVUN5j_JXTVd8rFrSZ4p6yUU"/>
</div>
<p className="text-xs font-label text-on-surface-variant tracking-wider uppercase">Archived by <span className="text-on-surface font-bold">The Curator</span> + 2 others</p>
</div>
<p className="text-on-surface-variant text-lg leading-relaxed mb-6 font-body">
                            The synthesis of Byzantine Fault Tolerance with optimistic execution models provides a new framework for interplanetary data relays where latency exceeds 20 minutes.
                        </p>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-outline-variant/20">
<div>
<p className="text-[9px] font-label text-secondary uppercase tracking-[0.2em] mb-1">Impact</p>
<p className="font-mono text-sm text-primary font-bold">CRITICAL</p>
</div>
<div>
<p className="text-[9px] font-label text-secondary uppercase tracking-[0.2em] mb-1">Status</p>
<p className="font-mono text-sm text-on-surface">PEER_REVIEWED</p>
</div>
<div>
<p className="text-[9px] font-label text-secondary uppercase tracking-[0.2em] mb-1">Confidence</p>
<p className="font-mono text-sm text-on-surface">98.4%</p>
</div>
<div className="flex justify-end items-end">
<Link className="text-primary font-label text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all" to="#">
                                    Full Text <span className="material-symbols-outlined scale-75">arrow_forward</span>
</Link>
</div>
</div>
</div>
</div>
</article>

<article onClick={() => navigate('/deepdive')} className="group relative bg-surface-container-low p-8 rounded-xl hover:bg-surface-container transition-all duration-500 cursor-pointer">
<div className="flex flex-col md:flex-row gap-8 items-start">
<div className="w-full md:w-3/4">
<div className="flex items-center gap-3 mb-4">
<span className="bg-primary-container text-on-primary-container font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">Bio-Engineering</span>
<span className="text-outline-variant">•</span>
<time className="font-label text-[10px] text-secondary tracking-widest uppercase">Yesterday 22:10</time>
</div>
<h2 className="font-headline text-3xl font-bold text-on-secondary-fixed mb-4 group-hover:text-primary transition-colors leading-tight">
                            Synthetic polypeptide strands as immutable data storage.
                        </h2>
<p className="text-on-surface-variant text-lg leading-relaxed mb-6 font-body">
                            A breakthrough in enzymatic sequencing allows for petabyte-scale archiving within organic substrates, maintaining integrity for millennia without power.
                        </p>
<div className="flex gap-4">
<div className="flex items-center gap-1.5 px-3 py-1 bg-white/50 rounded-full border border-outline-variant/30">
<span className="material-symbols-outlined text-[14px] text-primary">analytics</span>
<span className="font-label text-[10px] font-medium uppercase tracking-tighter">72 Citations</span>
</div>
<div className="flex items-center gap-1.5 px-3 py-1 bg-white/50 rounded-full border border-outline-variant/30">
<span className="material-symbols-outlined text-[14px] text-tertiary">bolt</span>
<span className="font-label text-[10px] font-medium uppercase tracking-tighter">High Energy Density</span>
</div>
</div>
</div>
<div className="w-full md:w-1/4">
<div className="h-32 bg-surface-dim rounded border border-outline-variant/20 p-3 relative overflow-hidden">
<code className="text-[9px] font-mono text-on-surface-variant block opacity-60 leading-tight">
                                struct ProteinStore {"{"}<br/>
                                  strand_id: u64,<br/>
                                  encoding: DNASeq,<br/>
                                  parity: CheckSum<br/>
                                {"}"}<br/>
                                impl Archive for Organic {"{ ... }"}
                            </code>
<div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent"></div>
</div>
</div>
</div>
</article>
</div>

<div className="mt-20 flex flex-col items-center gap-6">
<div className="h-px w-24 bg-outline-variant/30"></div>
<button onClick={() => alert('Action triggered!')} className="group flex items-center gap-4 py-4 px-10 bg-primary text-white rounded-full font-label text-sm font-bold tracking-[0.2em] uppercase hover:bg-primary-container transition-all active:scale-95 shadow-xl shadow-primary/10">
                Load Previous Archive
                <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">keyboard_double_arrow_down</span>
</button>
<p className="text-outline text-[10px] font-label uppercase tracking-widest mt-4">Showing 3 of 4,219 Transmissions</p>
</div>
</main>

<aside className="hidden xl:flex fixed left-0 top-0 h-full w-64 flex-col py-6 bg-[#f5f3ef] dark:bg-slate-900 z-30">
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

<button onClick={() => alert('Action triggered!')} className="fixed bottom-10 right-10 w-16 h-16 bg-primary-container text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all z-40 group">
<span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">add</span>
<div className="absolute right-20 bg-on-secondary-fixed text-white px-4 py-2 rounded-lg text-xs font-label tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            New Briefing
        </div>
</button>

<footer className="max-w-4xl mx-auto px-6 py-12 border-t border-outline-variant/10 text-center mb-16 xl:mb-0">
<p className="font-label text-[9px] text-outline tracking-[0.4em] uppercase">Knowledge Relay © 2023 | Established for the Perpetual Archive</p>
</footer>

<div className="xl:hidden fixed bottom-0 left-0 right-0 bg-[#fbf9f5]/90 backdrop-blur-md z-40 px-6 py-4 flex justify-between items-center shadow-[0_-4px_24px_rgba(0,0,0,0.05)] border-t border-outline-variant/20">
<Link to="/inbox" className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined text-2xl" data-icon="mail">mail</span>
<span className="font-label text-[8px] uppercase tracking-widest font-bold">Inbox</span>
</Link>
<Link to="/library" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined text-2xl" data-icon="book_2">book_2</span>
<span className="font-label text-[8px] uppercase tracking-widest">Library</span>
</Link>
<Link to="/lab" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined text-2xl" data-icon="science">science</span>
<span className="font-label text-[8px] uppercase tracking-widest">Lab</span>
</Link>
<Link to="/settings" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined text-2xl" data-icon="settings">settings</span>
<span className="font-label text-[8px] uppercase tracking-widest">Settings</span>
</Link>
</div>
    </>
  );
}
