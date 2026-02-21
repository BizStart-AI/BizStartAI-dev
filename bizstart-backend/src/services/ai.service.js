const axios = require("axios");

const generateAIResponse = async (messages) => {
  try {
    // If AI service is not configured → fallback
    if (!process.env.AI_SERVICE_URL) {
      return {
        text: `Mock AI response to: "${messages[messages.length - 1].content}"`,
        tokens_used: null,
      };
    }

    const response = await axios.post(
      process.env.AI_SERVICE_URL,
      { messages }, // adapt later if they require different format
      {
        headers: {
          "Content-Type": "application/json",
          ...(process.env.AI_SERVICE_KEY && {
            Authorization: `Bearer ${process.env.AI_SERVICE_KEY}`,
          }),
        },
        timeout: 15000,
      }
    );

    return {
      text: response.data.response || response.data.text,
      tokens_used: response.data.tokens_used || null,
    };

  } catch (error) {
    console.error("AI Service error:", error.response?.data || error.message);
    throw new Error("AI service unavailable");
  }
};

module.exports = { generateAIResponse };



