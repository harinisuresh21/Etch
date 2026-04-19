import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function DeepDive() {
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


  return (
    <>
      <div className="fixed inset-0 parchment-grain z-0"></div>

<nav className="bg-[#fbf9f5] dark:bg-slate-950 backdrop-blur-md bg-opacity-90 sticky top-0 z-50">
<div className="flex justify-between items-center px-8 py-4 w-full max-w-screen-2xl mx-auto">
<div className="flex items-center gap-8">
<span className="font-['Newsreader'] font-bold text-[#003527] dark:text-emerald-500 text-2xl tracking-tighter">Knowledge Relay</span>
<div className="hidden md:flex gap-6 items-center">
<Link className="text-slate-500 dark:text-slate-400 font-medium font-label uppercase tracking-widest text-xs hover:text-[#003527] transition-colors duration-300" to="/inbox">INBOX</Link>
<Link className="text-[#003527] dark:text-emerald-400 border-b-2 border-[#003527] dark:border-emerald-500 font-bold font-label uppercase tracking-widest text-xs" to="/library">LIBRARY</Link>
<Link className="text-slate-500 dark:text-slate-400 font-medium font-label uppercase tracking-widest text-xs hover:text-[#003527] transition-colors duration-300" to="/lab">THE_LAB</Link>
<Link className="text-slate-500 dark:text-slate-400 font-medium font-label uppercase tracking-widest text-xs hover:text-[#003527] transition-colors duration-300" to="/settings">SETTINGS</Link>
</div>
</div>
<div className="flex items-center gap-4">
<div className="hidden lg:flex items-center bg-surface-container px-4 py-2 rounded-xl text-on-surface-variant">
<span className="material-symbols-outlined text-lg mr-2" data-icon="search">search</span>
<span className="font-label text-xs uppercase tracking-wider">Search Archives...</span>
</div>
<div className="p-2 cursor-pointer transition-transform active:opacity-80 active:scale-95">
<span className="material-symbols-outlined text-primary text-2xl" data-icon="account_circle">account_circle</span>
</div>
</div>
</div>
</nav>
<main className="relative z-10 max-w-screen-2xl mx-auto grid grid-cols-12 gap-0 lg:gap-12 min-h-screen">

<div className="col-span-12 lg:col-span-8 bg-surface-container-lowest lg:shadow-[0px_12px_32px_rgba(27,28,26,0.06)] px-6 md:px-16 py-12 md:py-20">

<header className="mb-12 animate-fade-in-up opacity-0-init delay-100">
<div className="flex items-center gap-3 mb-6">
<span className="px-3 py-1 bg-tertiary-container text-on-tertiary-fixed font-label text-[10px] tracking-widest uppercase rounded-full">Editor's Choice</span>
<span className="text-on-surface-variant font-label text-[10px] tracking-widest uppercase">Published March 14, 2024</span>
</div>
<h1 className="font-headline italic text-5xl md:text-7xl text-on-secondary-fixed tracking-tighter leading-[1.1] mb-8">
                    The Architecture of Neural Synchrony in Scalable Systems
                </h1>
<div className="flex items-center gap-4 border-t border-outline-variant border-opacity-20 pt-8">
<div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
<img alt="Author" className="w-full h-full object-cover grayscale contrast-125" data-alt="portrait of a distinguished academic researcher with spectacles and a thoughtful expression in a library setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfwfGVqtL2ddJbmeS_MMHPnkZGg4rF-aL7rYdkU9wUd7LUDIAvo1KMksB0rbNPrQkn5Cxk3vgyDvRKIspUoczHuCJTCwlx0o7zb8fvK_AaGwPP5UAzoaX7XXigaURWtcGBN565OFD2ROkyRhE3Vp6cLylauc0a7SVEFnAc5mbp4Kp3aIKrU3kESTrPNeoAxFcYvaNlxq90pGTrXrcAZK-EO5tuOAdOhlfIH9LLPurqDJOpGDFQXC2TEvQl5sfKqfOIkgIJzc_d7DY"/>
</div>
<div>
<p className="font-label text-xs tracking-widest uppercase text-on-surface">By Dr. Alistair Vance</p>
<p className="font-body text-xs text-on-surface-variant italic">Lead Archivist, Systems Research Wing</p>
</div>
</div>
</header>

<figure className="mb-16 -mx-6 md:-mx-16">
<div className="h-[400px] bg-primary relative overflow-hidden">
<img alt="Visual Metadata" className="w-full h-full object-cover mix-blend-soft-light opacity-60" data-alt="abstract cosmic data visualization with deep teal and golden light particles forming a digital nexus" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN8_caA6gCjf_5HmFfv6B0G-z665F78XHgdqh087MZC8eE39AOAXOYSI_Nx3QerwiVl4RwoioLmVjy72AvPQ8zqUWWfddg7jQGU7vPo_HbcapckE44W1FrVu8FPdtVPNsL292vmoCwI4LArf_RJ_dohVlq_tLEbsj7N0NozkcqfPzOoL1gErPMvQUzMi7VrvdNqJq61ciaRYi3IZnPIySqJOZjML9qpsuWvIkuziHGxFsi6LFHXaIVPU93ZjP60w2gctVxe4apMlk"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
<figcaption className="absolute bottom-6 left-16 right-16 text-on-primary-container font-label text-[10px] tracking-[0.2em] uppercase">
                        Fig 1.1: Schematic representation of packet-collision mitigation in decentralized relays.
                    </figcaption>
</div>
</figure>

<article className="prose prose-stone max-w-none">
<p className="editorial-cap font-body text-xl text-on-surface-variant leading-relaxed mb-12">
                    Understanding the relay of complex information requires a departure from traditional linear processing models. In our recent deep-dive into the lab’s datasets, we discovered that synchrony isn’t just a byproduct of efficiency—it is the prerequisite for data integrity at scale. As systems grow beyond the petabyte threshold, the "noise" inherent in traditional relay architectures becomes a literal barrier to progress.
                </p>
<div className="my-16 p-8 bg-surface-container-low rounded-xl relative">
<div className="absolute -left-3 top-8 w-1 h-12 bg-tertiary"></div>
<h3 className="font-headline italic text-2xl text-on-secondary-fixed mb-6">Why it Matters</h3>
<ul className="space-y-4">
<li className="flex items-start gap-4">
<span className="material-symbols-outlined text-primary mt-1" data-icon="auto_awesome">auto_awesome</span>
<span className="font-body text-on-surface-variant leading-snug">Reduced latency in decentralized networks by upwards of 42% through "Synchrony-First" protocols.</span>
</li>
<li className="flex items-start gap-4">
<span className="material-symbols-outlined text-primary mt-1" data-icon="verified_user">verified_user</span>
<span className="font-body text-on-surface-variant leading-snug">Ensures semantic consistency across high-velocity node clusters in non-deterministic environments.</span>
</li>
<li className="flex items-start gap-4">
<span className="material-symbols-outlined text-primary mt-1" data-icon="architecture">architecture</span>
<span className="font-body text-on-surface-variant leading-snug">Provides a blueprint for the next generation of "Knowledge Fabric" infrastructure.</span>
</li>
</ul>
</div>
<h3 className="font-headline italic text-3xl text-on-secondary-fixed mt-16 mb-6">Technical Key-Takeaways</h3>
<p className="font-body text-lg text-on-surface-variant leading-relaxed mb-8">
                    The implementation relies on a three-tier validation check. First, the relay initiates a handshake with the primary archive node. Second, the lab-tested synchrony algorithm calculates the optimal temporal window for packet transfer.
                </p>

<div className="my-12 group">
<div className="flex justify-between items-center px-4 py-2 bg-surface-dim rounded-t-lg border-b border-outline-variant border-opacity-20">
<span className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant">relay_synchronizer.ts</span>
<span className="material-symbols-outlined text-sm text-on-surface-variant" data-icon="content_copy">content_copy</span>
</div>
<pre className="bg-surface-dim p-6 rounded-b-lg overflow-x-auto border-x border-b border-outline-variant border-opacity-10 shadow-inner"><code className="font-mono text-sm leading-relaxed">
<span className="text-primary italic">// Initialize synchrony engine</span>
<span className="text-tertiary">const</span> engine = <span className="text-on-primary-fixed-variant">new</span> RelayEngine({"{"}
  mode: <span className="text-on-tertiary-fixed-variant">'precision'</span>,
  buffer: <span className="text-primary-container">1024 * 1024</span>,
  timeout: <span className="text-primary-container">500</span>
{"}"});

<span className="text-primary italic">// Execute high-velocity relay</span>
<span className="text-on-primary-fixed-variant">await</span> engine.<span className="text-on-secondary-fixed-variant">sync</span>(nodeA, nodeB).<span className="text-on-secondary-fixed-variant">then</span>(status =&gt; {"{"}
  <span className="text-on-tertiary-fixed-variant">console.</span><span className="text-on-secondary-fixed-variant">log</span>(<span className="text-on-tertiary-fixed-variant">`Relay established: {"${status.latency}"}ms`</span>);
{"}"});
</code>
                    </pre>
</div>
<p className="font-body text-lg text-on-surface-variant leading-relaxed mb-12">
                    In conclusion, the "Knowledge Relay" is more than a tool; it is a philosophy of connection. By prioritizing the structural integrity of the message over the velocity of the medium, we ensure that the archives remain pristine for generations of curators to come.
                </p>
</article>

<footer className="mt-20 pt-12 border-t border-outline-variant border-opacity-20 flex flex-col md:flex-row justify-between items-center gap-8">
<div className="flex gap-4">
<button onClick={() => alert('Action triggered!')} className="bg-primary-container text-on-primary px-6 py-3 rounded-xl font-label text-xs tracking-widest uppercase flex items-center gap-2 hover:opacity-90 transition-all shadow-[inset_0_1px_0_0_rgba(255,219,202,0.15)]">
<span className="material-symbols-outlined text-sm" data-icon="download">download</span>
                        Export Manuscript
                    </button>
<button onClick={() => alert('Action triggered!')} className="bg-surface-container-highest text-on-primary-fixed-variant px-6 py-3 rounded-xl font-label text-xs tracking-widest uppercase flex items-center gap-2 hover:bg-surface-dim transition-all">
<span className="material-symbols-outlined text-sm" data-icon="share">share</span>
                        Relay Insight
                    </button>
</div>
<div className="flex items-center gap-6">
<span className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant">End of Volume XIV</span>
<span className="material-symbols-outlined text-primary" data-icon="history_edu">history_edu</span>
</div>
</footer>
</div>

<aside className="col-span-12 lg:col-span-4 px-6 lg:px-0 lg:pr-12 py-12 lg:py-20 flex flex-col gap-12 sticky top-20 h-fit">

<div className="hidden lg:flex flex-col bg-surface-container-low rounded-2xl p-6 border-outline-variant border-opacity-10">
<div className="flex items-center gap-4 mb-8">
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
<span className="material-symbols-outlined text-white" data-icon="auto_stories">auto_stories</span>
</div>
<div>
<h4 className="font-headline italic text-lg leading-none">The Curator</h4>
<p className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant">Lead Archivist</p>
</div>
</div>
<nav className="space-y-1">
<Link className="flex items-center gap-4 p-3 bg-primary text-white rounded-lg group transition-all" to="/library">
<span className="material-symbols-outlined text-xl" data-icon="book_2">book_2</span>
<span className="font-label text-xs uppercase tracking-widest">Library</span>
</Link>
<Link className="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container rounded-lg group transition-all" to="/inbox">
<span className="material-symbols-outlined text-xl" data-icon="mail">mail</span>
<span className="font-label text-xs uppercase tracking-widest">Inbox</span>
</Link>
<Link className="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container rounded-lg group transition-all" to="/lab">
<span className="material-symbols-outlined text-xl" data-icon="science">science</span>
<span className="font-label text-xs uppercase tracking-widest">The Lab</span>
</Link>
</nav>
</div>

<section>
<h3 className="font-label text-xs tracking-[0.25em] uppercase text-on-surface-variant mb-8 px-2 flex items-center gap-3">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
                    Related Insights
                </h3>
<div className="space-y-6">

<div className="group cursor-pointer">
<div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-transparent group-hover:border-primary transition-all duration-300">
<span className="font-label text-[9px] tracking-widest uppercase text-tertiary-container mb-2 block">Case Study #442</span>
<h4 className="font-headline italic text-xl text-on-secondary-fixed mb-3 leading-tight">Quantum Entanglement in Storage Protocols</h4>
<p className="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed">How sub-atomic principles are reshaping the way we think about physical data redundancy.</p>
</div>
</div>

<div className="group cursor-pointer">
<div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-transparent group-hover:border-primary transition-all duration-300">
<span className="font-label text-[9px] tracking-widest uppercase text-tertiary-container mb-2 block">Technical Brief</span>
<h4 className="font-headline italic text-xl text-on-secondary-fixed mb-3 leading-tight">The Ethics of Permanent Archival</h4>
<p className="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed">Exploring the philosophical implications of never truly "deleting" technical debt.</p>
</div>
</div>

<div className="group cursor-pointer">
<div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-transparent group-hover:border-primary transition-all duration-300">
<div className="h-32 mb-4 overflow-hidden rounded-lg">
<img alt="Related" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-500" data-alt="vintage library stacks with glowing blue neon data lines projected onto old leather book spines" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_feurIqpaN5xZI-hLHzGFb1W3Y6UT2L_Lc8Ub46Uw8WoLnINFKNa5iZuX_wtZT90YLdEwiQRWahrPG5LhhtAcP986bKWclqfQCBUrzK7N-zdBHnBA1YKkLKHaTvvxU5VfK7kj7CQNu0Al6tVcX6TOUJSTVwhT9HcoWo_QsDd3ukTOgZaKhPFL96KYrtWg-5r9lvC5vboHjwytDD3lJfjPDnCjFzz3QAUaNAuTMXyESAn8IHthWR0pRblg3hLsS85EqtjOVENMOw4"/>
</div>
<span className="font-label text-[9px] tracking-widest uppercase text-tertiary-container mb-2 block">Visual Essay</span>
<h4 className="font-headline italic text-xl text-on-secondary-fixed mb-3 leading-tight">Visualizing the Incomputable</h4>
<p className="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed">Mapping the boundaries where data ends and intuition begins in human-centered systems.</p>
</div>
</div>
</div>
</section>

<div className="bg-[#003527] p-8 rounded-2xl relative overflow-hidden">
<div className="absolute -right-4 -bottom-4 text-white opacity-10 rotate-12">
<span className="material-symbols-outlined text-9xl" data-icon="draw">draw</span>
</div>
<h4 className="text-white font-headline italic text-2xl mb-4 relative z-10">Subscribe to The Manuscript</h4>
<p className="text-on-primary-container font-body text-sm mb-6 relative z-10 leading-relaxed">Receive weekly deep-dives into the architecture of thought and code.</p>
<div className="relative z-10">
<input className="w-full bg-primary-container text-white border-none rounded-lg font-label text-xs px-4 py-3 focus:ring-1 focus:ring-tertiary mb-3 placeholder:text-on-primary-container/50" placeholder="Email Address" type="email"/>
<button onClick={() => alert('Action triggered!')} className="w-full bg-white text-primary font-label text-xs tracking-widest uppercase py-3 rounded-lg font-bold hover:bg-tertiary-fixed transition-colors">Enlist</button>
</div>
</div>
</aside>
</main>

<div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#fbf9f5]/90 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
<Link to="/inbox" className="flex flex-col items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-2xl" data-icon="mail">mail</span>
<span className="font-label text-[8px] uppercase tracking-widest">Inbox</span>
</Link>
<Link to="/library" className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined text-2xl" data-icon="book_2">book_2</span>
<span className="font-label text-[8px] uppercase tracking-widest font-bold">Library</span>
</Link>
<Link to="/lab" className="flex flex-col items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-2xl" data-icon="science">science</span>
<span className="font-label text-[8px] uppercase tracking-widest">Lab</span>
</Link>
<Link to="/settings" className="flex flex-col items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-2xl" data-icon="settings">settings</span>
<span className="font-label text-[8px] uppercase tracking-widest">Settings</span>
</Link>
</div>
    </>
  );
}
