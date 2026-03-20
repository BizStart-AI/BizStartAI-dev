import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import api from '../api';
import ENDPOINTS from '../api/endpoints';
// ADDED: Import toast and the Toaster container
import toast, { Toaster } from 'react-hot-toast';
import PageWrapper from '../components/PageWrapper';
import PrimaryButton from '../components/PrimaryButton';

const GrowthStageScreen = () => {
  const navigate = useNavigate();

  // NEW: Loading state for AI processing
  const [isLoading, setIsLoading] = useState(false);

  // State for form inputs
  const [growthData, setGrowthData] = useState({
    business_name: '',
    description: '',
    operating_time: '',
    challenges: []
  });

  const challengesOptions = [
    "Acquiring New Customers",
    "Scaling Operations",
    "Hiring the right team",
    "Improving profit",
    "Market Competition"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrowthData(prev => ({ ...prev, [name]: value }));
  };

  const toggleChallenge = (challenge) => {
    setGrowthData(prev => {
      const isSelected = prev.challenges.includes(challenge);
      return {
        ...prev,
        challenges: isSelected
          ? prev.challenges.filter(c => c !== challenge)
          : [...prev.challenges, challenge]
      };
    });
  };

  // 2. NEW: Function to pick the Industry ID based on growth details
  const getAISuggestedIndustry = async (name, description) => {
    try {
      const prompt = `Business Name: "${name}". Description: "${description}".`;
      const res = await api.post(ENDPOINTS.SUGGEST_INDUSTRY, { text: prompt });
      return res.data?.industry || "retail";
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      return "retail"; // Fallback
    }
  };

  const handleContinue = async () => {
    // REPLACED: alert with toast.error
    if (!growthData.business_name || !growthData.description) {
      toast.error("Please provide your business name and description!");
      return;
    }

    setIsLoading(true);

    const suggestedIndustry = await getAISuggestedIndustry(
      growthData.business_name,
      growthData.description
    );

    const existingData = JSON.parse(localStorage.getItem('userAccount') || '{}');

    localStorage.setItem('userAccount', JSON.stringify({
      ...existingData,
      ...growthData,
      industry: suggestedIndustry,
      business_stage: 'growth'
    }));

    setIsLoading(false);

    // ADDED: Success message and navigation delay
    toast.success("Growth details saved successfully!");
    setTimeout(() => {
      navigate('/Industry');
    }, 1000);
  };

  return (
    <PageWrapper className="mt-2 px-6 py-4">
      {/* ADDED: Toaster with right-slide animation */}
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

        {/* Header */}
        <div className="relative w-full flex items-center justify-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-50 text-slate-600 cursor-pointer outline-none border-none"
          >
            <FaChevronLeft size={14} />
          </button>
          <h1 className="text-slate-900 font-sans font-light text-[22px] tracking-[-0.02em]">
            Growth Stage
          </h1>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-6">
          <p className="text-slate-500 text-xs leading-relaxed font-sans">
            Exciting! You're ready to launch.<br />Let’s grow your business.
          </p>
        </div>

        <div className="w-full flex flex-col gap-4 mb-6 overflow-y-auto max-h-[60vh] pr-1 scrollbar-hide">
          <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-900 font-sans">Business Name</label>
            <input
              name="business_name"
              value={growthData.business_name}
              onChange={handleInputChange}
              placeholder="Your registered business name"
              className="w-full p-3.5 rounded-xl border border-gray-200 outline-none focus:border-primary transition-colors placeholder:text-sm placeholder:text-gray-300 text-base font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-900 font-sans">Business Description</label>
            <input
              name="description"
              value={growthData.description}
              onChange={handleInputChange}
              placeholder="Quick elevator pitch"
              className="w-full p-3.5 rounded-xl border border-gray-200 outline-none focus:border-primary transition-colors placeholder:text-sm placeholder:text-gray-300 text-base font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-900 font-sans">Operating Time</label>
            <input
              name="operating_time"
              value={growthData.operating_time}
              onChange={handleInputChange}
              placeholder="Example: 2 years"
              className="w-full p-3.5 rounded-xl border border-gray-200 outline-none focus:border-primary transition-colors placeholder:text-sm placeholder:text-gray-300 text-base font-sans"
            />
          </div>

          <div className="flex flex-col gap-3 mt-1">
            <label className="text-sm font-semibold text-slate-900 font-sans">Growth Challenges</label>
            <div className="flex flex-col gap-2.5">
              {challengesOptions.map((option, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => toggleChallenge(option)}
                    className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${growthData.challenges.includes(option)
                        ? 'bg-primary border-primary'
                        : 'border-gray-300'
                      }`}
                  >
                    {growthData.challenges.includes(option) && (
                      <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                    )}
                  </div>
                  <span className="text-slate-600 text-xs font-sans">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full mb-4">
          <PrimaryButton
            onClick={handleContinue}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 shadow-md font-bold"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Analyzing Stage...</span>
              </>
            ) : "Continue"}
          </PrimaryButton>
        </div>
      </div>
    </PageWrapper>
  );
};

export default GrowthStageScreen;