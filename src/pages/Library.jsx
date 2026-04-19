import React from 'react';
import { Link } from 'react-router-dom';

export default function Library() {
  return (
    <>
      <div className="parchment-grain fixed inset-0 z-50 pointer-events-none"></div>

<aside className="animate-fade-in-right opacity-0-init hidden xl:flex fixed left-0 top-0 h-full flex flex-col py-6 bg-surface-container-low border-r-0 w-64 z-40">
<div className="px-6 mb-12">
<h1 className="font-headline font-bold text-primary text-2xl">Knowledge Relay</h1>
</div>
<nav className="flex-1 space-y-2">
<Link className="flex items-center gap-3 py-3 text-slate-600 dark:text-slate-400 hover:bg-surface-dim rounded-lg mx-2 px-4 transition-all font-label uppercase tracking-widest text-xs" to="/inbox">
<span className="material-symbols-outlined" data-icon="mail">mail</span>
<span>INBOX</span>
</Link>
<Link className="flex items-center gap-3 py-3 bg-primary-container text-white rounded-lg mx-2 px-4 transition-all font-label uppercase tracking-widest text-xs" to="/library">
<span className="material-symbols-outlined" data-icon="book_2">book_2</span>
<span>LIBRARY</span>
</Link>
<Link className="flex items-center gap-3 py-3 text-slate-600 dark:text-slate-400 hover:bg-surface-dim rounded-lg mx-2 px-4 transition-all font-label uppercase tracking-widest text-xs" to="/lab">
<span className="material-symbols-outlined" data-icon="science">science</span>
<span>THE_LAB</span>
</Link>
<Link className="flex items-center gap-3 py-3 text-slate-600 dark:text-slate-400 hover:bg-surface-dim rounded-lg mx-2 px-4 transition-all font-label uppercase tracking-widest text-xs" to="/settings">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span>SETTINGS</span>
</Link>
</nav>
<div className="mt-auto px-4 border-t border-outline-variant/20 pt-6">
<div className="flex items-center gap-3 mb-6 px-2">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
<img alt="The Curator" className="rounded-full" data-alt="Close-up portrait of a refined older scholar in a tweed jacket with silver hair and spectacles in a warm library" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgOPHMX0lk1XvsA7UIj6163d81qgyQGRhkqyGV3CNd69imgHPGKGyt5dw0pSTLf1enLtWGsnM7I1KgBeX2mws38D-u5oNj5ls0tSD9lS4rrUDrFTaYUIw7v0CKejvtSSyNsDYy-VHhChEqo2qocMC-ohWCNb4q5jCxpnklHNKssMumevHEtAm4dbRM0-3BoYA4lpKmbsbaihU8H82MFMclw69Ph_UHh7yBNTHHsMoFhnQRD4K0v-p7c7bfy46r_nkKdIeyHudqP3o"/>
</div>
<div>
<p className="text-sm font-bold text-on-surface">The Curator</p>
<p className="text-[10px] font-label uppercase tracking-tight text-on-surface-variant">Lead Archivist</p>
</div>
</div>
<div className="space-y-1">
<Link className="flex items-center gap-3 py-2 text-slate-600 hover:text-primary transition-colors text-xs font-label uppercase tracking-widest px-2" to="#">
<span className="material-symbols-outlined text-sm" data-icon="help">help</span>
<span>Support</span>
</Link>
<Link className="flex items-center gap-3 py-2 text-slate-600 hover:text-error transition-colors text-xs font-label uppercase tracking-widest px-2" to="#">
<span className="material-symbols-outlined text-sm" data-icon="logout">logout</span>
<span>Sign Out</span>
</Link>
</div>
</div>
</aside>

<main className="xl:ml-64 min-h-screen pt-16 xl:pt-0">

<header className="flex justify-between items-center px-8 py-6 w-full max-w-screen-2xl mx-auto sticky top-0 bg-surface/90 backdrop-blur-md z-30">
<div className="flex items-center gap-8">
<h2 className="font-headline italic text-2xl tracking-tight text-primary">Library Collections</h2>
<div className="h-6 w-px bg-outline-variant/30"></div>
<div className="flex gap-6">
<button onClick={() => alert('Action triggered!')} className="text-xs font-label uppercase tracking-widest text-primary border-b-2 border-primary font-bold">Volumes</button>
<button onClick={() => alert('Action triggered!')} className="text-xs font-label uppercase tracking-widest text-slate-500 hover:text-primary transition-colors font-medium">Drafts</button>
<button onClick={() => alert('Action triggered!')} className="text-xs font-label uppercase tracking-widest text-slate-500 hover:text-primary transition-colors font-medium">Archive</button>
</div>
</div>
<div className="flex items-center gap-4">
<div className="relative group">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors" data-icon="search">search</span>
<input className="bg-surface-container-lowest border-0 border-b border-outline-variant/50 focus:ring-0 focus:border-primary pl-10 pr-4 py-2 text-sm w-64 transition-all rounded-t-lg" placeholder="Search the archives..." type="text"/>
</div>
<button onClick={() => alert('Action triggered!')} className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
</button>
</div>
</header>
<section className="px-12 py-8 max-w-screen-2xl mx-auto">

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">

<div className="group cursor-pointer animate-fade-in-up opacity-0-init delay-100\">
<div className="journal-cover hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative aspect-[3/4] bg-surface-container-lowest rounded-r-lg overflow-hidden border border-outline-variant/10 flex flex-col p-8 transition-transform group-hover:-translate-y-2">
<div className="absolute inset-y-0 left-0 w-3 journal-spine"></div>
<div className="mb-4">
<span className="font-label text-[10px] uppercase tracking-widest text-tertiary-container font-bold px-2 py-0.5 border border-tertiary-container/30 rounded">Volume IV</span>
</div>
<h3 className="font-headline font-bold text-3xl leading-tight text-on-secondary-fixed mb-4">FastAPI Mastery</h3>
<p className="text-sm text-on-surface-variant font-body leading-relaxed mb-8 italic">The definitive guide to high-performance asynchronous systems.</p>
<div className="mt-auto">
<div className="flex flex-wrap gap-2 mb-6">
<div className="w-6 h-6 rounded bg-surface-dim p-1"><img alt="GitHub" data-alt="Minimal monochrome GitHub logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1y1u2MqwILbEmrqHxkWwCAi7Y-zf1WAmME2t3_CElf-CK-FgOpSw6jdfAGDgRPU2ZP7-KPvh68F-Ri_ok6SJuvCsLOKASnsuC6pZrCf4INSQeHoy7v9dByysjmqvmDDx3Po0EEglrfiKXYvjXlAgHDJ4x9jKerX_DoWeS7AlUC4AVsi38tEovGz1hKub08vQbt2ft4oY7gwBEiXAH_ykDOt21wbhWHH7GjXUrEtFd-40MGEd_bjTENO8TYkNH2rCSuvUhKP6Clrw"/></div>
<div className="w-6 h-6 rounded bg-surface-dim p-1"><img alt="Stack" data-alt="Minimal monochrome Stack Overflow logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2SY9GlDXUE55TFhExyAnD0nz43xzqt-ayJtctgSQjaCeHByypVo1mLs_867oNaAipQOP7JgwAIdtU3OY2LbmNmzmwbGIoa6p0w2sRtiHiyiPOVFWOg5feG3PhL4J2MQYu9jMkGq8gep3brMBqfczM00TASQCdOZzfpjdgwlhdzXcgYIkTDncjE2Qcq21BAjAh5jpQod61NxwNWOwZGMhVVFLnxOXXZLEeQIlAKM9XiM_cZcw8KOHYfabKJvtaw3h1Duwud3YeEDE"/></div>
<div className="w-6 h-6 rounded bg-surface-dim p-1"><img alt="Medium" data-alt="Minimal monochrome Medium logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDZkKLcnc2G41u_JHtvth_i0-KwXnOZDx7PDI-gay67nEqOCWtWm9hEgk0CvQ2z5wnumYq7_mJ2K4NdCnZYiwx6XL2UXEGlRmVhMW6h6QTqqG5llyJraHcQor9P1AWiWnN3pAjGKoFZzhzqJFzPokCgjxlme3K4kE3P0ndOEIZBTev80R21DhjqMAfnDdGL131p19C7H9ln8b-bKJK7j3Zt4oSch90oryInSQUJ4p_n0Ve9g68EHS4015qpuTg9a9-wcK6PB2d0zc"/></div>
<div className="w-6 h-6 rounded bg-surface-dim p-1 flex items-center justify-center text-[10px] font-label font-bold text-on-surface-variant">+12</div>
</div>
<div className="flex justify-between items-center border-t border-outline-variant/20 pt-4">
<span className="text-[10px] font-label uppercase tracking-tighter text-outline">148 Citations</span>
<span className="material-symbols-outlined text-primary text-xl" data-icon="arrow_right_alt">arrow_right_alt</span>
</div>
</div>
</div>
</div>

<div className="group cursor-pointer animate-fade-in-up opacity-0-init delay-200\">
<div className="journal-cover hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative aspect-[3/4] bg-surface-container-low rounded-r-lg overflow-hidden border border-outline-variant/10 flex flex-col p-8 transition-transform group-hover:-translate-y-2">
<div className="absolute inset-y-0 left-0 w-3 journal-spine"></div>
<div className="mb-4">
<span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold px-2 py-0.5 border border-primary/30 rounded">In Progress</span>
</div>
<h3 className="font-headline font-bold text-3xl leading-tight text-on-secondary-fixed mb-4">Neural Geometries</h3>
<p className="text-sm text-on-surface-variant font-body leading-relaxed mb-8 italic">Exploring the topological structures of latent spaces.</p>
<div className="mt-auto">
<div className="flex flex-wrap gap-2 mb-6">
<div className="w-6 h-6 rounded bg-surface-dim p-1"><img alt="Arxiv" data-alt="Minimal monochrome Arxiv logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGFOOdrB0GwI6PY0vKBAQ8T04R_LWUI-QVl7vdDmGn1PqyqB0eb95vYRLswUzlYSIWh80Y_ZcUSKFu3SwdPQsFNBMbmNLUBnXSDyVN6jURhe5ubmEdAGIURMJxG5FBMG-XvdcbZQXxvWhJvYWrCHaIzuNdawVQJB3Y8aANwDo_-u_l6xGbeKF1yir_CJb1OOvtGhA39-pCTAlVnZWds4-gFnS-y3ThA2coU8ACz7PHI1PiBu3bMGBVHf-obc-s4JBsuq96W-uHweU"/></div>
<div className="w-6 h-6 rounded bg-surface-dim p-1"><img alt="Notion" data-alt="Minimal monochrome Notion logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLq8318FXL523UcJrTlgLNAdXD1RxxJXd4H9RgmWGzCYeFRWiGrBSpSgNQm__CM8t2O3upZzu4glgKf7mXd4FZyvf1XYbBbEuS5-cvqiR0CbBbdzsTNtmkKJw-AuxKqCyaF2sNBZAOPhi4NU9qCMSLB-I63XZKb55eGO-mjPj43dtBD2UswjRBcZr_8hkIpF5T52CFf77N1vswf-kn7lykBdOqRUww4wyECIkRr3YCqGuUSP5gBw3q_qkMsmrfLWFxZmoSzVFxoN0"/></div>
<div className="w-6 h-6 rounded bg-surface-dim p-1 flex items-center justify-center text-[10px] font-label font-bold text-on-surface-variant">+4</div>
</div>
<div className="flex justify-between items-center border-t border-outline-variant/20 pt-4">
<span className="text-[10px] font-label uppercase tracking-tighter text-outline">32 Sources</span>
<span className="material-symbols-outlined text-primary text-xl" data-icon="pending">pending</span>
</div>
</div>
</div>
</div>

<div className="group cursor-pointer animate-fade-in-up opacity-0-init delay-300\">
<div className="journal-cover hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative aspect-[3/4] bg-primary rounded-r-lg overflow-hidden border border-primary/10 flex flex-col p-8 transition-transform group-hover:-translate-y-2">
<div className="absolute inset-y-0 left-0 w-3 bg-black/20"></div>
<div className="mb-4">
<span className="font-label text-[10px] uppercase tracking-widest text-on-primary-container font-bold px-2 py-0.5 border border-on-primary-container/30 rounded">Editor's Choice</span>
</div>
<h3 className="font-headline font-bold text-3xl leading-tight text-white mb-4">Rust Persistence</h3>
<p className="text-sm text-primary-fixed-dim font-body leading-relaxed mb-8 italic">Systems programming patterns for durable data storage.</p>
<div className="mt-auto">
<div className="flex flex-wrap gap-2 mb-6">
<div className="w-6 h-6 rounded bg-white/10 p-1"><img alt="Rust" data-alt="Minimal white Rust language logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9K_LHkHkv9Tk2sPq_2bRKdp7Nq4zU1ndAxeEOJxA6otMBrLoqxGWWuTj0ZRx1V_GC2H68xCk3nWMU6nMs7VGe0l33v5ULgH_LPvYUjTRZxRjQm8n3rG04U83O-xGKgLidyQ9KzFwgIpln_RboCndZZphQf5Gz39HmPsZFFoBfIGq-TGKR6Uckf8zzK6enKkBJ-mk0vZ1ojQ_bP46UV2tzoepB2JmOlwGheslNShcaGyBArK10efdrhaOvj4LBTUnyvPz4pKy72iU"/></div>
<div className="w-6 h-6 rounded bg-white/10 p-1"><img alt="GitHub" data-alt="Minimal white GitHub logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAKj56EGyBjsFhEoVpbf1LAtBeQ_zGBvLlhdpYVhX3CUP-OAxmjjdfRdg_AM4hd57iV5mjAWU1m4V13_3qIxxoLhKGHPAWiNEZ2vmJA7_l0bak0xSlvhJWd6vT0pQqfRPZwN0dNK-RGJdTC0R4qVM97m41NOHpvqrpFsZaz5AunQvM6fWoQ4egj_APW44ErQe3Z4CSdQhkuWczLDzSzqVQNG-rtWxmORvgE8elU3B_xl3Fe98PliBs9J3h8rSioq90QXMu9lpcYPE"/></div>
</div>
<div className="flex justify-between items-center border-t border-white/10 pt-4">
<span className="text-[10px] font-label uppercase tracking-tighter text-primary-fixed-dim">212 Citations</span>
<span className="material-symbols-outlined text-tertiary-fixed text-xl" data-icon="star" style={{ fontVariationSettings: "\'FILL\' 1" }}>star</span>
</div>
</div>
</div>
</div>

<div className="group cursor-pointer animate-fade-in-up opacity-0-init delay-400\">
<div className="journal-cover hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative aspect-[3/4] bg-surface-container-lowest rounded-r-lg overflow-hidden border border-outline-variant/10 flex flex-col p-8 transition-transform group-hover:-translate-y-2">
<div className="absolute inset-y-0 left-0 w-3 journal-spine"></div>
<div className="mb-4">
<span className="font-label text-[10px] uppercase tracking-widest text-outline font-bold px-2 py-0.5 border border-outline-variant/30 rounded">Archive</span>
</div>
<h3 className="font-headline font-bold text-3xl leading-tight text-on-secondary-fixed mb-4">Vanilla JS Ethos</h3>
<p className="text-sm text-on-surface-variant font-body leading-relaxed mb-8 italic">Maintaining state without the bloat of frameworks.</p>
<div className="mt-auto">
<div className="flex flex-wrap gap-2 mb-6">
<div className="w-6 h-6 rounded bg-surface-dim p-1"><img alt="Wiki" data-alt="Minimal monochrome Wikipedia logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeH-1G8PXN3dV8XedEKU2KQvwfciSyBKtoYuRRaypl-AslLjLPvvewfwfVnQd1jwOiNYGrypG6peXxtdREyidCNic_eRInsIO_gWopZqJP40tQiUrYvIBDpLXcO53blfFeDb95r1I1OKenm1lAkEEpF5ysPT_d64oILZA_lKLGDGJBXt0iv7EdmvsmTbJVjlmXquQvXHRE8PV_7FtuojIMCmTV2XXaS3rOFI3rCqbRHh6jDjrdDkFEfLiARA_ibarIDaM-f8bhtfg"/></div>
<div className="w-6 h-6 rounded bg-surface-dim p-1"><img alt="Dev.to" data-alt="Minimal monochrome Dev.to logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBot0jvlFZAFOlguFMRDH09m2vqgcJMWZQ2gsC47_bRwnMTdH07OYIurTSZb15V45QMnC2MC_qJ_1EII2xhMZq325L6LSvXSlZwrpwsLw-2bb0GG84eFwM4UJu3gFSXNZInIayfFeoIMjWdjT2VF1oapK1154MjfiJHwJs1G_O0rFVJSMMqX00sdpJzqP5a8rji0n-v8o33POrTMzAtPFRNqwUjeyhNzb9r3J0BHIBO3oVuSoOA-9MOU-VJNSkFqTuuaTeM24OEnms"/></div>
</div>
<div className="flex justify-between items-center border-t border-outline-variant/20 pt-4">
<span className="text-[10px] font-label uppercase tracking-tighter text-outline">89 Sources</span>
<span className="material-symbols-outlined text-primary text-xl" data-icon="history">history</span>
</div>
</div>
</div>
</div>

<div className="group cursor-pointer animate-fade-in-up opacity-0-init delay-500\">
<div className="journal-cover hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative aspect-[3/4] bg-surface-container-low rounded-r-lg overflow-hidden border border-outline-variant/10 flex flex-col p-8 transition-transform group-hover:-translate-y-2">
<div className="absolute inset-y-0 left-0 w-3 journal-spine"></div>
<div className="mb-4">
<span className="font-label text-[10px] uppercase tracking-widest text-tertiary-container font-bold px-2 py-0.5 border border-tertiary-container/30 rounded">Vol IX</span>
</div>
<h3 className="font-headline font-bold text-3xl leading-tight text-on-secondary-fixed mb-4">Distributed Consensus</h3>
<p className="text-sm text-on-surface-variant font-body leading-relaxed mb-8 italic">From Paxos to Raft: An architectural journey.</p>
<div className="mt-auto">
<div className="flex flex-wrap gap-2 mb-6">
<div className="w-6 h-6 rounded bg-surface-dim p-1"><img alt="Paper" data-alt="Minimal monochrome academic paper icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd-RfPr5qY-qAP9gSJ-6OSBiheVUS-lct59aA6TwdftSAcbIsvDHUCMJxWm1MTujLjdQA3598yK_Ugo9TeWOuNJXCP1FAk7U1-W0FyrSB6NR9puLfy7pwMYws9z2M2XL0FGIuPhi0lqM6cZby11Bgc7y5sMskHZcugLmxdSGScz3HxHHOPb9SYh3jUOf_BSVaXcibw9-TT9yq8yzgfhv8wuDP6Pg_f1kj6yo_FdNRDoyBWpZLjwve39WVNJ5tqCgsIEEbWOaATytk"/></div>
<div className="w-6 h-6 rounded bg-surface-dim p-1 flex items-center justify-center text-[10px] font-label font-bold text-on-surface-variant">+1</div>
</div>
<div className="flex justify-between items-center border-t border-outline-variant/20 pt-4">
<span className="text-[10px] font-label uppercase tracking-tighter text-outline">55 Citations</span>
<span className="material-symbols-outlined text-primary text-xl" data-icon="lan">lan</span>
</div>
</div>
</div>
</div>

<div className="group cursor-pointer animate-fade-in-up opacity-0-init delay-500\">
<div className="relative aspect-[3/4] rounded-r-lg border-2 border-dashed border-outline-variant/40 flex flex-col items-center justify-center p-8 bg-surface-container-low/30 hover:border-primary/40 hover:bg-surface-container-low transition-all">
<div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="add">add</span>
</div>
<p className="font-label uppercase tracking-widest text-xs font-bold text-on-surface-variant">Bind New Collection</p>
</div>
</div>
</div>
</section>

<button onClick={() => alert('Action triggered!')} className="fixed bottom-12 right-12 w-16 h-16 animate-float bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform z-50 group overflow-hidden">
<div className="absolute inset-0 bg-tertiary opacity-0 group-hover:opacity-10 transition-opacity"></div>
<span className="material-symbols-outlined text-3xl" data-icon="edit_note">edit_note</span>
</button>
</main>

<div className="fixed inset-0 pointer-events-none parchment-grain"></div>

<div className="xl:hidden fixed bottom-0 left-0 right-0 bg-[#fbf9f5]/90 backdrop-blur-md z-40 px-6 py-4 flex justify-between items-center shadow-[0_-4px_24px_rgba(0,0,0,0.05)] border-t border-outline-variant/20">
<Link to="/inbox" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined text-2xl" data-icon="mail">mail</span>
<span className="font-label text-[8px] uppercase tracking-widest">Inbox</span>
</Link>
<Link to="/library" className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined text-2xl" data-icon="book_2">book_2</span>
<span className="font-label text-[8px] uppercase tracking-widest font-bold">Library</span>
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
