import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import api from '../api';
import ENDPOINTS from '../api/endpoints';
import toast, { Toaster } from 'react-hot-toast';
import PageWrapper from '../components/PageWrapper';
import PrimaryButton from '../components/PrimaryButton';

const EarlyStageScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [earlyData, setEarlyData] = useState({
    business_name: '',
    description: '',
    monthly_revenue: '',
    team_size: '',
    primary_goals: []
  });

  const goalOptions = [
    "Acquire first customers",
    "Grow business base",
    "Increase revenue",
    "Build the team",
    "Raise funding"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEarlyData(prev => ({ ...prev, [name]: value }));
  };

  const toggleGoal = (goal) => {
    setEarlyData(prev => {
      const isSelected = prev.primary_goals.includes(goal);
      return {
        ...prev,
        primary_goals: isSelected
          ? prev.primary_goals.filter(g => g !== goal)
          : [...prev.primary_goals, goal]
      };
    });
  };

  const getAISuggestedIndustry = async (name, audience) => {
    try {
      const prompt = `Business Name: "${name}". Target Audience: "${audience}".`;
      const res = await api.post(ENDPOINTS.SUGGEST_INDUSTRY, { text: prompt });
      return res.data?.industry || "retail";
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      return "retail";
    }
  };

  const handleContinue = async () => {
    if (!earlyData.business_name || !earlyData.description) {
      toast.error("Please fill in your business name and audience!");
      return;
    }

    setIsLoading(true);

    const suggestedIndustry = await getAISuggestedIndustry(
      earlyData.business_name,
      earlyData.description
    );

    const existingData = JSON.parse(localStorage.getItem('userAccount') || '{}');

    localStorage.setItem('userAccount', JSON.stringify({
      ...existingData,
      ...earlyData,
      industry: suggestedIndustry,
      business_stage: 'early'
    }));

    setIsLoading(false);

    // UPDATED: Show success toast and wait before navigating
    toast.success("Details saved successfully!");
    setTimeout(() => {
      navigate('/Industry');
    }, 1000);
  };

  return (
    <PageWrapper className="mt-2 px-6 py-4">
      {/* UPDATED: Custom animation for slide-in effect */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'custom-toast',
          duration: 3000,
        }}
      />

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .custom-toast {
          animation: slideInRight 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
      `}</style>

      <div className="flex-1 flex flex-col ">
        <div>
          <div className="relative w-full flex items-center justify-center mb-4">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-50 text-slate-600 cursor-pointer"
            >
              <FaChevronLeft size={14} />
            </button>
            <h1 className="text-slate-900 font-sans font-light text-[22px] tracking-[-0.02em]">
              Early Stage
            </h1>
          </div>

          <div className="text-center mb-6">
            <p className="text-slate-500 text-xs leading-relaxed font-sans">
              Great! You're in the early phase.<br />
              Let's make sure you have everything in place.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[60vh] pr-1 mb-6 scrollbar-hide">
          <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-900 font-sans">Business Name</label>
            <input
              name="business_name"
              value={earlyData.business_name}
              onChange={handleInputChange}
              placeholder="Example: Mama T's Glow Shop"
              className="w-full p-3.5 rounded-xl border border-gray-200 outline-none focus:border-primary transition-colors placeholder:text-sm placeholder:text-gray-300 text-base font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-900 font-sans">Target Audience</label>
            <textarea
              name="description"
              value={earlyData.description}
              onChange={handleInputChange}
              placeholder="Who are you selling to?"
              className="w-full p-3.5 h-20 rounded-xl border border-gray-200 outline-none focus:border-primary transition-colors placeholder:text-sm placeholder:text-gray-300 resize-none text-base font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-900 font-sans">Monthly Revenue (Naira)</label>
            <input
              name="monthly_revenue"
              value={earlyData.monthly_revenue}
              onChange={handleInputChange}
              placeholder="Example: 200,000"
              className="w-full p-3.5 rounded-xl border border-gray-200 outline-none focus:border-primary transition-colors placeholder:text-sm placeholder:text-gray-300 text-base font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-900 font-sans">Team Size</label>
            <input
              name="team_size"
              value={earlyData.team_size}
              onChange={handleInputChange}
              placeholder="Example: 3 people"
              className="w-full p-3.5 rounded-xl border border-gray-200 outline-none focus:border-primary transition-colors placeholder:text-sm placeholder:text-gray-300 text-base font-sans"
            />
          </div>

          <div className="flex flex-col gap-3 mt-1">
            <label className="text-sm font-semibold text-slate-900 font-sans">Primary Goal</label>
            <div className="flex flex-col gap-2.5">
              {goalOptions.map((goal, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => toggleGoal(goal)}
                    className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${earlyData.primary_goals.includes(goal)
                        ? 'bg-primary border-primary'
                        : 'border-gray-300'
                      }`}
                  >
                    {earlyData.primary_goals.includes(goal) && (
                      <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                    )}
                  </div>
                  <span className="text-slate-600 text-xs font-sans">{goal}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full mb-4">
          <PrimaryButton
            onClick={handleContinue}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 shadow-md font-bold"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Identifying Industry...</span>
              </>
            ) : "Continue"}
          </PrimaryButton>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EarlyStageScreen;