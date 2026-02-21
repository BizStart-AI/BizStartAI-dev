import React from "react";
import { Bell } from "lucide-react";
import Logo from "../assets/bizstart-ai.png";

const userData = { name: "Sandra" };
const recommendedCourses = [
  {
    title: "Understanding Your Market",
    description: "Research your target audience and analyze competitors.",
    lessons: 6,
    duration: 35,
    level: "Beginner",
  },
  {
    title: "Business Strategy Basics",
    description: "Learn how to plan and execute your business strategy.",
    lessons: 4,
    duration: 25,
    level: "Beginner",
  },
];

const exploreOptions = [
  {
    icon: "🤖",
    title: "Refine Your Idea",
    description: "Chat with AI to strengthen your business concept",
  },
  {
    icon: "📋",
    title: "Create Your Plan",
    description: "Generate your first business plan with AI assistance",
  },
  {
    icon: "💡",
    title: "Get Insights",
    description: "Analyze market trends with AI suggestions",
  },
  {
    icon: "📊",
    title: "Track Growth",
    description: "Monitor metrics and KPIs efficiently",
  },
];

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen bg-white flex justify-center overflow-auto p-4">
      {/* Container: mobile-first max width, centered */}
      <div className="w-full max-w-[1200px] flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <img src={Logo} alt="BizStart AI" className="h-10 object-contain" />
          <Bell stroke="black" size={22} />
        </div>

        {/* Welcome Card */}
        <div
          style={{ backgroundColor: "#6E62B1" }}
          className="text-white rounded-2xl p-4"
        >
          <p className="font-semibold">
            Welcome {userData.name}, I am your business paddy!
          </p>
          <p className="text-sm opacity-90 mt-1">
            You're at the beginning of an exciting journey. Let’s turn your idea
            into reality together!
          </p>
        </div>

        {/* Recommended Courses */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-3">Recommended for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedCourses.map((course, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-2xl p-4 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{course.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mt-3 flex-wrap">
                    <span>📖 {course.lessons} Lessons</span>
                    <span>⏱ {course.duration} Minutes</span>
                    <span>⭐ {course.level}</span>
                  </div>
                </div>
                <button
                  style={{ backgroundColor: "#6E62B1" }}
                  className="text-white px-4 py-2 rounded-lg text-sm mt-4 md:mt-auto self-start"
                >
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Section */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-3">Explore More</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {exploreOptions.map((option, idx) => (
              <div
                key={idx}
                className="bg-gray-100 rounded-2xl p-4 text-center"
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <p className="font-medium">{option.title}</p>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Nav (mobile-only) */}
        <div className="sticky bottom-0 mt-6 pt-4 border-t flex justify-around text-sm text-gray-500 bg-white md:hidden">
          <div style={{ color: "#6E62B1" }}>Home</div>
          <div>Tools</div>
          <div>AI Mentor</div>
          <div>Profile</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;