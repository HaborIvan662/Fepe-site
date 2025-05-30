import React, { useState, useEffect } from 'react';

interface ClaimNotLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClaimNotLiveModal: React.FC<ClaimNotLiveModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match this with your CSS animation duration
  };

  if (!isOpen && !isClosing) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full z-[9999] flex items-center justify-center backdrop-blur-[15px] bg-black/40"
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-[10px] w-[411px] text-black shadow-xl p-6 ${isClosing ? 'fade-top-out' : 'fade-top'}`}>
        <div className="flex flex-col items-center gap-3">
          <img
            src="/assets/images/svg-icons/info.svg"
            alt="info"
            className="w-[90px] h-[90px]"
          />
          <span className="text-[16px] text-center">Claim is not live yet</span>
          <div className="flex gap-3 w-full mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="bg-custom-red text-white px-4 py-2 rounded-[16px] border-[3px] border-black hover:bg-custom-green hover:text-black transition-colors duration-300 w-[140px] mx-auto"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimNotLiveModal;
