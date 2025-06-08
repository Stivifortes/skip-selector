import React from "react";

export default function StepperHeader({ currentStep, totalSteps }) {
  return (
    <header className="bg-[#141518] px-4 sm:px-8 py-4 flex items-center justify-between border-b border-gray-700">
      <span className="text-white text-xl font-bold">{`</>`}</span>
      <div className="text-sm text-gray-400">
        Step {currentStep} of {totalSteps}
      </div>
    </header>
  );
}
