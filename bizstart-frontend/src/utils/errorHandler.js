import toast from 'react-hot-toast';

/**
 * Friendly Error Mapper
 * Translates backend/network errors into user-friendly messages.
 */
export const mapError = (error) => {
  const backendMessage = error.response?.data?.message;
  
  if (backendMessage) {
    // Specific business logic mappings
    if (backendMessage.toLowerCase().includes("credentials")) {
      return "Oops! That email or password doesn't look right. Please try again.";
    }
    if (backendMessage.toLowerCase().includes("already registered")) {
      return "This email is already in use. Try logging in instead!";
    }
    return backendMessage;
  }

  // Network/Server errors
  if (error.message === "Network Error") {
    return "Connection lost! Please check your internet or ensure the backend is running.";
  }

  return "Something went wrong on our end. Please try again in a moment.";
};

/**
 * Global Error Handler with Toast
 */
export const handleError = (error, fallbackMessage = null) => {
  const message = fallbackMessage || mapError(error);
  toast.error(message);
  console.error("[API Error]:", error);
};

export default handleError;
