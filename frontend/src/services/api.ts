const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

export async function apiFetch(
  endpoint: string,
  options?: RequestInit
): Promise<Response> {
  return fetch(`${API_URL}${endpoint}`, options)
}