import React from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessThumb from '../assets/SuccessThumb.png'; // Ensure this matches your asset name

const SuccessScreen = () => {
  const navigate = useNavigate();

  // Retrieve user name for potential personalization
  const userData = JSON.parse(localStorage.getItem('userAccount') || '{}');
  const userName = userData.name || 'Entrepreneur';

  return (
    /* FIXED SCREEN: Added h-screen and overflow-hidden to keep it fixed */
   <div className="fixed inset-0 h-dvh w-full bg-white flex justify-center overflow-hidden">
      {/* MEDIUM SIZE: maxWidth 380px for a medium feel */}
      <div style={{ width: '100%', maxWidth: '380px', height: '100%' }} className="flex flex-col px-6 py-6">
        {/* CENTERED SECTION: Wrapping everything in a flex-1 justify-center div */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          
          {/* Success Illustration */}
          <div className="mb-10">
            <img 
              src={SuccessThumb} 
              alt="Success" 
              className="w-24 h-auto"
            />
          </div>

          {/* Success Header */}
          <h1 
            style={{ 
              fontFamily: "'Inter', sans-serif",
              fontWeight: '200',
              fontSize: '28px', // Slightly reduced for medium scale balance
              lineHeight: '120%',
              letterSpacing: '-0.02em'
            }}
            className="text-slate-900 mb-4"
          >
            You're All Set!
          </h1>

          {/* Success Subtext */}
          <p 
            style={{ 
              fontFamily: "'Inter', sans-serif",
              fontWeight: '200',
              fontSize: '13px', // Reduced slightly for medium scale
              lineHeight: '140%',
              textAlign: 'center',
              color: '#666666',
              maxWidth: '300px',
              marginTop: '8px',
              marginBottom: '60px' // Slightly reduced gap for centered balance
            }}
          >
            Welcome to BizStart AI, your business paddy! <br />
            Your personalized dashboard is ready <br />
            and we've created a custom learning path just for you.
          </p>

          {/* Final Action Button */}
          <button 
            onClick={() => navigate('/Dashboard')}
            style={{ 
              backgroundColor: '#6E62B1',
              fontFamily: "'Inter', sans-serif",
              fontWeight: '500', 
              fontSize: '15px',
              lineHeight: '140%',
              textShadow: '0px 1px 5px rgba(0, 0, 0, 0.50)',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.10)'
            }}
            className="w-full text-white py-3.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer border-none"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;