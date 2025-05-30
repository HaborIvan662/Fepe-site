import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';

export default function AboutSection() {
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  return (
    <section id="about" className="py-10 relative pt-0 sm:pt-[150px] lg:pt-[200px]">
      <div className="container mx-auto px-4">
        {/* Desktop image */}
        <img
          src="/assets/images/webp/how-to-buy-man.webp"
          alt="man"
          loading="lazy"
          className="hidden lg:block w-[22%] 2xl:w-[24%] absolute top-0 2xl:top-[30px] left-0 z-[0]"
        />

        {/* Section Title */}
        <div className="flex items-center justify-center relative mb-6">
          <img
            src="/assets/images/instagram1.png"
            alt="Instagram Left"
            className="absolute left-[20px] sm:left-[19%] w-[20%] translate-Y-[-63%] rotate-0 top-[0] sm:top-[-100px]  md:top-[-120px] lg:top-[-200px] z-0"
          />
          <h2 className="text-5xl font-bold mb-0 drop-shadow z-10">{t.about}</h2>
          <img
            src="/assets/images/instagram2.png"
            alt="Instagram Right"
            className="absolute top-0 sm:top-[-100px]  md:top-[-120px] lg:top-[-200px] right-[20px] sm:right-[20%] w-[20%] translate-Y-[-64%] rotate-0 z-0"
          />
        </div>

        {/* About Text */}
        <div className="bg-white shadow rounded-[32px] border-[3px] border-black px-6 py-8 text-custom-brown max-w-[1086px] mx-auto z-[1] relative text-[23px] font-Baloo2 text-center font-medium leading-normal">
          <p className="mb-0">
            &nbsp; &nbsp; &nbsp; &nbsp;{t.aboutText}
          </p>
        </div>

        {/* Mobile image */}
        <img
          src="/assets/images/deepseek-mob.png"
          alt="deepseek-man"
          loading="lazy"
          className="block lg:hidden relative sm:absolute  bottom-[50px] sm:bottom-[80px] left-0 max-w-[413px]"
        />
      </div>
    </section>
  );
}
