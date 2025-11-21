export const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export async function ensureSeeded() {
  try {
    const projects = await apiGet('/api/projects')
    if (projects.length === 0) {
      await fetch(`${API_BASE}/api/seed`, { method: 'POST' })
    }
  } catch (e) {
    // try to seed anyway
    try { await fetch(`${API_BASE}/api/seed`, { method: 'POST' }) } catch {}
  }
}
