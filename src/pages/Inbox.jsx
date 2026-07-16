import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { createLink, fetchLinks } from '../lib/api'

function formatDate(dateString) {
  if (!dateString) return 'Unknown date'
  return new Date(dateString).toLocaleString()
}

export default function Inbox() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ url: '', title: '' })

  useEffect(() => {
    let ignore = false
    fetchLinks()
      .then((data) => {
        if (ignore) return
        setLinks(data.items || [])
        setError('')
      })
      .catch((err) => {
        if (ignore) return
        setError(err.message)
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false)
        }
      })
    return () => {
      ignore = true
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    if (!form.url.trim()) return
    setSubmitting(true)
    setError('')
    try {
      const saved = await createLink(form)
      setForm({ url: '', title: '' })
      setLinks((current) => [saved, ...current.filter((item) => item.id !== saved.id)])
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const stats = useMemo(() => {
    const ready = links.filter((item) => item.status === 'ready').length
    const partial = links.filter((item) => item.status === 'partial').length
    const domains = new Set(links.map((item) => item.source_domain).filter(Boolean)).size
    return [
      { label: 'Saved articles', value: links.length },
      { label: 'Clean extracts', value: ready },
      { label: 'Partial extracts', value: partial },
      { label: 'Distinct sources', value: domains },
    ]
  }, [links])

  return (
    <AppShell
      title="Capture new knowledge"
      subtitle="Paste any article URL. Etch extracts the page, builds a summary, stores the source text, and makes it available to archive chat."
    >
      <section className="hero-grid">
        <form className="panel compose-panel" onSubmit={handleSubmit}>
          <div className="panel-header">
            <div>
              <p className="panel-kicker">New URL</p>
              <h2>Archive a page</h2>
            </div>
          </div>
          <label className="field">
            <span>URL</span>
            <input
              type="url"
              placeholder="https://example.com/article"
              value={form.url}
              onChange={(event) => setForm((current) => ({ ...current, url: event.target.value }))}
              required
            />
          </label>
          <label className="field">
            <span>Custom title</span>
            <input
              type="text"
              placeholder="Optional override for the article title"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            />
          </label>
          <div className="inline-actions">
            <button type="submit" className="button-primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save to archive'}
            </button>
            <Link to="/lab" className="button-secondary">
              Ask the archive
            </Link>
          </div>
          {error ? <p className="status-error">{error}</p> : null}
        </form>

        <div className="stats-grid">
          {stats.map((item) => (
            <div className="panel stat-card" key={item.label}>
              <p className="panel-kicker">{item.label}</p>
              <div className="stat-value">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Recent archive entries</p>
            <h2>Latest saved links</h2>
          </div>
          <Link to="/library" className="button-secondary">
            Open library
          </Link>
        </div>

        {loading ? <p className="empty-state">Loading archive...</p> : null}
        {!loading && links.length === 0 ? (
          <p className="empty-state">No saved links yet. Start by archiving a URL above.</p>
        ) : null}

        <div className="list-stack">
          {links.slice(0, 8).map((link) => (
            <Link to={`/deepdive/${link.id}`} className="article-row" key={link.id}>
              <div className="article-row-main">
                <div className="tag-row">
                  <span className={`status-pill status-${link.status || 'ready'}`}>{link.status || 'ready'}</span>
                  <span className="muted">{link.source_domain || 'unknown source'}</span>
                </div>
                <h3>{link.title || 'Untitled source'}</h3>
                <p>{link.short_summary || 'Summary unavailable.'}</p>
              </div>
              <div className="article-row-side">
                <span>{link.tags || 'General'}</span>
                <time>{formatDate(link.created_at)}</time>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  )
}
