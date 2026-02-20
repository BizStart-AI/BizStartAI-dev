import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaApple, FaGoogle, FaLock, FaEyeSlash, FaEye, FaChevronLeft } from 'react-icons/fa';
import { useGoogleLogin } from '@react-oauth/google';

const LoginScreen = () => {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Login Success! Access Token:", tokenResponse.access_token);
      navigate('/BusinessJourney'); 
    },
    onError: () => alert("Google Login Failed. Please try again."),
  });

  return (
    /* FIXED SCREEN: Added h-screen and overflow-hidden */
    <div className="fixed inset-0 h-dvh w-full bg-white flex justify-center overflow-hidden">
      {/* MEDIUM SIZE: maxWidth 380px for a medium feel */}
      <div style={{ width: '100%', maxWidth: '380px', height: '100%' }} className="flex flex-col px-6 py-6">
        {/* CENTERED SECTION: Wrapping everything in a flex-1 justify-center div */}
      <div className="flex-1 flex flex-col justify-between">
          {/* Header Section */}
          <div className="relative flex items-center justify-center mb-4">
            <button 
              onClick={() => navigate(-1)}
              className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-50 text-slate-600 cursor-pointer"
            >
              <FaChevronLeft size={14} />
            </button>
            
            <h1 
              style={{ 
                fontFamily: "'Inter', sans-serif",
                fontWeight: '400',
                fontSize: '22px', // Medium scale balance
                letterSpacing: '-0.02em'
              }}
              className="text-slate-900"
            >
              Welcome Back!
            </h1>
          </div>

          <p 
            style={{ 
              fontFamily: "'Inter', sans-serif",
              fontWeight: '300',
              fontSize: '13px',
              textAlign: 'center',
              color: '#666666',
            }}
            className="mb-8"
          >
            Your business paddy is ready to help
          </p>

          {/* Form Field */}
          <div className="flex flex-col gap-2 mb-6">
            <label 
              style={{ 
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontSize: '15px',
              }}
              className="text-slate-900"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaLock size={14} />
              </span>
              <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"} 
                placeholder="Enter password" 
                className="w-full p-3.5 pl-10 pr-10 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#6E62B1] transition-colors placeholder:text-gray-400 text-sm"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer hover:text-gray-500"
              >
                {showPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
              </button>
            </div>
            
            <button className="text-right text-[#6E62B1] text-xs font-medium mt-1 hover:underline cursor-pointer">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button 
            onClick={() => navigate('/BusinessJourney')} 
            style={{ 
              backgroundColor: '#6E62B1',
              fontFamily: "'Inter', sans-serif",
              fontWeight: '500',
              fontSize: '15px',
              textShadow: '0px 1px 4px rgba(0, 0, 0, 0.40)',
              boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.40)'
            }}
            className="w-full text-white py-3.5 rounded-xl transition-all active:scale-[0.98] mt-4 cursor-pointer border-none"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-gray-400 text-xs">Or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white font-medium text-sm text-slate-800 transition-all hover:bg-gray-50 cursor-pointer">
              <FaApple size={18} />
              Login with Apple
            </button>
            
            <button 
              onClick={() => googleLogin()}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white font-medium text-sm text-slate-800 transition-all hover:bg-gray-50 cursor-pointer active:scale-[0.98]"
            >
              <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google" className="w-4 h-4" />
              Login with Google
            </button>
          </div>

          {/* Footer Link */}
          <p className="text-center text-xs text-slate-600 mt-8 font-sans">
            Don’t have an account? <button onClick={() => navigate('/signup')} className="text-[#6E62B1] font-semibold hover:underline cursor-pointer">Create Account</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;