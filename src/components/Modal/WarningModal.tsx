import { useState, useEffect } from 'react';

const WarningModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="warning-title"
    >
      <div className="relative bg-white/80 shadow-2xl backdrop-blur-[8px] rounded-2xl p-4 sm:p-6 md:p-8 w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] 2xl:w-[45%] mx-auto z-50 text-center slide-top border border-white/20">
        {/* Close Button */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <button
            onClick={handleClose}
            className="cursor-pointer hover:opacity-80 transition-all duration-300 p-1 hover:scale-110"
            aria-label="Close warning modal"
          >
            <div className="w-[20px] h-[20px] sm:w-[25px] sm:h-[24px]">
              <svg 
                viewBox="0 0 42 42" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="1" y="1" width="40" height="40" rx="20" fill="white" />
                <rect x="1" y="1" width="40" height="40" rx="20" stroke="black" strokeWidth="2" />
                <path d="M27.8878 29L13.5444 13.2659" stroke="black" strokeWidth="2.94737" strokeLinecap="square" />
                <path d="M13.2504 28.7344L28.4975 13.8744" stroke="black" strokeWidth="2.94737" strokeLinecap="square" />
              </svg>
            </div>
          </button>
        </div>

        {/* Main Content */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <div 
            id="warning-title"
            className="font-semibold text-custom-red uppercase text-stroke-5 paint-order-stroke text-stroke-black"
          >
            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] text-[50px] sm:text-[80px] md:text-[100px] lg:text-[120px] leading-none drop-shadow bg-clip-text">
                300%
              </span>
              <span className="text-[18px] sm:text-[24px] md:text-[30px] lg:text-[36px] max-w-[90%] sm:max-w-[80%] md:max-w-[70%] leading-none text-custom-red/90">
                guaranteed ROI on pre-sale!
              </span>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 md:mt-12 font-black text-custom-yellow paint-order-stroke text-stroke text-stroke-black">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <span className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] text-custom-yellow/90 leading-none">
                Be careful about
              </span>
              <span className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[100px] font-black text-black drop-shadow-[0_4px_4px_rgba(255,255,255,0.8)] [text-shadow:_2px_2px_0_rgb(255_255_255)]">
                scams
              </span>
            </div>
          </div>
        </div>

        {/* URL Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <span className="text-[16px] sm:text-[20px] md:text-[24px] text-custom-red/80">
            The official URL is
          </span>
          <span className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-semibold">
            www.pepefantasy.net
          </span>
        </div>
      </div>
    </div>
  );
};

export default WarningModal; 