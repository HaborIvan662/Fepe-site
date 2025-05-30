import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';

export default function KeyFeatures() {
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  return (
    <section id="key-features" className="relative pt-[40px]">
      <div className="container mx-auto px-4">
        <img
          src="/assets/images/webp/deepseek-man.webp"
          alt="man"
          loading="lazy"
          className="hidden lg:block absolute w-[500px] right-0 top-[-50px]"
        />

        <h2 className="text-[56px] font-bold text-center mb-8 drop-shadow">{t.keyFeaturesTitle}</h2>

        <img
          src="/assets/images/mob-phone.png"
          alt="mob-phone"
          className="block lg:hidden mx-auto mb-[-120px] relative max-w-[60%]"
        />

        <div className="rounded-[32px] border-[3px] border-black bg-white py-[32px] px-[24px] max-w-[1086px] mx-auto my-0 text-custom-brown leading-snug relative">
          <p className="text-center text-[24px] uppercase font-normal mb-[16px]">{t.keyFeaturesTagline}</p>
          <p className="text-center font-semibold font-Baloo2 text-[23px]">{t.keyFeaturesSlogan}</p>
          <p className="text-center  mb-[16px]  font-semibold font-Baloo2 text-[23px]">
            {t.keyFeaturesIntro}
          </p>
          <p className="text-center font-semibold font-Baloo2 text-[23px]">{t.keyFeaturesMemeTitle}</p>
          <p className="text-center  mb-[16px]  font-semibold font-Baloo2 text-[23px]">{t.keyFeaturesMemeDesc}</p>
          <p className="text-center font-semibold font-Baloo2 text-[23px]">{t.keyFeaturesLeagueTitle}</p>
          <p className="text-center  mb-[16px]  font-semibold font-Baloo2 text-[23px]">{t.keyFeaturesLeagueDesc}</p>
          <p className="text-center font-semibold font-Baloo2 text-[23px] ">{t.keyFeaturesPredictTitle}</p>
          <p className="text-center  mb-[16px]  font-semibold font-Baloo2 text-[23px]">{t.keyFeaturesPredictDesc}</p>
          <p className="text-center font-semibold font-Baloo2 text-[23px]">{t.keyFeaturesRadioTitle}</p>
          <p className="text-center mb-0 font-semibold font-Baloo2 text-[23px]">{t.keyFeaturesRadioDesc}</p>

          <img
            src="/assets/images/svg-icons/timer-clock.svg"
            alt="timer-clock"
            loading="lazy"
            className="hidden lg:block absolute z-[1] left-[190px] bottom-[-103px] max-w-[177px]"
          />
          <img
            src="/assets/images/shoes-top.png"
            alt="shoes-top"
            loading="lazy"
            className="hidden lg:block absolute z-[1] right-[123px] bottom-[-85px] max-w-[205px]"
          />
          <img
            src="/assets/images/phone1.png"
            alt="phone"
            className="hidden lg:block absolute z-[1] left-[-50px] top-[247px] w-[15%]"
          />
          <img
            src="/assets/images/phone2.png"
            alt="phone"
            className="hidden lg:block absolute z-[1] right-[-50px] top-[247px] w-[15%]"
          />
        </div>

        <div className="block lg:hidden mt-4 translate-y-[-50px] md:translate-y-0">
          <img
            src="/assets/images/gif/key-feature.gif"
            alt="key-features-gif"
            className="max-w-[382px] block mt-[15px] mb-[-7px] mx-auto"
          />
        </div>

        <div className="container mt-[48px] mx-auto relative translate-y-[-120px] md:translate-y-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start w-full lg:w-fit mx-auto">
            {/* Left Box */}
            <div className="bg-white shadow rounded-[32px] border-[3px] border-black px-[24px] py-[32px] text-custom-brown">
              <h3 className="text-xl font-normal mb-3">{t.keyFeaturesAIMatchesTitle}</h3>
              <ul className="list-disc list-inside space-y-2 text-[17px] font-Baloo2 pl-[16px] font-bold">
                {t.keyFeaturesAIMatchesBullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </div>

            {/* Center Box with GIF */}
            <div className="hidden lg:flex flex-col items-center justify-center relative">
              <img
                src="/assets/images/gif/key-feature.gif"
                alt="key-features-gif"
                loading="lazy"
                className="max-w-[382px] block mt-[15px] mb-[-7px] mx-auto"
              />
              <img
                src="/assets/images/badge.png"
                alt="badge"
                loading="lazy"
                className="absolute right-[-40px] bottom-[-70px] w-[151px] z-[1]"
              />
            </div>

            {/* Right Box */}
            <div className="bg-white shadow rounded-[32px] border-[3px] border-black px-[24px] py-[32px] text-custom-brown w-full lg:max-w-[343px] m-auto">
              <h3 className="text-xl font-normal mb-3">{t.keyFeaturesPartnershipsTitle}</h3>
              <ul className="list-disc list-inside space-y-2 text-[17px] font-Baloo2 pl-[16px] font-bold">
                {t.keyFeaturesPartnershipsBullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </div>

            {/* Extra T-Shirt + Box */}
            <div className="relative col-span-1 lg:col-span-1">
              <img
                src="/assets/images/t-shirt.png"
                alt="t-shirt"
                loading="lazy"
                className="hidden lg:block absolute left-[-120px] max-w-[322px] rotate-[-41deg] top-[-86px] z-[-1]"
              />
              <div className="bg-white shadow rounded-[32px] border-[3px] border-black px-[24px] py-[32px] text-custom-brown w-full lg:max-w-[302px] mx-auto mr-0 mt-[10px] ">
                <h3 className="text-xl font-normal mb-3">{t.keyFeaturesOnChainTitle}</h3>
                <ul className="list-disc list-inside space-y-2 text-[17px] font-Baloo2 pl-[16px] font-bold">
                  {t.keyFeaturesOnChainBullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <img
                src="/assets/images/shoes-bottom.png"
                alt="shoes"
                loading="lazy"
                className="hidden lg:block relative right-[-265px] bottom-[50px] z-[1] max-w-[321px]"
              />
            </div>
            <div></div>
            {/* Last Box */}
            <div className="bg-white shadow rounded-[32px] border-[3px] border-black px-[24px] py-[32px] text-custom-brown w-full lg:max-w-[333px] ml-0">
              <h3 className="text-xl font-normal mb-3">{t.keyFeaturesCommunityTitle}</h3>
              <ul className="list-disc list-inside space-y-2 text-[17px] font-Baloo2 pl-[16px] font-bold">
                {t.keyFeaturesCommunityBullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <img
        src="/assets/images/about-img.png"
        alt="goal"
        loading="lazy"
        className="hidden lg:block absolute right-0 bottom-0 2xl:bottom-[-9%]  max-w-[10%] 2xl:max-w-[24%]"
      />
    </section>
  );
}
