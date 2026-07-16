async function parseResponse(response) {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.detail || data.message || 'Request failed')
  }
  return data
}

export async function fetchLinks(query = '') {
  const search = query ? `?query=${encodeURIComponent(query)}` : ''
  const data = await parseResponse(await fetch(`/api/links${search}`))
  return data
}

export async function fetchLink(id) {
  return parseResponse(await fetch(`/api/links/${id}`))
}

export async function createLink(payload) {
  return parseResponse(await fetch('/api/links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }))
}

export async function fetchChatHistory() {
  return parseResponse(await fetch('/api/chat/history'))
}

export async function sendChatMessage(message) {
  return parseResponse(await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  }))
}
