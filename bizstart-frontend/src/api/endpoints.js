const API_BASE = "/auth";

export const ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  GOOGLE_AUTH: "/auth/google",

  // User & Profile
  USER_ME: "/users/me",
  BUSINESS_PROFILE: "/users/business-profile",
  DASHBOARD: "/users/dashboard",
  PROGRESS_DASHBOARD: "/users/progress",

  // AI Tools
  SUGGEST_INDUSTRY: "/ai/suggest-industry",
  AI_CHAT: "/ai/chat",
  RECOMMENDATIONS: "/ai/recommendations",

  // Conversations
  CONVERSATIONS: "/conversations",
  MESSAGES: "/messages",
  GET_MESSAGES: (convId) => `/messages/${convId}`,
};

export default ENDPOINTS;
