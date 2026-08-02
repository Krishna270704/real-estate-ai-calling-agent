
const BASE_URL = "/api";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (networkErr) {
    // Backend unreachable
    throw new ApiError(
      "Could not reach the backend. Is it running on http://localhost:8000?",
      0
    );
  }

  if (!response.ok) {
    let detail = response.statusText;
    try {
      const body = await response.json();
      detail = body?.detail ?? detail;
    } catch {
      // response wasn't JSON, fall back to statusText
    }
    throw new ApiError(detail || "Request failed", response.status);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export function fetchLeads() {
  return request("/leads", { method: "GET" });
}

export function deleteAllLeads() {
  return request("/leads", { method: "DELETE" });
}

export function sendChatMessage(sessionId, message) {
  return request("/chat", {
    method: "POST",
    body: JSON.stringify({ session_id: sessionId, message }),
  });
}

export { ApiError };
