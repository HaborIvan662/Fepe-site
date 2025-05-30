import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';
import { useAccount } from 'wagmi';

interface PresaleInfoProps {
  info: {
    raised: string;
    price: string;
  };
  purchasedAmount?: string;
}

const PresaleInfo = ({ info, purchasedAmount = '0' }: PresaleInfoProps) => {
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col gap-3 mt-[15px] w-full">
      <div className="text-center text-black">
        <span className="uppercase text-[24px]  font-medium">USDT Raised:  {info.raised}</span>
      </div>

      {/* <div className="flex flex-col gap-1">
        {isConnected && (
          <div className="flex justify-between items-center text-black text-[14px]">
            <span className="uppercase">Your purchased $FEPE:</span>
            <div className="flex items-center gap-2">
              <span>{purchasedAmount}</span>
              <img 
                src="/assets/images/svg-icons/info-black.svg" 
                alt="info" 
                className="w-4 h-4 cursor-pointer" 
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center text-black text-[14px]">
          <span className="uppercase">Your stakeable $FEPE:</span>
          <div className="flex items-center gap-2">
            <span>{purchasedAmount}</span>
            <img 
              src="/assets/images/svg-icons/info-black.svg" 
              alt="info" 
              className="w-4 h-4 cursor-pointer" 
            />
          </div>
        </div>
      </div> */}

      <p className="relative text-center text-sm text-custom-red font-medium before:absolute before:left-0 before:top-1/2 before:h-px before:w-1/5 before:bg-black after:absolute after:right-0 after:top-1/2 after:h-px after:w-1/5 after:bg-black">
        1 $FEPE = ${info.price}
      </p>
    </div>
  );
};

export default PresaleInfo; 