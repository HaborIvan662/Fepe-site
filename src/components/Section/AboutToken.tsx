import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';

export default function AboutToken() {
    const { selectedLanguageCode } = useLanguage();
    const t = translations[selectedLanguageCode as keyof typeof translations] || translations.en;
    return (
        <div>
        <div className="w-full flex justify-center items-center py-6 md:py-12 bg-cover bg-no-repeat bg-center mb-[50px]">
          <div className="w-full max-w-5xl flex flex-col lg:flex-row justify-center items-center px-2 md:px-8 gap-8 lg:gap-4 text-black">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-6 md:gap-12">
              {/* Logo and Title */}
              <div className="w-full flex justify-start items-center gap-4">
                <img 
                  alt="$Fepe Token Logo" 
                  className="w-10 h-10 md:w-14 md:h-14 object-cover" 
                  src="https://fantasypepe.com/assets/images/svg-icons/token.svg" 
                />
                <h2 className="custom-font uppercase tracking-[2.4px] leading-none">
                  <span className="text-white text-[24px] md:text-[35px] drop-shadow">$Fepe Token</span>
                </h2>
              </div>

              {/* Main Heading */}
              <h1 className="custom-font3 uppercase tracking-[2.4px] leading-none text-center lg:text-left">
                <span className="text-[40px] md:text-[50px] lg:text-[75px]">
                  {t.aboutTokenTitle}
                </span>
              </h1>

              {/* Ratings Section */}
              <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
                <div className="w-full md:w-[60%] flex flex-col justify-center items-center md:items-start gap-2">
                  <h3 className="text-[28px] md:text-[35px] uppercase font-bold">{t.aboutTokenRatedBy}</h3>
                  <div className="flex justify-center md:justify-start items-center gap-4">
                    <img 
                      alt="Coingecko Logo" 
                      className="rounded-full w-10 h-10 md:w-14 md:h-14 object-cover" 
                      src="/assets/images/coingecko.png" 
                    />
                    <h3 className="text-[28px] md:text-[45px] font-bold">Coingecko</h3>
                  </div>
                </div>
                {/* <div className="w-full md:w-[40%] flex justify-center items-center">
                  <img 
                    alt="Trust Badge" 
                    className="w-[50%] md:w-[70%]" 
                    src="/src/assets/trust.png" 
                  />
                </div> */}
              </div>
            </div>

            {/* Right Section - Trust Score */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start bg-white rounded-xl px-4 md:px-6 py-2 gap-4 border-[3px] border-black">
              <h2 className="text-[24px] md:text-[30px] font-bold">{t.aboutTokenTrustScore}</h2>
              <div className="flex justify-start items-center">
                <span className="text-[40px] md:text-[50px] font-[900] leading-none text-green-500">10/10</span>
              </div>
              
              {/* Score Details */}
              <div className="w-full flex flex-col justify-start items-start">
                {[
                  { label: t.aboutTokenScoreLiquidity, score: '3.0' },
                  { label: t.aboutTokenScoreScale, score: '1.0' },
                  { label: t.aboutTokenScoreSecurity, score: '0.5' },
                  { label: t.aboutTokenScoreAPI, score: '0.5' },
                  { label: t.aboutTokenScoreTeam, score: '2.0' },
                  { label: t.aboutTokenScoreIncident, score: '2.0' },
                  { label: t.aboutTokenScoreRoR, score: '1.0' }
                ].map((item) => (
                  <div key={item.label} className="w-full flex justify-between items-center p-2 md:p-3 border-t border-t-green-500">
                    <h3 className="text-[16px] md:text-[20px] font-bold">{item.label}</h3>
                    <h3 className="text-[16px] md:text-[20px] font-bold">{item.score}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 max-w-4xl mx-auto shadow-md text-black border-[3px] border-black mb-[100px]">
              <h2 className="font-bold text-lg sm:text-2xl mb-1">
                {t.aboutTokenTrustNetTitle} <span className="font-normal">{t.aboutTokenTrustNetScore}</span>
              </h2>
              
              <p className="text-sm sm:text-base mb-4">
                {t.aboutTokenTrustNetDesc}
              </p>

              <div className="flex items-center gap-4 sm:gap-6">
                <div className="text-3xl sm:text-4xl font-bold min-w-[72px]">90.00</div>
                
                <div className="flex-1">
                  <div className="relative h-6 mb-1">
                    <div className="w-full h-4 rounded-full bg-gradient-to-r from-red-700 via-yellow-400 to-green-700"></div>
                    <div 
                      className="absolute top-4 rotate-180 pointer-events-none"
                      style={{
                        left: 'calc(90% - 8px)',
                        width: '0',
                        height: '0',
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderTop: '10px solid rgb(68, 68, 68)'
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>{t.aboutTokenTrustNetPoor}</span>
                    <span>{t.aboutTokenTrustNetExcellent}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}

