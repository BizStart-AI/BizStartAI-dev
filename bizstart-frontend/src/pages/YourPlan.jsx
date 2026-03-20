import React from "react";
import PageWrapper from "../components/PageWrapper";

export default function PlanReady() {
  return (
    <PageWrapper>

      <div className="bg-primary text-white p-6 rounded-xl text-center mb-6">
        <div className="text-2xl mb-2">✅</div>
        <h2 className="font-semibold text-lg">
          Plan Generated!
        </h2>
        <p className="text-sm opacity-90 mt-2">
          Your AI-powered business plan is ready.
        </p>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          className="flex-1 py-3 rounded-xl text-white bg-primary"
        >
          Preview PDF
        </button>

        <button className="flex-1 py-3 rounded-xl border">
          Download PDF
        </button>
      </div>

    </PageWrapper>
  );
}