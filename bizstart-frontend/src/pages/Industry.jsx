import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import Beauty from '../assets/Beauty.png';
import Retail from '../assets/Retail.png';
import Gown from '../assets/Gown.png';
import Small from '../assets/Small.png';
import Service from '../assets/Service.png';
import SuccessThumb from '../assets/SuccessThumb.png';

const SelectIndustryScreen = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(() => {
    const data = JSON.parse(localStorage.getItem('userAccount') || '{}');
    return data.suggestedIndustry || 'beauty';
  });
  
  
  

  const allIndustries = [
    { id: 'beauty', title: 'Beauty & Personal Care', desc: 'Includes skincare, soap making, and hair products', img: Beauty },
    { id: 'retail', title: 'Retail & General Trade', desc: 'If you just buy and sell finished products', img: Retail },
    { id: 'small-scale', title: 'Small-Scale Production', desc: 'If you manufacture the soaps yourself', img: Small },
    { id: 'service', title: 'Service Provider', desc: 'If you offer skincare consultations or spa services', img: Service },
    { id: 'fashion', title: 'Fashion & Lifestyle', desc: 'If you sell beauty alongside clothes and accessories', img: Gown }
  ];

  const currentSelection = allIndustries.find(item => item.id === selectedId);
  const otherIndustries = allIndustries.filter(item => item.id !== selectedId);

  // 1. Add this state at the top of your component
const [isNavigating, setIsNavigating] = useState(false);

// 2. Update your handleContinue function
const handleContinue = () => {
  setIsNavigating(true); // 1. Trigger the loading state immediately

  // 2. Start both the image loading and a minimum timer at the same time
  const imagePromise = new Promise((resolve) => {
    const img = new Image();
    img.src = SuccessThumb;
    img.onload = resolve;
    img.onerror = resolve; // Proceed even if image fails
  });

  const timerPromise = new Promise((resolve) => setTimeout(resolve, 800));

  // 3. Wait for BOTH the image and the timer to finish before navigating
  Promise.all([imagePromise, timerPromise]).then(() => {
    const existingData = JSON.parse(localStorage.getItem('userAccount') || '{}');
    localStorage.setItem('userAccount', JSON.stringify({ ...existingData, industry: selectedId }));
    navigate('/FinishSetup');
  });
};

  return (
    <div className="fixed inset-0 h-dvh w-full bg-white flex justify-center overflow-hidden">
      <div style={{ width: '100%', maxWidth: '380px', height: '100%' }} className="flex flex-col px-6 py-4">
        
        {/* THE CHANGE: Changed justify-between to justify-center and added gap-8 */}
        <div className="flex-1 flex flex-col gap-8 mt-2">
          
          {/* GROUP 1: Header and Instructions */}
          <div>
            <div className="relative w-full flex items-center justify-center mb-6">
              <button 
                onClick={() => navigate(-1)} 
                className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-50 text-slate-600 cursor-pointer outline-none ring-0"
              >
                <FaChevronLeft size={14} />
              </button>
              <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300', fontSize: '22px' }} className="text-slate-900">
                Select your Industry
              </h1>
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300', fontSize: '13px', textAlign: 'center', color: '#666666' }} className="mb-0">
              Based on your idea, I’ve picked the best category for you
            </p>
          </div>

          {/* GROUP 2: Everything else */}
          <div className="w-full">
            {/* DYNAMIC TOP CARD */}
            <div 
              style={{ backgroundColor: '#6E62B1' }}
              className="w-full flex items-start gap-4 p-4 rounded-2xl border border-[#6E62B1] text-white shadow-lg mb-6 transition-all duration-300 outline-none ring-0"
            >
              <div className="mt-1 w-7 h-7 shrink-0">
                <img 
                  src={currentSelection.img} 
                  alt="Icon" 
                  style={{ filter: 'brightness(0) invert(1)' }}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300', fontSize: '16px' }}>
                  {currentSelection.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300', fontSize: '12px' }}>
                  {currentSelection.desc}
                </p>
              </div>
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300', fontSize: '12px', textAlign: 'center', color: '#64748b' }} className="mb-4">
              Not the right fit? Pick another one below:
            </p>

            <div 
              className="w-full flex flex-col gap-2.5 overflow-y-auto max-h-56 pr-1 mb-6"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch' 
              }}
            >
              <style>{`div::-webkit-scrollbar { display: none; }`}</style>
              {otherIndustries.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-100 bg-white shadow-sm transition-all cursor-pointer active:scale-[0.98] outline-none ring-0"
                >
                  <div className="mt-1 w-6 h-6 shrink-0">
                    <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300', fontSize: '14px' }} className="text-slate-900">
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300', fontSize: '12px' }} className="text-slate-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleContinue}
              disabled={isNavigating}
              style={{ 
                backgroundColor: '#6E62B1', 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: '500', 
                fontSize: '15px',
                textShadow: '0px 1px 4px rgba(0, 0, 0, 0.40)', 
                boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.40)',
                opacity: isNavigating ? 0.8 : 1
              }}
              className="w-full text-white py-3.5 rounded-xl cursor-pointer border-none outline-none ring-0 flex items-center justify-center gap-2"
            >
              {isNavigating ? (
                <>
                  {/* Standard CSS spinner */}
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Finalizing...</span>
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SelectIndustryScreen;