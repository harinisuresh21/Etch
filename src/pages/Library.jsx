import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { fetchLinks } from '../lib/api'

export default function Library() {
  const [query, setQuery] = useState('')
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await fetchLinks(query)
        setLinks(data.items || [])
        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }, 200)
    return () => clearTimeout(timeout)
  }, [query])

  return (
    <AppShell
      title="Archive library"
      subtitle="Search by title, tag, summary, or source. Every saved page becomes a browsable personal knowledge entry."
      actions={(
        <input
          className="search-input"
          type="search"
          placeholder="Search your archive"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      )}
    >
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Saved knowledge</p>
            <h2>{query ? `Results for "${query}"` : 'All articles'}</h2>
          </div>
          <span className="muted">{links.length} item{links.length === 1 ? '' : 's'}</span>
        </div>

        {loading ? <p className="empty-state">Searching archive...</p> : null}
        {!loading && error ? <p className="status-error">{error}</p> : null}
        {!loading && !error && links.length === 0 ? (
          <p className="empty-state">No entries matched that search.</p>
        ) : null}

        <div className="card-grid">
          {links.map((link) => (
            <Link to={`/deepdive/${link.id}`} className="article-card" key={link.id}>
              <div className="tag-row">
                <span className={`status-pill status-${link.status || 'ready'}`}>{link.status || 'ready'}</span>
                <span className="muted">{link.source_domain || 'unknown'}</span>
              </div>
              <h3>{link.title || 'Untitled source'}</h3>
              <p>{link.short_summary || 'Summary unavailable.'}</p>
              <div className="card-footer">
                <span>{link.tags || 'General'}</span>
                <span>Open article</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  )
}
