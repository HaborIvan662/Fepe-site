import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';

interface FaqItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onToggle }) => (
  <div className="font-Baloo2 text-[20px] mb-4 text-black">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center bg-white h-[76px] border-[3px] border-black rounded-[67px] px-[56px] text-left font-bold"
    >
      <span className="flex-1">{question}</span>
      <img
        src="/assets/images/svg-icons/right.svg"
        alt="arrow"
        className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-[-90deg]'}`}
        width={24}
        height={24}
      />
    </button>
    <div className={`overflow-hidden transition-all ${isOpen ? 'duration-1000 ease-in-out max-h-[500px]' : 'duration-200 ease-out max-h-0'}`}>
      <div className="my-[16px] px-[56px] font-medium">
        {answer}
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  const faqData = [
    {
      question: t.faqWhatIsFEPE,
      answer: (
        <p>{t.faqWhatIsFEPEAnswer}</p>
      ),
    },
    {
      question: t.faqWhereToBuy,
      answer: (
        <p>{t.faqWhereToBuyAnswer}</p>
      ),
    },
    {
      question: t.faqWhenGetTokens,
      answer: (
        <p>{t.faqWhenGetTokensAnswer}</p>
      ),
    },
    {
      question: t.faqWhyPresale,
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li>{t.faqWhyPresaleAnswer1}</li>
          <li>{t.faqWhyPresaleAnswer2}</li>
          <li>{t.faqWhyPresaleAnswer3}</li>
        </ul>
      ),
    },
    {
      question: t.faqWhyBestMeme,
      answer: (
        <p>{t.faqWhyBestMemeAnswer}</p>
      ),
    },
  ];

  return (
    <section id="faq" className="py-[100px] px-2 sm:px-[100px]">
      <div className="max-w-[1430px] mx-auto px-4 relative">
        <h2 className="text-center text-3xl font-bold mb-10">
          <span className="text-[55px] drop-shadow">{t.faqTitle}</span>
        </h2>
        <div className="flex flex-col lg:flex-row items-start gap-10 ">
          <div className="w-full lg:w-5/12">
            <img
              src="/assets/images/gif/faq-goal.gif"
              alt="faq man"
              className="maxw-full h-auto relative m-auto lg:absolute bottom-0"
              loading="lazy"
            />
          </div>
          <div className="w-full lg:w-7/12 ">
            {faqData.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
