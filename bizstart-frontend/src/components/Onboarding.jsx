import React from 'react';
import { useNavigate } from 'react-router-dom';
import Onboarding from '../assets/OnBoarding.jpg';

const OnboardingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 h-dvh w-full bg-white flex justify-center overflow-hidden">
      <div 
        style={{ 
          width: '100%',
          maxWidth: '400px', 
          display: 'flex',
          flexDirection: 'column',
          padding: '24px', // Balanced padding
          height: '100%',
        }}
      >
        {/* 1. This wrapper pushes everything to the middle of the screen */}
        <div className="flex-1 flex flex-col py-4">
          
          {/* Headline Section */}
          <div className="mb-2">
            <h1 
              style={{ 
                fontFamily: "'-apple-system', 'SF Pro', 'Inter', sans-serif",
                fontWeight: '500', 
                fontSize: '32px',
                lineHeight: '110%',
                color: '#1A1A1A',
              }}
            >
              Learn at Your Pace
            </h1>
          </div>

          {/* Description Text */}
          <p 
            style={{ 
              fontFamily: "'Inter', sans-serif",
              fontSize: '17px',
              fontWeight: '100',
              lineHeight: '140%',
              letterSpacing: '-0.02em',
              color: '#666666',
            }}
          >
            Quick lessons on everything market research to financial planning for busy entrepreneurs.
          </p>

          {/* Illustration Section */}
          <div className="flex flex-col items-center pt-8"> 
            <div className="w-full flex justify-center" style={{ height: '300px' }}>
              <img 
                src={Onboarding}
                alt="Learning illustration" 
                className="h-full w-auto object-contain"
                loading="eager"
              />
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-4 mt-6 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
              <div className="flex items-center justify-center w-4 h-4 border border-slate-900 rounded-full">
                <div className="w-2 h-2 rounded-full bg-slate-900" />
              </div>
              <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
            </div>
          </div>

          {/* Action Buttons - Constrained width so they look medium on desktop */}
          <div className="flex flex-col gap-3 mx-auto w-full max-w-[320px]">
            <button 
              onClick={() => navigate('/Signup')}
              style={{ 
                backgroundColor: '#6E62B1',
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontSize: '15px',
                textShadow: '0px 1px 4px rgba(0, 0, 0, 0.40)',
                boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.40)'
              }}
              className="w-full text-white py-3.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer border-none"
            >
              Create Account
            </button>

            <button 
              onClick={() => navigate('/Login')}
              style={{ 
                backgroundColor: '#F5F5F5',
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontSize: '15px',
                color: '#1E293B',
                
              }}
              className="w-full py-3.5 rounded-xl border border-gray-300 transition-all active:scale-[0.98] cursor-pointer"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;