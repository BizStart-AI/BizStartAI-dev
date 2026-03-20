import React from "react";
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ text, sender }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
          isUser ? "bg-primary text-white" : "bg-primary-light text-dark"
        }`}
      >
        {/* Replace {text} with the Markdown component */}
        <div className="markdown-container">
  <ReactMarkdown>{text}</ReactMarkdown>
</div>
      </div>
    </div>
  );
};

export default ChatMessage;