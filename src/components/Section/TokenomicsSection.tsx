import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';

const TokenomicsSection = () => {
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;
  return (
    <section id="tokenomics" className="relative bg-custom-green bg-tokenomic-bg bg-no-repeat bg-[length:auto] bg-[position:50%_85%] pt-3 pb-[200px]">
      <div className="container mx-auto px-4">
        <div className="text-center text-[55px] font-bold drop-shadow pb-8">{t.tokenomics}</div>

        {/* Desktop Description */}
        <div className="hidden lg:block max-w-[1086px] mx-auto mt-[16px] mb-[110px] bg-white rounded-[32px] py-[32px] px-[24px] font-Baloo2 text-custom-brown border-[3px] border-black text-[21px] font-bold leading-tight
        ">
          <p className="mr-[100px]">
            {t.tokenomicsDescription}
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 pl-[16px]">
            <li>{t.tokenomicsTotalSupply}</li>
            <li>{t.tokenomicsPresale}</li>
            <li>{t.tokenomicsStages}</li>
            <li>{t.tokenomicsClaim}</li>
          </ul>
        </div>

        <div className="flex flex-col md:flex-row mt-8 gap-6">
          {/* Pepe GIF */}
          <div className="lg:w-5/12 flex justify-center items-end">
            <img
              src="/assets/images/gif/tokenomics-pepe.gif"
              alt="tokenomics-pepe"
              className="min-w-[100%] h-auto mt-12"
              loading="lazy"
            />
          </div>

          {/* Token Allocation */}
          <div className=" lg:w-7/12 pt-10 lg:pt-20">
            <div className="flex flex-wrap gap-[10px] sm:gap-[50px] justify-evenly sm:justify-center flex-row items-start">
              {[
                { percent: 20, label: t.tokenomicsPreSale, img: "meme-fund.png" },
                { percent: 15, label: t.tokenomicsStakingRewards, img: "staking-rewards.png" },
                { percent: 35, label: t.tokenomicsMarketingBudget, img: "marketing-budget.png" },
                { percent: 15, label: t.tokenomicsPredictionRewards, img: "predication-rewards.png" },
                { percent: 15, label: t.tokenomicsExchangeLiquidity, img: "exchange-liquidity.png" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative text-center flex flex-col justify-start items-center"
                >
                  <img
                    src={`/assets/images/${item.img}`}
                    alt={item.label}
                    className="w-[91px] h-[91px] sm:w-[177px] sm:h-[177px] 2xl:w-[197px] 2xl:h-[197px]"
                    loading="lazy"
                  />
                  <div className="absolute paint-order-stroke text-stroke-9 text-stroke-white text-[26px] sm:text-[56px] text-black py-[5px] px-[10px] left-0 right-0 top-[10%] sm:top-[25%] text-center flex flex-col gap-0 sm:gap-4">
                    <div>{item.percent}</div>
                    <div className="text-[14px] sm:text-[20px]"> % </div>
                  </div>
                  <div className={`mt-3 text-black rounded-[40px] text-center font-bold border-[3px] border-black my-[12px] mx-auto leading-[16px] sm:leading-[22px] max-w-[90px] sm:max-w-[150px] break-words p-[8px] sm:px-[5px] md:py-[8px] text-[14px] sm:text-[20px] font-Baloo2
                   ${index === 0 ? 'bg-[#428e32]  text-white' :
                      index === 1 ? 'bg-custom-light-green' :
                        index === 2 ? 'bg-custom-light-yellow' :
                          index === 3 ? 'bg-[#37f483]' :
                            'bg-custom-red text-white'
                    }`}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Description */}
        <div className="block lg:hidden max-w-[1086px] mb-[110px] mx-auto mt-[16px] bg-white rounded-[32px] py-[32px] px-[24px] font-Baloo2 text-custom-brown border-[3px] border-black text-[21px] font-bold leading-tight
        ">
          <p className="mr-[100px]">
            {t.tokenomicsDescription}
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 pl-[16px]">
            <li>{t.tokenomicsTotalSupply}</li>
            <li>{t.tokenomicsPresale}</li>
            <li>{t.tokenomicsStages}</li>
            <li>{t.tokenomicsClaim}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
