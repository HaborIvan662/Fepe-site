import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';

const RoadmapSection = () => {
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  return (
    <section id="roadmap" className="py-[100px] text-center relative roadmap-bg">
      <div className="max-w-[1430px] m-auto">
        <h2 className="text-[55px] mx-auto text-center mb-0 drop-shadow">{t.roadmapTitle}</h2>

        <div className="block lg:hidden">
          <img
            src="/assets/images/webp/mob-roadmap.webp"
            alt="roadmap man"
            loading="lazy"
            className="img-fluid d-lg-none d-block roadmap-man"
          />
          <img
            src="/assets/images/gif/roadmap-goal.gif"
            alt="goal"
            loading="lazy"
            className="absolute top-[7%] mx-auto w-[100%] left-0 right-0 max-w-[320px]"
          />
        </div>

        <div className="flex flex-wrap flex-col px-[20px] lg:flex-row lg:mt-12 lg:pt-12">
          <div className="w-full lg:w-[41.66666667%]">
            <div className="bg-white rounded-[32px] p-[20px] relative z-[2] text-start text-custom-brown border-[3px] border-black w-full lg:max-w-[376px] mb-[35px] md:ms-auto">
              <img
                src="/assets/images/plush.png"
                alt="plus"
                loading="lazy"
                className="absolute max-w-[58px] right-[30px] top-[-54px] d-none d-lg-block "
              />
              <p className="text-custom-red text-[22px] uppercase mb-2 font-bold font-Baloo2 ">{t.roadmapPhase1Title}</p>
              <div className="text-[28px] mb-2 font-medium uppercase">{t.roadmapPhase1Subtitle}</div>
              <p className="mb-0 font-Baloo2 font-semibold text-[17px]">
                {t.roadmapPhase1Content}
              </p>
            </div>

            <div className="bg-white rounded-[32px] p-[20px] relative z-[2] text-start text-custom-brown border-[3px] border-black  w-full lg:max-w-[376px] mb-[35px]">
              <p className="text-custom-red text-[22px] uppercase mb-2 font-bold font-Baloo2 ">
                {t.roadmapPhase2Title}
              </p>
              <div className="text-[28px] mb-2 font-medium uppercase">{t.roadmapPhase2Subtitle}</div>
              <p className="mb-0 font-Baloo2 font-semibold text-[17px] ">
                {t.roadmapPhase2Content}
              </p>
            </div>

            <div className="bg-white rounded-[32px] p-[20px] relative z-[2] text-start text-custom-brown border-[3px] border-black  w-full lg:max-w-[376px] mb-[35px]  md:ms-auto md:mb-0">
              <p className="text-custom-red text-[22px] uppercase mb-2 font-bold font-Baloo2 ">
                {t.roadmapPhase3Title}
              </p>
              <div className="text-[28px] mb-2 font-medium uppercase">{t.roadmapPhase3Subtitle}</div>
              <p className="mb-0 font-Baloo2 font-semibold text-[17px]">
                {t.roadmapPhase3Content}
              </p>
            </div>
          </div>

          <div className="hidden lg:block self-center w-[16.66666667%]">
            <img
              src="/assets/images/gif/roadmap-goal.gif"
              alt="goal"
              loading="lazy"
              className="left-0 right-0 top-[21.6%] z-[3] absolute max-w-[455px] mx-auto my-0 d-none d-lg-block"
            />
          </div>

          <div className="w-full lg:w-[41.66666667%]">
            <div className="bg-white rounded-[32px] p-[20px] relative z-[2] text-start text-custom-brown border-[3px] border-black max-w-[450px] mb-[35px]">
              <p className="text-custom-red text-[22px] uppercase mb-2 font-bold font-Baloo2  m-0">
                {t.roadmapPhase4Title}
              </p>
              <div className="text-[28px] mb-2 font-medium uppercase">{t.roadmapPhase4Subtitle}</div>
              <p className="m-0 font-Baloo2 font-semibold text-[17px]">
                {t.roadmapPhase4Content}
              </p>
              <ul className="list-disc ms-2 mb-0 font-Baloo2 font-semibold text-[17px] pl-[16px] mr-[50px]">
                <li>{t.roadmapPhase4Bullet1}</li>
                <li>{t.roadmapPhase4Bullet2}</li>
              </ul>
            </div>

            <div className="bg-white rounded-[32px] p-[20px] relative z-[2] text-start text-custom-brown border-[3px] border-black  w-full lg:max-w-[376px] mb-[35px] md:ms-auto">
              <img
                src="/assets/images/clock.png"
                alt="bot"
                loading="lazy"
                className="absolute max-w-[78px] right-[-38px] top-[-37px] hidden lg:block"
              />
              <p className="text-custom-red text-[22px] uppercase mb-2 font-bold font-Baloo2 ">
                {t.roadmapPhase5Title}
              </p>
              <div className="text-[28px] mb-2 font-medium uppercase">{t.roadmapPhase5Subtitle}</div>
              <p className="mb-0 font-Baloo2 font-semibold text-[17px]">
                {t.roadmapPhase5Content}
              </p>
            </div>

            <div className="bg-white rounded-[32px] p-[20px] relative z-[2] text-start text-custom-brown border-[3px] border-black  max-w-[520px] mb-[35px] md:mb-0">
              <p className="text-custom-red text-[22px] uppercase mb-2 font-bold font-Baloo2 ">
                {t.roadmapPhase6Title}
              </p>
              <div className="text-[28px] mb-2 font-medium uppercase">{t.roadmapPhase6Subtitle}</div>
              <p className="mb-0 font-Baloo2 font-semibold text-[17px]">
                {t.roadmapPhase6Content}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:mt-4 px-[20px]">
          <div className="text-center w-full">
            <div className="bg-white rounded-[32px] p-[20px] relative z-[2] border-[3px] border-black text-custom-brown w-full md:w-[840px] d-inline-block text-start mx-auto">
              <p className="text-custom-red text-[22px] uppercase mb-2 font-bold font-Baloo2 ">
                {t.roadmapPhase7Title}
              </p>
              <div className="text-[28px] mb-2 font-medium uppercase">{t.roadmapPhase7Subtitle}</div>
              <ul className="list-disc text-start ms-2 mb-0 font-Baloo2 font-semibold text-[17px] pl-[16px]">
                <li>
                  {t.roadmapPhase7Bullet1}
                </li>
                <li>
                  {t.roadmapPhase7Bullet2}
                </li>
                <li>
                  {t.roadmapPhase7Bullet3}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <img
        src="/assets/images/gif/how-to-buy-goal.gif"
        alt="goal-box"
        loading="lazy"
        className="absolute right-[3%] 2xl:right-[8%] bottom-[8%] max-w-[27%]"
      />
    </section>
  );
};

export default RoadmapSection;
