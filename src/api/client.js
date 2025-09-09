export const API_BASE_URL = (typeof process !== 'undefined' && process.env && process.env.EXPO_PUBLIC_API_URL) || 'http://localhost:4000';

async function request(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json();
}

export const api = {
  health: () => request('/health'),
  getProfile: () => request('/api/profile'),
  updateProfile: (profile) => request('/api/profile', { method: 'PUT', body: JSON.stringify(profile) }),
  listTranslations: () => request('/api/translations'),
  createTranslation: (payload) => request('/api/translations', { method: 'POST', body: JSON.stringify(payload) }),
  listPlaces: () => request('/api/places'),
  createPlace: (payload) => request('/api/places', { method: 'POST', body: JSON.stringify(payload) }),
  deletePlace: (id) => request(`/api/places/${id}`, { method: 'DELETE' }),
};


