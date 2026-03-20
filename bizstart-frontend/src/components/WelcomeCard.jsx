import React from "react";

const WelcomeCard = ({ name }) => (
  <div
    className="bg-primary text-white rounded-2xl p-4 mb-6"
  >
    <p className="font-semibold">Welcome {name}, I am your business paddy!</p>
    <p className="text-sm opacity-90 mt-1">
      You&apos;re at the beginning of an exciting journey. Let&apos;s turn your idea into reality together!
    </p>
  </div>
);

export default WelcomeCard;