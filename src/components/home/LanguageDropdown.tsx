import { useEffect, useRef } from 'react';
import type { Language } from '../../translations/languages';

const languages = [
  { code: 'ar' as Language, name: 'عربي' },
  { code: 'bg' as Language, name: 'български' },
  { code: 'en' as Language, name: 'English', active: true },
  { code: 'cn' as Language, name: '中文（简体）' },
  { code: 'zh-hant' as Language, name: '中文（繁體）' },
  { code: 'cz' as Language, name: 'čeština' },
  { code: 'nl' as Language, name: 'Nederlands' },
  { code: 'fr' as Language, name: 'Français' },
  { code: 'de' as Language, name: 'Deutsch' },
  { code: 'gr' as Language, name: 'ελληνικά' },
  { code: 'hu' as Language, name: 'magyar' },
  { code: 'id' as Language, name: 'Indonesia' },
  { code: 'it' as Language, name: 'Italiano' },
  { code: 'jp' as Language, name: '日本語' },
  { code: 'kr' as Language, name: '한국인' },
  { code: 'pl' as Language, name: 'Polski' },
  { code: 'pt' as Language, name: 'Português' },
  { code: 'ro' as Language, name: 'română' },
  { code: 'ru' as Language, name: 'Русский' },
  { code: 'sk' as Language, name: 'slovenský' },
  { code: 'es' as Language, name: 'Español' },
  { code: 'th' as Language, name: 'แบบไทย' },
  { code: 'tr' as Language, name: 'Türkçe' },
  { code: 'uk' as Language, name: 'Українська' },
  { code: 'vn' as Language, name: 'Tiếng Việt' },
];

interface LanguageDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageSelect: (name: string, code: Language) => void;
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
