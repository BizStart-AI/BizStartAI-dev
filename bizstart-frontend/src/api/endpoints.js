const API_BASE = "/auth";

export const ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE}/login`,
  REGISTER: `${API_BASE}/register`,
  GOOGLE_AUTH: `${API_BASE}/google`,

  // Conversations
  CONVERSATIONS: "/conversations",
  
  // Messages
  MESSAGES: "/messages",
  GET_MESSAGES: (convId) => `/messages/${convId}`,
};

export default ENDPOINTS;
