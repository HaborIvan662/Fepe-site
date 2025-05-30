import { memo } from 'react';

interface RetryTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
}

const RetryTransactionModal = memo(({ isOpen, onClose, onRetry }: RetryTransactionModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-[15px] bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="p-4 sm:p-6 bg-white/90 backdrop-blur-[12px] rounded-[16px] shadow-lg w-[90%] max-w-[361px] mx-auto relative fade-top">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div className="w-[14px]" aria-hidden="true" /> {/* Spacer for alignment */}
          <h4 
            id="modal-title"
            className="text-center font-semibold text-base sm:text-lg text-black m-0"
          >
            Transaction Pending
          </h4>
          <button
            onClick={onClose}
            className="cursor-pointer hover:opacity-80 transition-opacity p-1"
            aria-label="Close modal"
          >
            <div className="w-[14px] h-[14px]">
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

        {/* Content */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-base sm:text-lg mb-3 sm:mb-4">
            Your transaction is taking longer than expected.
          </p>
          <p className="text-sm sm:text-base mb-4 sm:mb-6">
            Would you like to try again?
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="w-full py-2.5 sm:py-3 px-4 border-2 border-black rounded-[16px] hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={onRetry}
            className="w-full py-2.5 sm:py-3 px-4 bg-custom-red text-white border-2 border-black rounded-[16px] hover:bg-opacity-90 transition-colors text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
});

RetryTransactionModal.displayName = 'RetryTransactionModal';

export default RetryTransactionModal; 