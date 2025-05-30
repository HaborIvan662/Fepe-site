import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';
import { Link } from 'react-router-dom';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      // Wait for animation to complete before hiding
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className="fixed inset-x-0 z-[10000] top-[56px] bottom-0 right-0 flex justify-end p-0 bg-[#000000bf] lg:hidden"
    >
      <div
        className={`bg-[#c2ffff] h-full flex flex-col w-full p-5 relative overflow-y-auto overflow-x-hidden top-[2px] text-center ${isOpen ? 'slide-left' : 'slide-right'
          }`}
      >
        {/* Menu Items */}
        <nav className="px-6">
          <ul className="space-y-6 text-2xl">
            <li>
              <Link to="/en/staking" onClick={onClose} className="block py-1 text-black text-[22px] font-semibold mb-5 cursor-auto border-b-[1px] border-[rgba(0, 0, 0, .13)]">{t.menuStaking}</Link>
            </li>
            <li>
              <Link to="/en#about" onClick={onClose} className="block py-1 text-black text-[22px] font-semibold mb-5 cursor-auto border-b-[1px] border-[rgba(0, 0, 0, .13)]">{t.menuAbout}</Link>
            </li>
            <li>
              <Link to="/en#media" onClick={onClose} className="block py-1 text-black text-[22px] font-semibold mb-5 cursor-auto border-b-[1px] border-[rgba(0, 0, 0, .13)]">{t.menuMedia}</Link>
            </li>
            <li>
              <Link to="/en#tokenomics" onClick={onClose} className="block py-1 text-black text-[22px] font-semibold mb-5 cursor-auto border-b-[1px] border-[rgba(0, 0, 0, .13)]">{t.menuTokenomics}</Link>
            </li>
            <li>
              <Link to="/en#roadmap" onClick={onClose} className="block py-1 text-black text-[22px] font-semibold mb-5 cursor-auto border-b-[1px] border-[rgba(0, 0, 0, .13)]">{t.menuRoadmap}</Link>
            </li>
            <li>
              <Link to="/en#how-to-buy" onClick={onClose} className="block py-1 text-black text-[22px] font-semibold mb-5 cursor-auto border-b-[1px] border-[rgba(0, 0, 0, .13)]">{t.menuHowToBuy}</Link>
            </li>
            <li>
              <Link to="/en#faq" onClick={onClose} className="block py-1 text-black text-[22px] font-semibold mb-5 cursor-auto border-b-[1px] border-[rgba(0, 0, 0, .13)]">{t.menuFaqs}</Link>
            </li>
          </ul>
        </nav>

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          <a href="https://t.me/fantasy_pepe_official" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/svg-icons/telegram.svg" alt="telegram" className="w-9 h-9" />
          </a>
          <a href="https://www.instagram.com/fantasypepe/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/svg-icons/instagram.svg" alt="instagram" className="w-9 h-9" />
          </a>
          <a href="https://x.com/fantasy_pepe" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/svg-icons/twitter.svg" alt="twitter" className="w-9 h-9" />
          </a>
        </div>
        <div className="mt-4 mx-auto bg-custom-red text-white py-[10px] px-8px font-normal border-[3px] border-black rounded-[16px] w-full">{t.menuBuyFEPE}</div>
      </div>
    </div>
  );
};

export default MenuOverlay;
