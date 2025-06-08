import React from "react";

export function SkipCard({ skip, isSelected, onSelect }) {
  const totalPrice = skip.price_before_vat + skip.vat;
  const sizeCategory =
    skip.size < 9 ? "Small" : skip.size < 15 ? "Medium" : "Large";

  return (
    <div
      className={`group relative bg-[#252629] rounded-2xl overflow-hidden transition-all duration-300 ${
        isSelected ? 'ring-2 ring-orange-500/30' : 'hover:ring-1 hover:ring-orange-500/20'
      }`}
      onClick={onSelect}
    >
      <div className="relative h-32 bg-gradient-to-br from-[#1B1C1E] to-[#2f2f31] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-orange-500/20 flex items-center justify-center">
              <span className="text-4xl font-bold text-orange-500 flex items-center">
                {skip.size}<span className="text-xl ml-1 text-orange-500/70">yard</span>
              </span>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-500/10 text-white px-3 py-1 rounded-full text-xs font-medium">
              {sizeCategory}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#252629] to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Features */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-300">
            <div className="w-8 h-8 rounded-full bg-[#1B1C1E] flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-orange-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>{skip.hire_period_days} days hire</span>
          </div>
          
          {skip.allows_heavy_waste && (
            <div className="flex items-center text-gray-300">
              <div className="w-8 h-8 rounded-full bg-[#1B1C1E] flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-orange-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Heavy waste allowed</span>
            </div>
          )}
          
          {skip.allowed_on_road && (
            <div className="flex items-center text-gray-300">
              <div className="w-8 h-8 rounded-full bg-[#1B1C1E] flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-orange-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Can be placed on road</span>
            </div>
          )}

          {!skip.allowed_on_road && (
            <div className="flex items-center text-orange-500/70">
              <div className="w-8 h-8 rounded-full bg-orange-500/5 flex items-center justify-center mr-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span>Not allowed on road</span>
            </div>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-orange-500">£{totalPrice}</p>
            <p className="text-sm text-gray-400">incl VAT</p>
          </div>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isSelected
                ? "bg-orange-500/20 text-orange-500"
                : "bg-[#1B1C1E] text-gray-300 hover:bg-orange-500/10 hover:text-orange-500"
            }`}
          >
            {isSelected ? "Selected" : "Select"}
          </button>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
