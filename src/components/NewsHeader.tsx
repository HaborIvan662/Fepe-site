import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/languages';
import type { Language } from '../translations/languages';

const NewsHeader = () => {
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  return (
    <div className="fixed flex flex-nowrap whitespace-nowrap left-0 top-[67px] max-[576px]:top-[61px] lg:top-0 lg:py-2 z-[50] bg-custom-red overflow-x-hidden border-t-[3px] border-b-[3px] border-custom-brown">
      <div className="flex marquee">
        <h5 className="mb-0 text-lg sm:text-xl uppercase tracking-[4px] font-medium text-custom-cream">
          {t.newsHeader}
        </h5>
        <span className="mx-1"></span>
        <h5 className="mb-0 text-lg sm:text-xl uppercase tracking-[4px] font-medium text-custom-cream">
          {t.newsHeader}
        </h5>
        <span className="mx-1"></span>
      </div>
    </div>
  );
};

export default NewsHeader;