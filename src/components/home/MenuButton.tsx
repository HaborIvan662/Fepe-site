import { useState } from 'react';

interface MenuButtonProps {
  onToggle: (isOpen: boolean) => void;
}

const MenuButton = ({ onToggle }: MenuButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onToggle(newState);
  };

  return (
    <div className="cursor-pointer lg:hidden" onClick={toggleMenu}>
      {isMenuOpen ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[25px] h-[25px]"
          aria-hidden="true"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="#3F2E20"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="20"
          viewBox="0 0 24 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[25px] h-[19px]"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 2.25985C24 3.08828 23.3284 3.75985 22.5 3.75985L1.5 3.75985C0.671573 3.75985 0 3.08828 0 2.25985C0 1.43142 0.671573 0.759848 1.5 0.759848H22.5C23.3284 0.759848 24 1.43142 24 2.25985ZM24 10.2598C24 11.0883 23.3284 11.7598 22.5 11.7598L1.5 11.7599C0.671573 11.7599 0 11.0883 0 10.2599C0 9.43142 0.671573 8.75985 1.5 8.75985L22.5 8.75985C23.3284 8.75985 24 9.43142 24 10.2598ZM22.5 19.7598C23.3284 19.7598 24 19.0883 24 18.2598C24 17.4314 23.3284 16.7598 22.5 16.7598L1.5 16.7598C0.671573 16.7598 0 17.4314 0 18.2598C0 19.0883 0.671573 19.7599 1.5 19.7599L22.5 19.7598Z"
            fill="#3F2E20"
          />
        </svg>
      )}
    </div>
  );
};

export default MenuButton;
