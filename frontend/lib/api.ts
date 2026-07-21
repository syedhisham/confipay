/**
 * Thin fetch wrapper around the ConFiPay API.
 *
 * Centralises the base URL, auth header, and the `{ success, data | error }`
 * envelope so callers only ever deal with unwrapped data or a thrown Error.
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN ?? "";

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
        ...init?.headers,
      },
    });
  } catch {
    throw new Error("Unable to reach the server. Is the API running?");
  }

  let body: ApiEnvelope<T> | null = null;
  try {
    body = (await response.json()) as ApiEnvelope<T>;
  } catch {
    // Non-JSON responses fall through to the status-based error below.
  }

  if (!response.ok || !body?.success) {
    throw new Error(
      body?.error ?? `Request failed with status ${response.status}`
    );
  }

  return body.data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
};
