import { useState } from 'react';
import CookieConsentModal from './Modal/CookieConsentModal';

const ConsentRevisionContent = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-[50px] bg-[#4e4b66] text-white text-[12px] leading-[16px] px-[8px] py-[4px] rounded-[4px] opacity-0 invisible peer-hover:opacity-100 peer-hover:visible transition-all duration-200 whitespace-nowrap before:absolute before:content-[''] before:top-1/2 before:-translate-y-1/2 before:-left-[10px] before:border-[6px] before:border-transparent before:border-r-[#4e4b66]">
      Consent Preferences
    </div>
  );
}

const ConsentRevisitButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed left-[15px] bottom-[15px] z-[1000]">
      <button 
        onClick={handleOpenModal}
        className="peer bg-[#0056a7] flex items-center justify-center w-[45px] h-[45px] rounded-full cursor-pointer"
      >
        <img
          src="https://cdn-cookieyes.com/assets/images/revisit.svg"
          alt="Revisit consent button"
          className="w-[30px] h-[30px]"
        />
      </button>
      <ConsentRevisionContent />
      <CookieConsentModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ConsentRevisitButton;
