import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingImg from '../assets/OnBoarding.jpg'; 

const Welcome = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);
    const img = new Image();
    img.src = OnboardingImg;
    img.onload = () => {
      setTimeout(() => { navigate('/Onboarding'); }, 600); 
    };
    img.onerror = () => { navigate('/Onboarding'); };
  };

  return (
    // 1. FIXED: Added 'h-[100dvh]' to lock the height to the dynamic viewport
    // Added 'fixed inset-0' to nail the background to the screen edges
    <div className="fixed inset-0 h-dvh w-full bg-white flex justify-center overflow-hidden">
      
      <div 
        style={{ width: '100%', maxWidth: '380px', height: '100%' }} 
        className="flex flex-col px-6 relative"
      >
        
        {/* LOGO SECTION: Centered in the top area */}
        <div className="flex-1 flex flex-col justify-center items-center pb-20">
          <div className="flex flex-col items-center text-center w-full">
            <div className="flex items-center gap-3 mb-4">
              <span 
                style={{ 
                  fontFamily: "'Jacques Francois', serif",
                  fontSize: '38px', 
                  fontWeight: '400',
                  lineHeight: '100%',
                  letterSpacing: '-0.03em' 
                }}
                className="text-slate-700"
              >
                BizStart
              </span>
              
              <div 
                style={{ background: 'linear-gradient(90deg, #6E62B1 0%, #333333 100%)' }}
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
              >
                <span style={{ fontFamily: "'Jacques Francois', serif", fontSize: '20px', color: 'white' }}>
                  AI
                </span>
              </div>
            </div>
            
            <h2 
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', fontWeight: '300' }}
              className="text-slate-500"
            >
              Your Business Paddy
            </h2>
          </div>
        </div>

        {/* BOTTOM ACTION SECTION: Absolute locked to the bottom */}
        <div className="absolute bottom-8 left-6 right-6 flex flex-col items-center gap-4">
          <p 
            style={{ 
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              color: '#94a3b8',
              textAlign: 'center',
            }}
            className="w-full"
          >
            By continuing, you agree to our{' '}
            <a href="#" className="text-[#6E62B1] hover:underline">Terms</a> and <a href="#" className="text-[#6E62B1] hover:underline">Privacy Policy</a>.
          </p>
          
          <button 
            onClick={handleContinue}
            disabled={isLoading}
            style={{ 
              backgroundColor: '#6E62B1',
              fontFamily: "'Inter', sans-serif",
              fontWeight: '500',
              fontSize: '15px',
              textShadow: '0px 1px 4px rgba(0, 0, 0, 0.40)',
              boxShadow: '0px 4px 10px rgba(110, 98, 177, 0.2)'
            }}
            className="w-full text-white py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer border-none outline-none"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Continue...</span>
              </>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;