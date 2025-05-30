import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';

const featuredLinks = [
  { href: "https://cryptonews.com/press-releases/fantasy-pepe-opens-early-access-to-fepe-prediction-markets/", src: "/assets/images/svg-icons/cryptonews.svg" },
  { href: "https://www.newsbtc.com/sponsored/top-meme-coin-to-buy-now-fantasy-pepe-combines-football-ai-and-crypto/", src: "/assets/images/svg-icons/newsbtc.svg" },
  { href: "https://bitcoinist.com/football-ai-and-viral-meme-coin-why-everyones-talking-about-fantasy-pepe-presale/", src: "/assets/images/svg-icons/bitcoinist.svg" },
  { href: "https://www.coinspeaker.com/meme-coins-climb-60b-fantasy-pepe-introduces-play-to-earn-meme-football-club/", src: "/assets/images/svg-icons/coinspeaker.svg" },
  { href: "https://99bitcoins.com/news/fantasy-pepe-presale-explodes-past-200k-is-this-the-next-big-meme-utility-token/", src: "/assets/images/svg-icons/99bitcoins.svg" },
  { href: "https://cointelegraph.com/market-releases/fantasy-pepe-brings-fun-and-fairness-to-football-fepe-presale-begins", src: "/assets/images/svg-icons/cointelegraph.svg" },
  { href: "https://news.bitcoin.com/fantasy-pepe-raises-200k-in-viral-crypto-presale-ai-powered-football-prediction-craze-takes-off/", src: "/assets/images/bitcoin.png" },
  { href: "https://www.investing.com", src: "/assets/images/svg-icons/investing.svg" },
  { href: "https://www.binance.com/en/square/post/23480551819545", src: "/assets/images//binance.png" },
];

const FeaturedSection = () => {
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  return (
    <section id="featured" className="py-10">
      <div
        className="text-center text-[56px] text-white font-bold"
        style={{
          filter: 'drop-shadow(0px 0px 1px #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 6px 0 #000000)'
        }}
      >
        {t.featuredIn}
      </div>

      <div className="relative overflow-hidden mt-[48px]">
        <div className="flex animate-marquee items-center">
          {featuredLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img
                src={item.src}
                alt="featured-img"
                className="object-contain w-[250px] px-[30px]"
                loading="lazy"
              />
            </a>
          ))}
          {/* Duplicate for seamless loop */}
          {featuredLinks.map((item, idx) => (
            <a
              key={`dup-${idx}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img
                src={item.src}
                alt="featured-img"
                className="object-contain w-[250px] px-[30px]"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
