import React, { memo, useRef, useEffect, useState } from 'react';

interface NeedWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NeedWalletModal = memo(({ isOpen, onClose }: NeedWalletModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[9999] flex items-center justify-center backdrop-blur-[15px] bg-black/40">
      <div className="bg-[#b33de5] backdrop-blur-[20px] border-3px border-black rounded-[25px] font-Baloo2 w-[850px] px-[52px] pt-[32px] fade-top">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-center md:text-left mb-3 md:mb-0 leading-none font-primary text-[35px] md:text-[40px]">
            Need a wallet?
          </h2>
          <p className="text-[14px] text-center block md:hidden mb-3 md:mb-0">
            MetaMask is the world’s most secure and flexible crypto wallet, trusted by millions of users to buy, sell, and swap digital assets. Manage your portfolio, interact with dapps, and jump into the decentralized web.
          </p>
          <div onClick={onClose} className="cursor-pointer absolute top-[-10px] right-[-10px]">
            <svg
              width="44"
              height="44"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="1.4" y="1.4" width="53.2" height="53.2" rx="26.6" fill="white" />
              <rect x="1.4" y="1.4" width="53.2" height="53.2" rx="26.6" stroke="black" strokeWidth="2.8" />
              <path
                d="M35.6364 20.3636L20.3636 35.6364M20.3636 20.3636L35.6364 35.6364"
                stroke="black"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="my-[10px]">
          <div className="flex justify-center items-start">
            <div className="flex flex-col justify-start items-start w-full max-w-[490px] self-stretch my-5 order-2 md:order-1">
              <div className="hidden md:flex items-center justify-between w-full gap-3">
                <div>
                  <img src="/assets/images/svg-icons/footer-logo.svg" alt="footer-logo" className="w-[100] h-[100]" />
                </div>
                <div className="text-[18px] topInfo">
                  MetaMask is the world’s most secure and flexible crypto wallet, trusted by millions of users to buy, sell, and swap digital assets. Manage your portfolio, interact with dapps, and jump into the decentralized web.
                </div>
              </div>

              <div className="bg-[#eaecf033] rounded-t-[10px] rounded-l-[10px] py-[16px] pr-[25px] pl-[16px] relative w-full text-white text-[14px] mt-[35px]">
                <div className="flex items-center justify-between mt-0 lg:mt-3">
                  <ul className='m-0 mr-25px p-0'>
                    <li className="flex mb-[10px] items-center justify-start">
                      <div className="min-w-[24px] min-h-[24px] text-[12px] border-[2px] border-white leading-none mr-[15px] rounded-[50%] flex justify-center items-center bg-[#717bbc]">1</div>
                      <div className='max-w-[251px]'>
                        <a
                          href="https://metamask.io/download"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Download
                        </a>{" "}
                        Download the Metamask App
                      </div>
                    </li>
                    <li className="flex mb-[10px] items-center justify-start">
                      <div className="min-w-[24px] min-h-[24px] text-[12px] border-[2px] border-white leading-none mr-[15px] rounded-[50%] flex justify-center items-center bg-[#717bbc]">2</div>
                      <div className='max-w-[251px]'>Create your account</div>
                    </li>
                    <li className="flex mb-[10px] items-center justify-start">
                      <div className="min-w-[24px] min-h-[24px] text-[12px] border-[2px] border-white leading-none mr-[15px] rounded-[50%] flex justify-center items-center bg-[#717bbc]">3</div>
                      <div className='max-w-[251px]'>Buy in-app with card or crypto</div>
                    </li>
                  </ul>
                  <div className="p-0 bg-white rounded-[10px] overflow-hidden w-[140px]">
                    <img
                      src="/assets/images/svg-icons/presale_qrcode.svg"
                      alt="qr"
                      loading="lazy"
                      className="qr-img"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
});

NeedWalletModal.displayName = 'NeedWalletModal';

export default NeedWalletModal;
