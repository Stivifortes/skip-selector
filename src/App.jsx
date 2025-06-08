import React, { useEffect, useState } from "react";
import StepperHeader from "./components/stepper-header";
import SegmentControl from "./components/segment-control";
import { SkipCard } from "./components/skip-card";

export default function App() {
  const [skips, setSkips] = useState([]);
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const fetchSkips = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSkips(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching skips:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkips();
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchSkips();
  };

  const filteredSkips = activeTab === "all"
    ? skips
    : skips.filter((skip) => {
        if (activeTab === "small") return skip.size < 9;
        if (activeTab === "medium") return skip.size >= 9 && skip.size < 15;
        if (activeTab === "large") return skip.size >= 15;
        return true;
      });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1B1C1E] text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading skip options...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1B1C1E] text-white">
        <div className="text-center p-6">
          <div className="w-12 h-12 mx-auto mb-4 text-orange-500">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Error Loading Skips</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            aria-label="Retry loading skips"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const selectedSkip = skips.find(s => s.id === selected);

  return (
    <div className="min-h-screen bg-[#1B1C1E] text-white">
      <StepperHeader currentStep={2} totalSteps={4} />
      
      <main className="relative flex-1 px-4 sm:px-8 py-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Choose Your Skip
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select the perfect skip size for your project. All prices include VAT and delivery to your location.
          </p>
        </div>

        {/* Size Categories */}
        <div className="mb-8">
          <SegmentControl activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content Area */}
        <div className="relative">
          {/* Skip Cards Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${
            selected ? 'md:grid-cols-2' : ''
          }`}>
            {filteredSkips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selected === skip.id}
                onSelect={() => {
                  setSelected(skip.id);
                  setShowDetails(true);
                }}
              />
            ))}
          </div>

          {/* Selected Skip Details Panel */}
          {selected && (
            <>
              {/* Overlay */}
              <div 
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
                  showDetails ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => {
                  setShowDetails(false);
                  setSelected(null);
                }}
                role="presentation"
              />
              
              {/* Panel */}
              <div 
                className={`fixed md:inset-y-0 md:right-0 bottom-0 w-full md:w-[400px] bg-[#252629] transform transition-transform duration-500 ease-in-out max-h-[90vh] md:max-h-none ${
                  showDetails ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-y-0 md:translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Selected Skip Details"
              >
                <div className="h-full flex flex-col">
                  {/* Panel Header */}
                  <div className="px-6 py-3 md:p-6 border-b border-[#2f2f31] sticky top-0 bg-[#252629] z-10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg md:text-xl font-semibold">Selected Skip</h2>
                      <button 
                        onClick={() => {
                          setShowDetails(false);
                          setSelected(null);
                        }}
                        className="text-gray-400 hover:text-white"
                        aria-label="Close panel"
                      >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Panel Content */}
                  <div className="flex-1 overflow-y-auto px-6 py-3 md:p-6 pb-44 md:pb-6">
                    <div className="space-y-2.5">
                      {/* Skip Size */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">{selectedSkip.size} Yard Skip</h3>
                        <p className="text-sm md:text-base text-gray-400">Perfect for {selectedSkip.size < 9 ? 'small' : selectedSkip.size < 15 ? 'medium' : 'large'} projects</p>
                      </div>

                      {/* Features */}
                      <div className="space-y-1.5">
                        <h4 className="text-base md:text-lg font-medium text-white">Features</h4>
                        <div className="space-y-1">
                          <div className="flex items-center text-gray-300">
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#1B1C1E] flex items-center justify-center mr-2 md:mr-3">
                              <svg className="w-3 h-3 md:w-4 md:h-4 text-orange-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <span className="text-sm md:text-base">{selectedSkip.hire_period_days} days hire</span>
                          </div>
                          
                          {selectedSkip.allows_heavy_waste && (
                            <div className="flex items-center text-gray-300">
                              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#1B1C1E] flex items-center justify-center mr-2 md:mr-3">
                                <svg className="w-3 h-3 md:w-4 md:h-4 text-orange-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-sm md:text-base">Heavy waste allowed</span>
                            </div>
                          )}
                          
                          {selectedSkip.allowed_on_road && (
                            <div className="flex items-center text-gray-300">
                              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#1B1C1E] flex items-center justify-center mr-2 md:mr-3">
                                <svg className="w-3 h-3 md:w-4 md:h-4 text-orange-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-sm md:text-base">Can be placed on road</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mt-2">
                        <h4 className="text-base md:text-lg font-medium text-white mb-1">Total Price</h4>
                        <p className="text-2xl md:text-3xl font-bold text-white">£{selectedSkip.price_before_vat + selectedSkip.vat}</p>
                      </div>
                    </div>
                  </div>

                  {/* Panel Footer */}
                  <div className="px-6 py-3 md:p-6 border-t border-[#2f2f31] sticky bottom-0 bg-[#252629] z-10">
                    <button
                      className="w-full bg-orange-500 text-white py-2 md:py-4 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:bg-orange-600 transition-colors duration-200"
                      aria-label="Continue to checkout"
                    >
                      Continue to Checkout
                    </button>
                    <p className="text-[10px] md:text-xs text-gray-500 text-center mt-1.5 md:mt-4">
                      Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
