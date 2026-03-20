import React, { useEffect, useState } from "react";
import { Bell, Home, Briefcase, MessageSquare, User } from "lucide-react";
import Logo from "../assets/bizstart-ai.png";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ENDPOINTS } from "../api/endpoints";
import BottomNav from "../components/BottomNav";
import { FaBookOpen, FaRegClock, FaStar } from "react-icons/fa6";
import { RiRobot2Line } from "react-icons/ri";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState(() => {
    try {
      const saved = localStorage.getItem('userAccount');
      return saved ? (JSON.parse(saved).name || "Business Owner") : "Business Owner";
    } catch {
      return "Business Owner";
    }
  });
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(true);


  useEffect(() => {
    let mounted = true;

    async function fetchRecommendations(userData) {
      try {
        const res = await api.post(ENDPOINTS.RECOMMENDATIONS, {
          businessName: userData.business_name || userData.businessName,
          industry: userData.industry || userData.suggestedIndustry,
          stage: userData.business_stage || userData.stage
        });

        if (!mounted) return;

        const aiData = res.data?.data || res.data || [];
        const stage = userData.business_stage || userData.stage; // Extracted stage
        const formattedData = aiData.map(item => ({
          ...item,
          level: stage === 'growth' ? 'Advanced' : 'Beginner' // Used extracted stage
        }));

        setRecommendedCourses(formattedData);
        setIsAiLoading(false);
      } catch (error) {
        console.error("AI Fetch Error:", error);
        if (!mounted) return;

        setIsAiLoading(false); // Set loading to false on error
      }
    }

    const savedData = localStorage.getItem('userAccount');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const cache = localStorage.getItem('ai_lessons_cache');
      if (!cache) {
        fetchRecommendations(parsedData);
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  const exploreOptions = [
    { icon: <RiRobot2Line className="text-primary mx-auto" />, title: "Refine Your Idea", description: "Chat with AI to strengthen your business concept" },
    { icon: <HiOutlineClipboardDocumentList className="text-primary mx-auto" />, title: "Create Your Plan", description: "Generate your first business plan with AI assistance" }
  ];

  return (
    <div className="w-full min-h-screen bg-white flex justify-center overflow-auto p-4">
      <div className="w-full max-w-300 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <img src={Logo} alt="BizStart AI" className="h-10 object-contain" />
          <Bell className="text-dark cursor-pointer" size={22} />
        </div>

        <div className="bg-primary text-white rounded-2xl p-4">
          <p className="font-semibold">Welcome {userName}, I am your business paddy!</p>
          <p className="text-sm opacity-90 mt-1">
            You're at the beginning of an exciting journey. Let’s turn your idea into reality together!
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-800 mb-3">Recommended for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isAiLoading ? (
              <div className="col-span-full py-10 flex flex-col items-center justify-center text-gray-400">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2" />
                <p className="text-xs">Paddy is personalizing your lessons...</p>
              </div>
            ) : (
              recommendedCourses.map((course, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                  <div>
                    <h3 className="font-semibold text-gray-800">{course.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      {course.description}
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500 mt-3 flex-wrap items-center">
                      <span className="flex items-center gap-1.5"><FaBookOpen className="text-primary" /> {course.lessons} Lessons</span>
                      <span className="flex items-center gap-1.5"><FaRegClock className="text-primary" /> {course.duration} Minutes</span>
                      <span className="flex items-center gap-1.5"><FaStar className="text-yellow-500" /> {course.level}</span>
                    </div>
                  </div>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm mt-4 md:mt-auto self-start cursor-pointer transition-all active:scale-95"
                  >
                    Start
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-gray-800 mb-3">Explore More</h2>
          <div className="grid grid-cols-2 gap-4">
            {exploreOptions.map((option, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (option.title === "Refine Your Idea") navigate('/chat');
                  if (option.title === "Create Your Plan") navigate('/BusinessPlan');
                }}
                className="bg-gray-100 rounded-2xl p-4 text-center cursor-pointer hover:bg-gray-200 transition-colors active:scale-95"
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <p className="font-medium text-sm">{option.title}</p>
                <p className="text-[10px] text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Fixed Bottom Navigation */}
        <BottomNav />
      </div>
    </div >
  );
};

export default Dashboard;