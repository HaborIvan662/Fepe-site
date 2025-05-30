import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';

const HowToBuy = () => {
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  const steps = [
    {
      title: t.howToBuyStep1Title,
      content: (
        <>
          {t.howToBuyStep1Content}
        </>
      ),
      className: 'circle-1',
    },
    {
      title: t.howToBuyStep2Title,
      content: (
        <>
          {t.howToBuyStep2Content}
        </>
      ),
      className: 'circle-2',
    },
    {
      title: t.howToBuyStep3Title,
      content: (
        <>
          {t.howToBuyStep3Content}
        </>
      ),
      className: 'circle-3',
    },
  ];

  return (
    <section id="how-to-buy" className="relative bg-cover bg-no-repeat bg-center py-[100px] bg-custom-green overflow-hidden">
      <div className="max-w-[1430px] mx-auto text-center">
        <div className="text-[55px] font-bold mb-6 drop-shadow">{t.howToBuyTitle}</div>
        <img src="/assets/images/gif/how-to-buy.gif" alt="how-to-buy" className="max-w-[373px] block pt-8 mx-auto mb-[-48px]" />

        {/* Desktop View */}
        <div className="hidden lg:flex justify-center gap-5 items-center">
          {steps.map((step, idx) => (
            <div key={idx} className={`circle ${step.className} w-[310px] h-[310px] rounded-[50%] border-[3px] border-black bg-white flex flex-col items-center justify-center p-[20px] text-center relative text-custom-brown`}>
              <h4 className="text-[20px] mb-[10px] mx-[42px]">{step.title}</h4>
              <p className="text-[18px] font-semibold font-Baloo2 px-[7px] mb-[16px] leading-tight">{step.content}</p>
            </div>
          ))}
        </div>

        {/* Mobile View Swiper */}
        <div className="block lg:hidden mt-6">
          <Swiper spaceBetween={20} slidesPerView={1}>
            {steps.map((step, idx) => (
              <SwiperSlide key={idx}>
                <div className={`circle ${step.className} w-[310px] h-[310px] rounded-[50%] border-[3px] border-black bg-white flex flex-col items-center justify-center p-[20px] text-center relative text-custom-brown m-auto cursor-pointer`}>
                  <h4 className="text-[20px] mb-[10px] mx-[42px]">{step.title}</h4>
                  <p className="text-[18px] font-semibold font-Baloo2 px-[7px] mb-[16px] leading-tight">{step.content}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HowToBuy;
