import React, { memo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';

interface CookieConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CookieCategoryProps {
  id: string;
  title: string;
  description: string;
  alwaysActive?: boolean;
}

const CookieCategory = memo(({ id, title, description, alwaysActive = false }: CookieCategoryProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  return (
    <div className="mb-[10px]" id={id}>
      <div className="flex mt-[10px]">
        <div className="mr-[25px]">
          <div
            className={`w-0 h-0 mt-[5px] border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-[#212121] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
          />
        </div>
        <div className="w-full cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex justify-between items-center">
            <button className='text-[16px] font-bold'>
              {title}
            </button>
            {alwaysActive && <span className="cky-always-active">{t.cookieConsentAlwaysActive}</span>}
          </div>
          <div className='mt-[10px] mb-[16px]'>
            <p>{description}</p>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="block px-[22px] mb-[16px]">
          <div className='border-[#ebebeb] bg-[#f4f4f4]'>
            <p className="text-[12px] m-0 p-[10px] break-words">No cookies to display.</p>
          </div>
        </div>
      )}
    </div>
  );
});

CookieCategory.displayName = 'CookieCategory';

const ActionButton = memo(({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className='text-white border-[#1863dc] bg-[#1863dc] flex-auto max-w-full m-0 break-words px-[27px] py-2 font-medium mr-2 text-center'
  >
    {children}
  </button>
));

ActionButton.displayName = 'ActionButton';

const CookieConsentModal = memo(({ isOpen, onClose }: CookieConsentModalProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  if (!isOpen) return null;

  const cookieCategories = [
    {
      id: "ckyDetailCategorynecessary",
      title: t.cookieConsentNecessary,
      description: t.cookieConsentNecessaryDesc,
      alwaysActive: true
    },
    {
      id: "ckyDetailCategoryfunctional",
      title: t.cookieConsentFunctional,
      description: t.cookieConsentFunctionalDesc
    },
    {
      id: "ckyDetailCategoryanalytics",
      title: t.cookieConsentAnalytics,
      description: t.cookieConsentAnalyticsDesc
    },
    {
      id: "ckyDetailCategoryperformance",
      title: t.cookieConsentPerformance,
      description: t.cookieConsentPerformanceDesc
    },
    {
      id: "ckyDetailCategoryadvertisement",
      title: t.cookieConsentAdvertisement,
      description: t.cookieConsentAdvertisementDesc
    }
  ];

  return (
    <div className="bg-black bg-opacity-40 fixed top-0 left-0 w-full h-full z-[9999]">
      <div className="text-[#212121] border-[#F4F4F4] bg-white max-h-[79vh] max-w-[845px] overflow-hidden flex flex-col rounded-[6px] text-[14px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 slide-bottom shadow-[0_32px_68px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between px-[24px] py-[22px] border-b">
          <span className="text-[18px] font-bold leading-[24px] break-words">
            {t.cookieConsentTitle}
          </span>
          <button onClick={onClose}>
            <img src="https://cdn-cookieyes.com/assets/images/close.svg" alt="Close" />
          </button>
        </div>

        <div className="px-[24px] flex-1 overflow-auto">
          <div className="text-[14px] leading-[24px] font-normal py-[12px]">
            <p>
              {t.cookieConsentDescription}
            </p>
            <p>
              {t.cookieConsentNecessaryDesc} ...&nbsp;
              {!isExpanded && (
                <button
                  className="text-[#1863dc] whitespace-nowrap"
                  onClick={() => setIsExpanded(true)}
                >
                  {t.cookieConsentShowMore}
                </button>
              )}
            </p>
            {isExpanded && (
              <>
                <p>{t.cookieConsentFunctionalDesc}</p>
                <p>{t.cookieConsentAnalyticsDesc}</p>
                <button
                  className="text-[#1863dc]"
                  onClick={() => setIsExpanded(false)}
                >
                  {t.cookieConsentShowLess}
                </button>
              </>
            )}
          </div>

          <div className="border-b" />

          <div className="cky-accordion-wrapper" data-cky-tag="detail-categories">
            {cookieCategories.map(category => (
              <CookieCategory key={category.id} {...category} />
            ))}
          </div>
        </div>

        <div className="relative">
          <span className="block w-full h-[40px] absolute bottom-[calc(100%-1px)] bg-gradient-to-b from-white/0 to-white"></span>
          <div className='flex flex-wrap items-center justify-center px-[24px] py-[22px] border-t gap-2'>
            <ActionButton onClick={onClose}>{t.cookieConsentRejectAll}</ActionButton>
            <ActionButton onClick={onClose}>{t.cookieConsentSavePreferences}</ActionButton>
            <ActionButton onClick={onClose}>{t.cookieConsentAcceptAll}</ActionButton>
          </div>

          <div className="px-6 py-2 text-[12px] font-normal leading-5 text-right rounded-b-[6px] rounded-l-[6px] flex justify-end items-center bg-[#EDEDED]">
            {t.cookieConsentPoweredBy}
            <a
              target="_blank"
              rel="noopener"
              href="https://www.cookieyes.com/product/cookie-consent/"
              className='ml-[5px] leading-0'
            >
              <img
                src="https://cdn-cookieyes.com/assets/images/poweredbtcky.svg"
                alt="Cookieyes logo"
                className='w-[78px] h-[13px] m-0'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

CookieConsentModal.displayName = 'CookieConsentModal';

export default CookieConsentModal;
