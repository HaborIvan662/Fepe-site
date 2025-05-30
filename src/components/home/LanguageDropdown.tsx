import { useEffect, useRef } from 'react';

const languages = [
  { code: 'ar', name: 'عربي' },
  { code: 'bg', name: 'български' },
  { code: 'en', name: 'English', active: true },
  { code: 'cn', name: '中文（简体）' },
  { code: 'zh-hant', name: '中文（繁體）' },
  { code: 'cz', name: 'čeština' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'el', name: 'ελληνικά' },
  { code: 'hu', name: 'magyar' },
  { code: 'id', name: 'Indonesia' },
  { code: 'it', name: 'Italiano' },
  { code: 'jp', name: '日本語' },
  { code: 'kr', name: '한국인' },
  { code: 'pl', name: 'Polski' },
  { code: 'pt', name: 'Português' },
  { code: 'ro', name: 'română' },
  { code: 'ru', name: 'Русский' },
  { code: 'sk', name: 'slovenský' },
  { code: 'es', name: 'Español' },
  { code: 'th', name: 'แบบไทย' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'uk', name: 'Українська' },
  { code: 'vn', name: 'Tiếng Việt' },
];

interface LanguageDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageSelect: (name: string, code: string) => void;
}

export default function LanguageDropdown({ isOpen, onClose, onLanguageSelect }: LanguageDropdownProps) {
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ul
      ref={dropdownRef}
      role="menu"
      className="absolute z-50 p-0 w-[220px] mt-[10px] border-[3px] border-black rounded-[13px] overflow-y-auto backdrop-blur-[100px] 2xl:max-w-[155px] text-[12px] right-[-40px] bg-[#c5ff68] text-black"
    >
      <div className="flex flex-col max-h-[170px] overflow-y-auto m-2 ">
        {languages.map(({ code, name, active }) => (
          <li
            key={code}
            role="menuitem"
            className={`flex items-center p-2 cursor-pointer ${
              active ? 'font-semibold rounded-[12px]' : ''
            }`}
            onClick={() => {
              onLanguageSelect(name, code);
              onClose();
            }}
          >
            <img
              alt={name}
              src={`/assets/images/svg-icons/${code}.svg`}
              loading="lazy"
              className="rounded-[50%] border-[2px] border-white mr-[5px] h-5 w-5 overflow-hidden object-cover"
            />
            <span className="uppercase text-sm">{name}</span>
          </li>
        ))}
      </div>
    </ul>
  );
}
