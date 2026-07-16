import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { fetchChatHistory, sendChatMessage } from '../lib/api'

const suggestions = [
  'Where is my cybersecurity article?',
  'Summarize the article about Playwright MCP.',
  'Which saved sources mention AI testing?',
]

export default function TheLab() {
  const [messages, setMessages] = useState([])
  const [sources, setSources] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadHistory() {
      setLoading(true)
      try {
        const data = await fetchChatHistory()
        setMessages(Array.isArray(data) ? data : [])
        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadHistory()
  }, [])

  async function handleSend(messageOverride) {
    const message = (messageOverride ?? input).trim()
    if (!message || sending) return
    const optimisticUserMessage = { role: 'user', content: message }
    setMessages((current) => [...current, optimisticUserMessage])
    setInput('')
    setSending(true)
    setError('')
    try {
      const data = await sendChatMessage(message)
      setMessages((current) => [...current, { role: 'assistant', content: data.response }])
      setSources(data.sources || [])
    } catch (err) {
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: 'The archive assistant failed to answer that request.' },
      ])
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <AppShell
      title="Archive assistant"
      subtitle="Ask across every saved article. Etch retrieves relevant entries from your archive and answers from that context first."
      actions={(
        <Link to="/library" className="button-secondary">
          Browse library
        </Link>
      )}
    >
      <section className="chat-layout">
        <div className="panel chat-panel">
          <div className="suggestion-row">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="suggestion-chip"
                onClick={() => handleSend(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="chat-log">
            {loading ? <p className="empty-state">Loading chat history...</p> : null}
            {!loading && messages.length === 0 ? (
              <p className="empty-state">Ask a question about any saved article.</p>
            ) : null}
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`chat-bubble ${message.role === 'user' ? 'chat-user' : 'chat-assistant'}`}
              >
                <div className="chat-role">{message.role === 'user' ? 'You' : 'Etch'}</div>
                <div className="chat-content">{message.content}</div>
              </div>
            ))}
            {sending ? (
              <div className="chat-bubble chat-assistant">
                <div className="chat-role">Etch</div>
                <div className="chat-content">Thinking through your archive...</div>
              </div>
            ) : null}
          </div>

          <form
            className="chat-input-row"
            onSubmit={(event) => {
              event.preventDefault()
              handleSend()
            }}
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about a topic, article title, or detail from your saved links"
              rows="3"
            />
            <button type="submit" className="button-primary" disabled={sending}>
              Send
            </button>
          </form>
          {error ? <p className="status-error">{error}</p> : null}
        </div>

        <aside className="stack-column">
          <div className="panel">
            <p className="panel-kicker">Matched sources</p>
            {sources.length === 0 ? (
              <p className="empty-state small">Relevant source matches will appear here after a reply.</p>
            ) : (
              <div className="list-stack">
                {sources.map((source) => (
                  <Link key={source.id} to={`/deepdive/${source.id}`} className="source-match">
                    <strong>{source.title}</strong>
                    <span>{source.source_domain || 'unknown source'}</span>
                    <span>{source.tags || 'General'}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </aside>
      </section>
    </AppShell>
  )
}
