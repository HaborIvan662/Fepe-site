import React, { memo, useRef, useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';

interface BuyBNBModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTokenSwitch: () => void;
}

const BuyBNBModal = memo(({ isOpen, onClose, onTokenSwitch }: BuyBNBModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match this with animation duration
  };

  const handleBuyWithBSC = () => {
    onTokenSwitch();
    handleClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[9999] flex items-center justify-center backdrop-blur-[15px] bg-black/40">
      <div
        ref={modalRef}
        className={`p-6 bg-white/90 backdrop-blur-[12px] rounded-[16px] shadow-lg w-[400px] mx-auto relative text-[20px] text-black text-center flex flex-col gap-4 justify-center fade-top ${isClosing ? 'fade-top-out' : 'fade-top'}`}
      >
        <img
          src="/assets/images/svg-icons/info.svg"
          alt="info"
          className="w-[90px] h-[90px] mx-auto"
        />
        <span className="font-medium">
          {t.areYouSure}
        </span>
        <span className="text-[18px]">
          {t.bnbWarning}
        </span>
        <div className="flex justify-center">
          <button
            onClick={handleBuyWithBSC}
            className="min-w-[140px] py-[8px] border-[3px] border-black rounded-[16px] text-center text-[15px] bg-custom-red text-white hover:bg-custom-green hover:text-black transition-colors duration-300"
          >
            {t.buyWithBNB}
          </button>
        </div>
      </div>
    </div>
  );
});

BuyBNBModal.displayName = 'BuyBNBModal';

export default BuyBNBModal;
