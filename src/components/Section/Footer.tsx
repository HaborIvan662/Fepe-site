import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';

const Footer = () => {
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  return (
    <section id="footer" className="pt-[40px] pb-[150px] relative">
      <div className="max-w-[1430px] mx-auto flex flex-col items-center px-4 text-center">
        {/* Logo */}
        <a
          href="/en/home"
          className="text-secondary text-base lg:text-xl uppercase mb-4"
        >
          <img
            src="/assets/images/svg-icons/footer-logo.svg"
            alt="logo"
            loading="lazy"
            className="h-[216px] w-[426px]"
          />
        </a>

        {/* Large screen ball gif */}
        <img
          src="/assets/images/gif/footer-ball.gif"
          alt="ball"
          loading="lazy"
          className="hidden md:block w-[113px] h-[113px] mx-auto"
        />

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-[16px] my-4">
          <a
            href="https://t.me/fantasy_pepe_official"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/images/svg-icons/telegram-footer.svg"
              alt="Telegram"
              className="w-9 h-9"
            />
          </a>
          <a
            href="https://www.instagram.com/fantasypepe/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/images/svg-icons/instagram-footer.svg"
              alt="Instagram"
              className="w-9 h-9"
            />
          </a>
          <a
            href="https://x.com/fantasy_pepe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/images/svg-icons/twitter-footer.svg"
              alt="Twitter"
              className="w-9 h-9"
            />
          </a>
        </div>

        {/* Mobile ball gif */}
        <img
          src="/assets/images/gif/footer-ball.gif"
          alt="ball"
          loading="lazy"
          className="block md:hidden h-16 mb-2"
        />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-center mt-2 text-black font-Baloo2 text-[16px]">
          <p className="mb-0">{t.copyright}</p>
        </div>

        {/* Privacy Link */}
        <div className="mt-2 mb-4">
          <a
            href="/assets/documents/privacy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-black font-Baloo2 text-[16px]"
          >
            {t.privacyPolicy}
          </a>
        </div>

        {/* Disclaimer */}
        <div className="text-center font-Baloo2 text-[16px] text-white mb-[100px]">
          <p className="px-0 mx-0 sm:px-[3rem] sm:mx-[3rem]">
            {t.disclaimerPart1}
          </p>
          <p className="mb-0 sm:mb-[16px]">
            {t.disclaimerPart2}
          </p>
        </div>

        {/* Background Images */}
        <img
          src="/assets/images/footer-green.png"
          alt="footer background"
          loading="lazy"
          className="hidden md:block w-full mt-8 absolute bottom-0"
        />
        <img
          src="/assets/images/footer-mob.png"
          alt="footer background mobile"
          loading="lazy"
          className="block md:hidden w-full mt-8 absolute bottom-0 sm:bottom-[-120px]"
        />
      </div>
    </section>
  );
};

export default Footer;
