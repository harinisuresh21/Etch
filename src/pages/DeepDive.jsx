import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { fetchLink } from '../lib/api'

function formatDate(dateString) {
  if (!dateString) return 'Unknown date'
  return new Date(dateString).toLocaleString()
}

function renderBlocks(text) {
  return (text || '')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
}

export default function DeepDive() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadArticle() {
      setLoading(true)
      try {
        const data = await fetchLink(id)
        setArticle(data)
        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadArticle()
  }, [id])

  if (loading) {
    return (
      <AppShell title="Loading article">
        <section className="panel">
          <p className="empty-state">Loading archived article...</p>
        </section>
      </AppShell>
    )
  }

  if (error || !article) {
    return (
      <AppShell title="Article unavailable">
        <section className="panel">
          <p className="status-error">{error || 'Article not found.'}</p>
        </section>
      </AppShell>
    )
  }

  return (
    <AppShell
      title={article.title || 'Untitled source'}
      subtitle={article.short_summary}
      actions={(
        <a className="button-secondary" href={article.url} target="_blank" rel="noreferrer">
          Open source
        </a>
      )}
    >
      <section className="article-layout">
        <article className="panel article-panel">
          <div className="meta-grid">
            <div>
              <p className="panel-kicker">Source</p>
              <a href={article.url} target="_blank" rel="noreferrer" className="inline-link">
                {article.source_title || article.url}
              </a>
            </div>
            <div>
              <p className="panel-kicker">Domain</p>
              <p>{article.source_domain || 'Unknown'}</p>
            </div>
            <div>
              <p className="panel-kicker">Saved</p>
              <p>{formatDate(article.created_at)}</p>
            </div>
            <div>
              <p className="panel-kicker">Tags</p>
              <p>{article.tags || 'General'}</p>
            </div>
          </div>

          <div className="article-body">
            {renderBlocks(article.detailed_content).map((block, index) => (
              <section key={`${index}-${block.slice(0, 20)}`}>
                <p>{block}</p>
              </section>
            ))}
          </div>
        </article>

        <aside className="stack-column">
          <div className="panel">
            <p className="panel-kicker">Archive status</p>
            <div className={`status-pill status-${article.status || 'ready'}`}>{article.status || 'ready'}</div>
            {article.error_message ? <p className="muted">{article.error_message}</p> : null}
          </div>

          <div className="panel">
            <p className="panel-kicker">Raw extract</p>
            <p className="raw-preview">{article.raw_content || 'No raw extract stored.'}</p>
          </div>

          <div className="panel">
            <p className="panel-kicker">Next steps</p>
            <div className="stack-actions">
              <Link to="/library" className="button-secondary">Back to library</Link>
              <Link to="/lab" className="button-secondary">Ask about this article</Link>
            </div>
          </div>
        </aside>
      </section>
    </AppShell>
  )
}
