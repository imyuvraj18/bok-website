const API_BASE = window.__API_BASE__ || 'http://localhost:8080';

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}/api${path}`, {
    headers: authHeaders(),
    credentials: 'omit'
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}/api${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body),
    credentials: 'omit'
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function setToken(token) {
  localStorage.setItem('bok_token', token);
}

export function getToken() {
  return localStorage.getItem('bok_token');
}

export function clearToken() {
  localStorage.removeItem('bok_token');
}

function authHeaders() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}


