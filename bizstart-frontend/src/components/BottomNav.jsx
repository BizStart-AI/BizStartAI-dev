import React from "react";

const BottomNav = () => (
  <div className="fixed bottom-0 left-0 w-full md:hidden border-t bg-white flex justify-around text-sm text-gray-500 px-4 py-3 shadow-md">
    <div style={{ color: "#6E62B1" }}>Home</div> {/* active */}
    <div>Tools</div>
    <div>AI Mentor</div>
    <div>Profile</div>
  </div>
);

export default BottomNav;