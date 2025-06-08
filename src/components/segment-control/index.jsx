import React from "react";

export default function SegmentControl({ activeTab, setActiveTab }) {
  const tabs = ["all", "small", "medium", "large"];

  return (
    <div className="inline-flex rounded-full bg-[#252629] p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-5 py-2 text-sm rounded-full transition-colors ${
            activeTab === tab
              ? "bg-[#F68B1E] text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}
