import axios from "axios";

const API_URL = "http://localhost:5000/api/tracking";

export const getOrCreateSessionId = (): string => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = "sess_" + Math.random().toString(36).substring(2, 12);
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

export const trackEvent = async (
  event: "visit" | "add_to_cart" | "checkout" | "purchase",
  data: Record<string, any> = {}
) => {
  try {
    const sessionId = getOrCreateSessionId();
    await axios.post(
      API_URL,
      { event, ...data },
      {
        headers: {
          "x-session-id": sessionId,
        },
      }
    );
  } catch (err) {
    console.error("⚠️ Tracking error:", (err as any).message);
  }
};
