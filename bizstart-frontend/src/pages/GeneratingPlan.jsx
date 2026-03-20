import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import api from "../api";
import { ENDPOINTS } from "../api/endpoints";

export default function GeneratingPlan() {
  const navigate = useNavigate();
  useEffect(() => {
    const syncOnboardingData = async () => {
      try {
        const savedData = JSON.parse(localStorage.getItem('userAccount') || '{}');

        // Match backend schema
        const payload = {
          business_stage: savedData.business_stage || 'idea',
          business_name: savedData.business_name || 'My Business',
          description: savedData.description || 'N/A',
          industry: savedData.industry || 'retail'
        };

        // Sync to backend
        await api.post(ENDPOINTS.BUSINESS_PROFILE, payload);
        console.log("Business profile synced to backend.");
      } catch (error) {
        console.error("Failed to sync onboarding data:", error);
      }
    };

    syncOnboardingData();

    const timer = setTimeout(() => {
      navigate("/your-plan");
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center text-center py-12 min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-gray-100 border-t-primary rounded-full animate-spin mb-6" />
        <h2 className="text-xl font-semibold mb-2">Creating your Business Plan</h2>
        <p className="text-gray-500 max-w-sm px-6">
          BizStart AI is analyzing your information and generating
          professional content for each section.
        </p>
      </div>
    </PageWrapper>
  );
}