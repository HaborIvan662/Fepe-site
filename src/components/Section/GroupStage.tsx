import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';

const matches = [
  {
    id: 1,
    left: { name: "Deepseek", image: "/assets/images/webp/fepe.webp" },
    score: "0 : 2",
    right: { name: "ChatGPT", image: "/assets/images/webp/doge.webp" },
  },
  {
    id: 2,
    left: { name: "Deepseek", image: "/assets/images/webp/real.webp" },
    score: "1 : 1",
    right: { name: "ChatGPT", image: "/assets/images/webp/shiba.webp" },
  },
  {
    id: 3,
    left: { name: "Deepseek", image: "/assets/images/webp/chill.webp" },
    score: "2 : 1",
    right: { name: "ChatGPT", image: "/assets/images/webp/tariffs.webp" },
  },
];

export default function GroupStage() {
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  const matchSummaries = [
    t.groupStageMatch1Summary,
    t.groupStageMatch2Summary,
    t.groupStageMatch3Summary,
  ];

  return (
    <section id="group-stage" className="pb-0 sm:py-10 m-auto mt-5 md:mt-[48px] relative">
      <div className="container mx-auto px-4 flex flex-col md:flex-row  justify-center items-center gap-4">
        {matches.map((match, index) => (
          <div key={match.id} className="bg-white shadow-lg mb-6 w-full md:w-[418px] h-auto md:h-[350px] flex flex-col rounded-[15px] border-[3px] border-black">
            <div className={`flex justify-around items-center h-[175px] rounded-t-[15px] border-b-[3px] border-black ${index === 0 ? 'bg-custom-sky' :
              index === 1 ? 'bg-custom-grey' :
                'bg-custom-yellow'
              }`}>
              {/* Left team */}
              <div className="flex flex-col items-center">
                <img
                  src={match.left.image}
                  alt={match.left.name}
                  loading="lazy"
                  className="w-[80px] h-[80px] object-contain"
                />
                <p className="mt-2 text-white text-[20px] text-stroke-6 text-stroke-black paint-order-stroke font-semibold px-2 py-1">{match.left.name}</p>
              </div>

              {/* Score */}
              <p className="text-4xl font-bold text-center drop-shadow">
                {match.score.split(":")[0]}
                <span className="mx-2">:</span>
                {match.score.split(":")[1]}
              </p>

              {/* Right team */}
              <div className="flex flex-col items-center">
                <img
                  src={match.right.image}
                  alt={match.right.name}
                  loading="lazy"
                  className="w-[80px] h-[80px] object-contain"
                />
                <p className="mt-2 text-white text-[20px] text-stroke-6 text-stroke-black paint-order-stroke font-semibold px-2 py-1">{match.right.name}</p>
              </div>
            </div>

            {/* Bottom summary */}
            <div className="bg-white text-center flex-1 rounded-bl-[15px] rounded-br-[15px] pt-[24px] px-[24px] pb-[32px] flex flex-col justify-between flex-grow-[1]">
              <div>
                <h3 className="text-[24px] font-normal text-black uppercase mb-[8px]">{t.groupStageTitle}</h3>
                <p className="text-black font-Baloo2 font-semibold text-[18px]">{matchSummaries[index]}</p>
              </div>
            </div>
          </div>
        ))}

        <img
          src="/assets/images/webp/how-to-buy-man.webp"
          alt="mans"
          loading="lazy"
          className="block sm:hidden relative sm:absolute bottom-[120px] sm:bottom-0 left-[50px] sm:left-0 max-w-[525px]"
        />
      </div>
    </section>
  );
}
