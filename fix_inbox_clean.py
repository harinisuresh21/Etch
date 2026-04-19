with open('src/pages/Inbox.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False

for i, line in enumerate(lines):
    # Fix the upload link main button onClick handler
    if "Upload Link" in line and "onClick={" in lines[i-3]:
        # The button spans lines actually:
        pass # We will fix it manually by re-reading everything
        
with open('src/pages/Inbox.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix the Upload Link Button
# From: onClick={handleUpload} disabled={loading} className="disabled:opacity-50 bg-primary text-white px-6 py-3 rounded-lg font-label text-xs uppercase tracking-widest shadow-md hover:bg-primary/90 transition-colors flex items-center gap-2 self-start">
# To: onClick={() => setIsDialogOpen(true)} className="bg-primary text-white px-6 py-3 rounded-lg font-label text-xs uppercase tracking-widest shadow-md hover:bg-primary/90 transition-colors flex items-center gap-2 self-start">
old_upload_btn = 'onClick={handleUpload} disabled={loading} className="disabled:opacity-50 bg-primary text-white px-6 py-3 rounded-lg font-label text-xs uppercase tracking-widest shadow-md hover:bg-primary/90 transition-colors flex items-center gap-2 self-start">'
new_upload_btn = 'onClick={() => setIsDialogOpen(true)} className="bg-primary text-white px-6 py-3 rounded-lg font-label text-xs uppercase tracking-widest shadow-md hover:bg-primary/90 transition-colors flex items-center gap-2 self-start">'
content = content.replace(old_upload_btn, new_upload_btn)

# 2. Rip out the entire static `<div className="space-y-12">` through `<div className="mt-20 flex flex-col items-center gap-6">...` (lines 82 to 226 approx)
# We will find the start of `<div className="space-y-12">` and the start of `</main>`
start_idx = content.find('<div className="space-y-12">')
end_idx = content.find('</main>', start_idx)

if start_idx != -1 and end_idx != -1:
    dynamic_feed = """<div className="space-y-12">
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
</div>\n"""
    
    content = content[:start_idx] + dynamic_feed + content[end_idx:]

with open('src/pages/Inbox.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed Inbox.jsx correctly!")
