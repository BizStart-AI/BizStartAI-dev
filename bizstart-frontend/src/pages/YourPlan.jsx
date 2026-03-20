import React from "react";
import PageWrapper from "../components/PageWrapper";
import { FaCheckCircle, FaFilePdf, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
 
export default function PlanReady() {
  const navigate = useNavigate();
 
  return (
    <PageWrapper>
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 bg-white rounded-2xl shadow-sm border text-gray-600 active:scale-95 transition-all"
        >
          <FaArrowLeft size={16} />
        </button>
        <h1 className="text-xl font-bold">Business Plan</h1>
      </div>
 
      <div className="bg-primary text-white p-8 rounded-[32px] text-center mb-10 shadow-lg relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 p-4 rounded-full">
            <FaCheckCircle size={40} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Plan Generated!</h2>
        <p className="text-sm opacity-90 max-w-xs mx-auto">
          Your AI-powered business plan is ready. You can now preview or download your roadmap to success.
        </p>
      </div>
 
      <div className="flex flex-col gap-4 mb-10">
        <button
          className="w-full py-4 rounded-2xl text-white bg-primary font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <FaFilePdf size={18} />
          Preview Business Plan
        </button>
 
        <button className="w-full py-4 rounded-2xl border-2 border-primary/20 text-primary font-bold bg-white flex items-center justify-center gap-3 active:scale-95 transition-all">
          Download PDF Document
        </button>
      </div>
 
      <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">What's inside?</h3>
        <ul className="space-y-4">
          {["Executive Summary", "Market Analysis", "Operational Plan", "Financial Projections"].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </PageWrapper>
  );
}