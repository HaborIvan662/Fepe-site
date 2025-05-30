import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';

const videos = [
  "M-M6KvUr0aI",
  // "Csa1z52cXtE",
  "O4Xo0VFArK0",
  "UvqNN06wQHE",
  "qwneGEjwUSg",
  "umcqqw617jc",
  "C4ZsK8X1aKs",
  "K6AytV7YhCE",
  "jS1oqF7cHek",
  "FVrq8sDLJMY",
  "2ObhLT7WVEA"
];

export default function MediaSection() {
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  return (
    <section id="media" className="py-10">
      <div className="container w-full mx-auto px-4">
        <h2 className="text-[55px] font-bold mb-8 text-center drop-shadow">{t.media}</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          speed={500}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="max-w-[1296px] mt-[48px]"
        >
          {videos.map((id) => (
            <SwiperSlide key={id}>
              <div className="relative p-0 mr-0 cursor-pointer block border-[3px] border-black rounded-[12px] transition-colors duration-300">
                <img
                  src={`http://img.youtube.com/vi/${id}/0.jpg`}
                  alt="YouTube thumbnail"
                  className="w-full rounded-lg shadow-md object-cover"
                  style={{ aspectRatio: '16/9' }}
                />
                <img
                  src="/assets/images/youtube-icon.png"
                  alt="Play icon"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-90 transition-all duration-300 w-[54px] h-[37px] group-hover:scale-110 group-hover:opacity-100"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
