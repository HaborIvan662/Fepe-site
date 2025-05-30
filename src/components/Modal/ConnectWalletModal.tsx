import React, { memo, useState, useCallback } from 'react';
import NeedWalletModal from './NeedWalletModal';
import { useLanguage } from '../../context/LanguageContext';
import { useWalletConnect } from '../../hooks/useWalletConnect';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WalletOption {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ConnectWalletModal = memo(({ isOpen, onClose }: ConnectWalletModalProps) => {
  const [isNeedWalletModalOpen, setIsNeedWalletModalOpen] = useState(false);
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;
  const { connectWallet, isPending, connectError, selectedWallet, isMetaMaskInstalled } = useWalletConnect();

  const handleWalletConnect = useCallback(async (walletType: string) => {
    try {
      if (walletType === 'MetaMask' && !isMetaMaskInstalled) {
        window.open('https://metamask.io/download/', '_blank');
        return;
      }
      await connectWallet(walletType);
      onClose();
    } catch (error) {
      // Error is already handled in the hook
      console.error('Wallet connection error:', error);
    }
  }, [connectWallet, onClose, isMetaMaskInstalled]);

  const handleNeedWalletModalClose = useCallback(() => {
    setIsNeedWalletModalOpen(false);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const walletOptions: WalletOption[] = [
    {
      name: 'MetaMask',
      icon: (
        <img src="./assets/images/metamask-icon.png" alt="metamask-icon" />
      ),
      onClick: () => handleWalletConnect('MetaMask')
    },
    {
      name: 'WalletConnect',
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M16 0C24.8375 0 32 7.1625 32 16C32 24.8375 24.8375 32 16 32C7.1625 32 0 24.8375 0 16C0 7.1625 7.1625 0 16 0Z" fill="url(#paint0_radial_2444_15655)" />
          <path d="M10.1687 12.3563C13.3875 9.2126 18.6125 9.2126 21.8312 12.3563L22.2187 12.7376C22.3812 12.8938 22.3812 13.1501 22.2187 13.3063L20.8937 14.6001C20.8125 14.6813 20.6812 14.6813 20.6 14.6001L20.0687 14.0813C17.8187 11.8876 14.1812 11.8876 11.9312 14.0813L11.3625 14.6376C11.2812 14.7188 11.15 14.7188 11.0687 14.6376L9.7437 13.3438C9.5812 13.1876 9.5812 12.9313 9.7437 12.7751L10.1687 12.3563ZM24.575 15.0313L25.7562 16.1813C25.9187 16.3376 25.9187 16.5938 25.7562 16.7501L20.4375 21.9438C20.275 22.1001 20.0125 22.1001 19.8562 21.9438L16.0812 18.2563C16.0437 18.2188 15.975 18.2188 15.9375 18.2563L12.1625 21.9438C12 22.1001 11.7375 22.1001 11.5812 21.9438L6.2437 16.7501C6.0812 16.5938 6.0812 16.3376 6.2437 16.1813L7.42495 15.0313C7.58745 14.8751 7.84995 14.8751 8.0062 15.0313L11.7812 18.7188C11.8187 18.7563 11.8875 18.7563 11.925 18.7188L15.7 15.0313C15.8625 14.8751 16.125 14.8751 16.2812 15.0313L20.0562 18.7188C20.0937 18.7563 20.1625 18.7563 20.2 18.7188L23.975 15.0313C24.15 14.8751 24.4125 14.8751 24.575 15.0313Z" fill="white" />
          <defs>
            <radialGradient id="paint0_radial_2444_15655" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.91821e-05 16.0005) scale(32)">
              <stop stopColor="#5D9DF6" />
              <stop offset="1" stopColor="#006FFF" />
            </radialGradient>
          </defs>
        </svg>
      ),
      onClick: () => handleWalletConnect('WalletConnect')
    },
    {
      name: 'Coinbase Wallet',
      icon: (
        <svg width="32" height="32" viewBox="0 0 2500 2500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1250,0L1250,0c690.2,0,1250,559.8,1250,1250l0,0c0,690.2-559.8,1250-1250,1250l0,0 C559.8,2500,0,1940.2,0,1250l0,0C0,559.8,559.8,0,1250,0z" fill="#FFFFFF" />
          <path d="M1250.4,1689.5c-242.8,0-439.4-196.7-439.4-439.5s196.7-439.4,439.4-439.4c217.5,0,398.1,158.6,432.9,366.2 H2126c-37.4-451.2-414.9-805.7-875.6-805.7c-485.2,0-878.9,393.7-878.9,878.9s393.7,878.9,878.9,878.9 c460.7,0,838.3-354.5,875.6-805.7h-443.1C1648.1,1530.9,1467.9,1689.5,1250.4,1689.5L1250.4,1689.5z" fill="#0052FF" />
        </svg>
      ),
      onClick: () => handleWalletConnect('Coinbase')
    }
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[9999] flex items-center justify-center backdrop-blur-[15px] bg-black/40">
      {!isNeedWalletModalOpen && (
        <div className="p-6 bg-white/90 backdrop-blur-[12px] rounded-[16px] shadow-lg w-[361px] mx-auto relative fade-top">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="w-[14px]" /> {/* Spacer for alignment */}
            <h4 className="text-center font-semibold text-base text-black m-0">{t.connectWallet}</h4>
            <button
              onClick={onClose}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Close modal"
            >
              <div className="w-[14px] h-[14px]">
                <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="40" height="40" rx="20" fill="white" />
                  <rect x="1" y="1" width="40" height="40" rx="20" stroke="black" strokeWidth="2" />
                  <path d="M27.8878 29L13.5444 13.2659" stroke="black" strokeWidth="2.94737" strokeLinecap="square" />
                  <path d="M13.2504 28.7344L28.4975 13.8744" stroke="black" strokeWidth="2.94737" strokeLinecap="square" />
                </svg>
              </div>
            </button>
          </div>

          {/* Error Message */}
          {connectError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {connectError.message === 'MetaMask is not installed' ? (
                <div className="flex flex-col items-center">
                  <p className="mb-2">MetaMask is not installed</p>
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Install MetaMask
                  </a>
                </div>
              ) : (
                connectError.message
              )}
            </div>
          )}

          {/* Chain Info */}
          {/* {chainId && (
            <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-lg text-sm">
              Connected to chain ID: {chainId}
            </div>
          )} */}

          {/* Wallet Options */}
          <div className="space-y-3">
            {walletOptions.map((wallet) => {
              const isMetaMaskButton = wallet.name === 'MetaMask';
              const buttonText = isMetaMaskButton && !isMetaMaskInstalled 
                ? 'Install MetaMask' 
                : wallet.name;
              
              return (
                <button
                  key={wallet.name}
                  onClick={wallet.onClick}
                  disabled={isPending && selectedWallet === wallet.name}
                  className="w-full flex justify-between items-center text-white bg-custom-red min-w-[140px] font-normal rounded-[16px] py-3 px-4 border-[3px] border-black hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{buttonText}</span>
                  <div className="w-8 h-8">
                    {wallet.icon}
                  </div>
                </button>
              );
            })}

            {/* No Wallet Button */}
            <button
              type="button"
              onClick={() => setIsNeedWalletModalOpen(true)}
              className="w-full flex justify-center items-center text-black transition-all duration-300 hover:bg-gray-50 border-[3px] border-black rounded-[16px] py-3.5 text-[15px]"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-[19px] mr-[5px]"
              >
                <path
                  d="M1.57568 4.60616C1.57568 2.69827 3.12234 1.15161 5.03023 1.15161H15.3939C17.3018 1.15161 18.8484 2.69826 18.8484 4.60616V10.3637C18.8484 12.2716 17.3018 13.8183 15.3939 13.8183H5.03023C3.12234 13.8183 1.57568 12.2716 1.57568 10.3637V4.60616Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M1 4.79293C1 2.435 3.31004 0.770014 5.54697 1.51566L12.4561 3.81869C13.8667 4.2889 14.8182 5.60901 14.8182 7.09596V13.6313C14.8182 15.9892 12.5081 17.6542 10.2712 16.9086L3.36212 14.6056C1.95149 14.1353 1 12.8152 1 11.3283V4.79293Z"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="origin-[0px_0px] scale-x-[1.3] skew-y-[333deg] opacity-0"
                />
                <circle cx="10.3863" cy="10.1894" r="1.32574" fill="currentColor" />
              </svg>
              <span className="inline-block text-black">{t.dontHaveWallet}</span>
            </button>
          </div>
        </div>
      )}

      {/* Need Wallet Modal */}
      <NeedWalletModal
        isOpen={isNeedWalletModalOpen}
        onClose={handleNeedWalletModalClose}
      />
    </div>
  );
});

ConnectWalletModal.displayName = 'ConnectWalletModal';

export default ConnectWalletModal;
