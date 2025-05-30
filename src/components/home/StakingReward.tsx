import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';

const StakingReward = () => {
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode] || translations.en;

  return (
    <div className="absolute bg-staking-reward bg-cover bg-center flex items-center w-[120px] h-[120px] 2xl:w-[150px] 2xl:h-[150px] justify-center z-[1] left-0 580:left-[unset] right-0 top-[-100px] m-auto 580:m-[unset] 580:top-[-50px] 580:right-[50px] md:right-0 2xl:top-[-40px]  2xl:right-[-90px]">
      <div className="text-white p-4 max-w-[120px] text-center m-0 text-[18px] text-stroke-5 text-stroke-black paint-order-stroke">
        <p className="m-0">
          {t.stakingAPY}<br />
          <span className="text-2xl font-bold">600%</span>
        </p>
      </div>
    </div>
  );
};

export default StakingReward; 