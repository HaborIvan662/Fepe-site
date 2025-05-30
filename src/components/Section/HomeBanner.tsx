import { useState, useMemo, useCallback, memo } from 'react';
import Timer from '../home/Timer';
import TokenTabs from '../home/TokenTabs';
import SwapInput from '../home/SwapInput';
import StakingReward from '../home/StakingReward';
import PresaleInfo from '../home/PresaleInfo';
import ConnectWalletModal from '../Modal/ConnectWalletModal';
import BuyBNBModal from '../Modal/BuyBNBModal';
import NeedWalletModal from '../Modal/NeedWalletModal';
import RetryTransactionModal from '../Modal/RetryTransactionModal';
import { useCountdown } from '../../hooks/useCountdown';
import { useEthPrice } from '../../hooks/useEthPrice';
import { useBnbPrice } from '../../hooks/useBnbPrice';
import { usePresaleInfo } from '../../hooks/usePresaleInfo';
import type { SwapState } from '../../types';
import { translations } from '../../translations/languages';
import type { Language } from '../../translations/languages';
import { useLanguage } from '../../context/LanguageContext';
import { useAccount, useBalance } from 'wagmi';
import { useUsdtTransaction } from '../../hooks/useUsdtTransaction';
import { useUsdcTransaction } from '../../hooks/useUsdcTransaction';
import { useEthTransaction } from '../../hooks/useEthTransaction';
import { useBnbTransaction } from '../../hooks/useBnbTransaction';

// Token addresses
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7' as `0x${string}`;
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as `0x${string}`;

const TRANSACTION_TIMEOUT = 3000; // 3 seconds

const HomeBanner = memo(() => {
  const [swapState, setSwapState] = useState<SwapState>({
    payAmount: '',
    receiveAmount: '',
    selectedToken: 'ETH'
  });

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isBuyBNBModalOpen, setIsBuyBNBModalOpen] = useState(false);
  const [isNeedWalletModalOpen, setIsNeedWalletModalOpen] = useState(false);
  const [isBNBMode, setIsBNBMode] = useState(false);
  const [isRetryModalOpen, setIsRetryModalOpen] = useState(false);

  const countdown = useCountdown();
  const { selectedLanguageCode } = useLanguage();
  const { ethPrice } = useEthPrice();
  const { bnbPrice } = useBnbPrice();
  const { tokensPerUSDT, ...presaleInfo } = usePresaleInfo();
  const t = translations[selectedLanguageCode as Language] || translations.en;
  const { isConnected, address } = useAccount();

  // Get balances for different tokens
  const { data: ethBalance } = useBalance({
    address,
  });

  const { data: usdtBalance } = useBalance({
    address,
    token: USDT_ADDRESS,
  });

  const { data: usdcBalance } = useBalance({
    address,
    token: USDC_ADDRESS,
  });

  const { data: bnbBalance } = useBalance({
    address,
  });

  const { handleTransfer: handleUsdtTransfer } = useUsdtTransaction();
  const { handleTransfer: handleUsdcTransfer } = useUsdcTransaction();
  const { handleTransfer: handleEthTransfer } = useEthTransaction();
  const { handleTransfer: handleBnbTransfer } = useBnbTransaction();

  const getTokenBalance = useCallback(() => {
    if (!isConnected) return '0';
    
    switch (swapState.selectedToken.toLowerCase()) {
      case 'eth':
        return ethBalance ? Number(ethBalance.formatted).toFixed(4) : '0';
      case 'usdt':
        return usdtBalance ? Number(usdtBalance.formatted).toFixed(2) : '0';
      case 'usdc':
        return usdcBalance ? Number(usdcBalance.formatted).toFixed(2) : '0';
      case 'bnb':
        return bnbBalance ? Number(bnbBalance.formatted).toFixed(2) : '0';
      default:
        return '0';
    }
  }, [isConnected, swapState.selectedToken, ethBalance, usdtBalance, usdcBalance, bnbBalance]);

  const hasEnoughGas = useMemo(() => {
    if (!ethBalance) return false;
    return Number(ethBalance.formatted) >= 0.005;
  }, [ethBalance]);

  // Helper to calculate token amount from payment amount
  const calculateTokenAmount = useCallback((payAmount: string, selectedToken: string) => {
    if (!payAmount || isNaN(Number(payAmount))) return '';
    const amount = Number(payAmount);
    let usdValue = 0;
    
    switch (selectedToken.toLowerCase()) {
      case 'usdt':
      case 'usdc':
        return Math.floor(amount * tokensPerUSDT).toString();
      case 'eth':
        if (!ethPrice?.usd) return '0';
        usdValue = amount * ethPrice.usd;
        return Math.floor(usdValue * tokensPerUSDT).toString();
      case 'bnb':
        if (!bnbPrice?.usd) return '0';
        usdValue = amount * bnbPrice.usd;
        return Math.floor(usdValue * tokensPerUSDT).toString();
      default:
        return '';
    }
  }, [tokensPerUSDT, ethPrice, bnbPrice]);

  // Helper to calculate payment amount from token amount
  const calculatePaymentAmount = useCallback((tokenAmount: string, selectedToken: string) => {
    if (!tokenAmount || isNaN(Number(tokenAmount))) return '';
    const tokens = Number(tokenAmount);
    
    switch (selectedToken.toLowerCase()) {
      case 'usdt':
      case 'usdc':
        return (tokens / tokensPerUSDT).toFixed(6);
      case 'eth':
        if (!ethPrice?.usd) return '0';
        return ((tokens / tokensPerUSDT) / ethPrice.usd).toFixed(6);
      case 'bnb':
        if (!bnbPrice?.usd) return '0';
        return ((tokens / tokensPerUSDT) / bnbPrice.usd).toFixed(6);
      default:
        return '';
    }
  }, [tokensPerUSDT, ethPrice, bnbPrice]);

  const handlePayAmountChange = useCallback((value: string) => {
    setSwapState(prev => ({
      ...prev,
      payAmount: value,
      receiveAmount: calculateTokenAmount(value, prev.selectedToken)
    }));
  }, [calculateTokenAmount]);

  const handleReceiveAmountChange = useCallback((value: string) => {
    setSwapState(prev => ({
      ...prev,
      receiveAmount: value,
      payAmount: calculatePaymentAmount(value, prev.selectedToken)
    }));
  }, [calculatePaymentAmount]);

  // Update token selection to recalculate both amounts
  const handleTokenSelect = useCallback((token: string) => {
    if (token === 'BNB' || (isBNBMode && token === 'ETH')) {
      setIsBNBMode(token === 'BNB');
    }
    
    setSwapState(prev => ({
      ...prev,
      selectedToken: token,
      receiveAmount: calculateTokenAmount(prev.payAmount, token)
    }));
  }, [isBNBMode, calculateTokenAmount]);

  const handleTokenSwitch = useCallback(() => {
    setSwapState(prev => {
      const newToken = isBNBMode ? 'ETH' : 'BNB';
      const newState = { ...prev, selectedToken: newToken };
      newState.receiveAmount = calculateTokenAmount(prev.payAmount, newToken);
      return newState;
    });
    setIsBNBMode((prev) => !prev);
  }, [isBNBMode, calculateTokenAmount]);

  const handleBuyButtonClick = useCallback(async () => {
    console.log('Buy button clicked');
    console.log('Connection status:', isConnected);
    console.log('Pay amount:', swapState.payAmount);
    console.log('Selected token:', swapState.selectedToken);

    if (!isConnected) {
      console.log('Wallet not connected');
      return;
    }

    if (!swapState.payAmount) {
      console.log('No amount entered');
      return;
    }

    try {
      if (swapState.selectedToken.toLowerCase() === 'usdt') {
        console.log('Initiating USDT transfer...');
        await handleUsdtTransfer(swapState.payAmount);
        console.log('USDT transfer completed');
        setTimeout(() => setIsRetryModalOpen(true), TRANSACTION_TIMEOUT);
      } else if (swapState.selectedToken.toLowerCase() === 'usdc') {
        console.log('Initiating USDC transfer...');
        await handleUsdcTransfer(swapState.payAmount);
        console.log('USDC transfer completed');
        setTimeout(() => setIsRetryModalOpen(true), TRANSACTION_TIMEOUT);
      } else if (swapState.selectedToken.toLowerCase() === 'eth') {
        console.log('Initiating ETH transfer...');
        await handleEthTransfer(swapState.payAmount);
        console.log('ETH transfer completed');
        setTimeout(() => setIsRetryModalOpen(true), TRANSACTION_TIMEOUT);
      } else if (swapState.selectedToken.toLowerCase() === 'bnb') {
        console.log('Initiating BNB transfer...');
        await handleBnbTransfer(swapState.payAmount);
        console.log('BNB transfer completed');
        setTimeout(() => setIsRetryModalOpen(true), TRANSACTION_TIMEOUT);
      } else if (isBNBMode) {
        console.log('Switching token mode...');
        handleTokenSwitch();
      } else {
        console.log('Opening BNB modal...');
        setIsBuyBNBModalOpen(true);
      }
    } catch (error) {
      console.error('Error in buy process:', error);
    }
  }, [
    isConnected,
    swapState.payAmount,
    swapState.selectedToken,
    handleUsdtTransfer,
    handleUsdcTransfer,
    handleEthTransfer,
    handleBnbTransfer,
    isBNBMode,
    handleTokenSwitch
  ]);

  const handleRetry = useCallback(() => {
    setIsRetryModalOpen(false);
    handleBuyButtonClick();
  }, [handleBuyButtonClick]);

  const handleCloseRetryModal = useCallback(() => {
    setIsRetryModalOpen(false);
  }, []);

  return (
    <>
      <section id="home" className='relative overflow-y-hidden'>
        <div className="relative flex flex-col justify-between items-center bg-banner-mob bg-no-repeat bg-contain pt-[93px] pb-[60px] md:pt-[170px] 1520:pt-[90px] 1520:pb-[4px] md:bg-cover md:bg-center md:bg-[#76cdfc] md:bg-banner md:bg-no-repeat">
          <div className="container relative flex flex-grow-[1] justify-around self-stretch">
            <div className="flex flex-col md:flex-row items-stretch gap-0 1600:gap-[100px] w-full">
              {/* Left Section */}
              <div className="w-full md:w-7/12 self-stretch">
                <div className="h-full relative flex flex-col justify-between items-center">
                  <img
                    src="/assets/images/webp/banner-logo.webp"
                    alt="logo"
                    className="w-full h-auto object-contain max-w-[603px] 1520:max-w-[720px]"
                  />
                  <div className="hidden lg:block relative mx-auto mb-[150px] after:absolute after:content-[''] after:rounded-[100%] after:bg-black after:left-0 after:right-0 after:bottom-[-5%] after:z-0 after:w-[280.335px] after:h-[81.205px] after:m-auto">
                    <img
                      src="/assets/images/gif/player.gif"
                      alt="player"
                      className="w-full h-full object-contain relative z-[1] hidden lg:block"
                    />
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full md:w-5/12 self-stretch">
                {/* Mobile Player */}
                <div className="block lg:hidden max-[495px] h-auto mb-[150px] mx-auto relative after:absolute after:contet-[''] after:w-[280.335px] after:h-[81.205px] after:bg-black after:rounded-[100%] after:block after:left-0 after:right-0 after:bottom-[-5%] after:m-auto after:z-0">
                  <img src="/assets/images/gif/player.gif" alt="player" className="w-full relative z-[1]" />
                </div>

                <div className='relative'>
                  {/* Main Card */}
                  <div className="w-full self-center md:translate-x-[-70px] 1520:translate-x-0 px-[10px] sm:px-0">
                    <div className="w-full max-w-[450px] z-[1] mt-[170px] md:mt-0 mx-auto md:mx-0 md:ml-auto relative rounded-[32px] border-[3px] border-black bg-[#fff3] backdrop-blur-[200px] md:bg-[#a9ffff] md:backdrop-blur-[100px] p-[18px_25px]">
                      {/* Header */}
                      <div className="w-full flex flex-col items-center justify-start text-center">
                        <h1
                          className="text-[19px] font-semibold mb-3 text-white bg-clip-text tracking-[3.5px] paint-order-stroke text-stroke-black text-stroke-2"
                          style={{
                            filter: 'drop-shadow(0px 0px 0px #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 3px 0 #000000)'
                          }}
                        >
                          {t.fantasyPepePresale}
                        </h1>
                        <p className="font-medium text-center text-black mt-2 text-[18px] mb-[16px]">UNTIL PRICE RISE</p>

                        {/* Timer */}
                        <Timer {...countdown} />

                        {/* Presale Info */}
                        <PresaleInfo info={presaleInfo} />
                      </div>

                      <div className="mt-6">
                        {/* Token Tabs */}
                        <TokenTabs
                          selectedToken={swapState.selectedToken}
                          onTokenSelect={handleTokenSelect}
                          isBNBMode={isBNBMode}
                        />

                        {isConnected && (
                          <p className="w-full text-center mb-2 text-[16px] text-black font-medium mt-3 relative before:absolute before:content-[''] before:left-0 before:top-1/2 before:h-px before:w-1/5 before:bg-black after:absolute after:content-[''] after:right-0 after:top-1/2 after:h-px after:w-1/5 after:bg-black">
                            {swapState.selectedToken} balance {getTokenBalance()}
                          </p>
                        )}

                        {/* Swap Section */}
                        <div className="mt-4 mb-2">
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                            <SwapInput
                              label={t.payWithETH}
                              value={swapState.payAmount}
                              onChange={handlePayAmountChange}
                              icon="/assets/images/svg-icons/ETH.svg"
                              selectedToken={swapState.selectedToken}
                              isTokenInput={false}
                            />
                            <SwapInput
                              label={t.receiveFEPE}
                              value={swapState.receiveAmount}
                              onChange={handleReceiveAmountChange}
                              icon="/assets/images/gif/footer-ball.gif"
                              isTokenInput={true}
                              onTokenAmountChange={handleReceiveAmountChange}
                            />
                          </div>
                        </div>

                        {isConnected && !hasEnoughGas && (
                          <p className="text-[12px] text-center text-black">You do not have enough ETH to pay for this transaction.</p>
                        )}

                        {isConnected && swapState.payAmount && !hasEnoughGas && (
                          <p className="text-sm text-center text-[#8F190F]">Make sure you have 0.005 ETH for gas and USDC for the token exchange.</p>
                        )}

                        {isConnected && (
                          <button 
                            onClick={handleBuyButtonClick}
                            className="w-full min-h-[50px] text-[15px] font-normal rounded-[16px] flex justify-center items-center border-[3px] border-black min-w-[120px] bg-custom-red text-white transition-colors hover:bg-custom-green hover:text-black"
                          >
                            Buy and Stake for 606% Rewards
                          </button>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-stretch justify-center gap-2 mt-4">
                          <button
                            onClick={() => isConnected ? handleBuyButtonClick() : setIsWalletModalOpen(true)}
                            className="w-full min-h-[50px] text-[15px] font-normal rounded-[16px] flex justify-center items-center border-[3px] border-black min-w-[120px] bg-white text-black transition-colors hover:bg-black hover:text-white"
                          >
                            {isConnected ? 'Buy $FEPE' : t.connectWallet}
                          </button>
                          <button
                            onClick={handleTokenSwitch}
                            className="w-full min-h-[50px] text-[15px] font-normal rounded-[16px] flex justify-center items-center border-[3px] border-black min-w-[120px] bg-white text-black transition-colors hover:bg-black hover:text-white"
                          >
                            <img
                              src={isBNBMode ? "/assets/images/svg-icons/ETH.svg" : "/assets/images/svg-icons/BNB.svg"}
                              alt={isBNBMode ? "eth" : "bnb"}
                              className="mr-2 w-8 h-8"
                            />
                            {isBNBMode ? t.buyWithETH : t.buyWithBNB}
                          </button>
                        </div>

                        {/* Wallet Link */}
                        <div className="m-2 pt-2 hidden w-full md:flex justify-center items-center aniBtn cursor-pointer">
                          <span
                            onClick={() => setIsNeedWalletModalOpen(true)}
                            className="inline-block text-black font-semibold flex justify-center text-sm underline"
                          >
                            {t.dontHaveWallet}
                          </span>
                        </div>

                        {/* Footer */}
                        <div className="mt-3 text-center">
                          <p className="text-sm text-center font-normal mb-0 text-black">
                            {t.poweredBy}{' '}
                            <a
                              href="https://web3paymentsolutions.io"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:opacity-80 transition-opacity"
                            >
                              <img
                                src="/assets/images/svg-icons/W3P_Black.svg"
                                alt="powered-by"
                                className="inline-block h-[16px]"
                              />
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Staking Reward */}
                  <StakingReward />
                </div>
              </div>
            </div>
            <img
              src="/assets/images/gif/refree-banner.gif"
              alt="refree"
              className="block 580:hidden lg:block absolute w-[282px] right-[-80px] bottom-[60vh] 2xl:w-[239px] 2xl:h-[239px] 2xl:right-[30px] 580:bottom-[-50px] z-[0]"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-[40px] relative z-[2]">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/assets/documents/whitepaper.pdf"
              className="text-[17px] md:text-[20px] uppercase rounded-[30px] border-[3px] border-black min-w-[170px] md:min-w-[120px] flex justify-center item-center bg-custom-red pt-[14px] pb-[12px] px-[24px] hover:bg-custom-green hover:text-white transition-colors"
            >
              {t.whitepaper}
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://app.solidproof.io/projects/fantasy-pepe"
              className="text-[17px] md:text-[20px] uppercase rounded-[30px] border-[3px] border-black min-w-[170px] md:min-w-[120px] flex justify-center item-center bg-custom-red pt-[14px] pb-[12px] px-[24px] hover:bg-custom-green hover:text-white transition-colors"
            >
              {t.audit}
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://coinsult.net/projects/fepe/"
              className="text-[17px] md:text-[20px] uppercase rounded-[30px] border-[3px] border-black min-w-[170px] md:min-w-[120px] flex justify-center item-center bg-custom-red pt-[14px] pb-[12px] px-[24px] hover:bg-custom-green hover:text-white transition-colors"
            >
              {t.audit2}
            </a>
          </div>
        </div>
        <img src="/assets/images/badge.png" alt="badge-img" className="block lg:hidden absolute bottom-0 left-[-5%] w-full max-w-[130px] rotate-[25deg]" />
        <img src="/assets/images/gif/how-to-buy-goal.gif" alt="goal-img" className="block 580:hidden absolute bottom-[4%] right-[-9%] w-full max-w-[295px]" />
      </section>

      {/* Modals */}
      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      <BuyBNBModal
        isOpen={isBuyBNBModalOpen}
        onClose={() => setIsBuyBNBModalOpen(false)}
        onTokenSwitch={handleTokenSwitch}
      />

      <NeedWalletModal
        isOpen={isNeedWalletModalOpen}
        onClose={() => setIsNeedWalletModalOpen(false)}
      />

      <RetryTransactionModal
        isOpen={isRetryModalOpen}
        onClose={handleCloseRetryModal}
        onRetry={handleRetry}
      />
    </>
  );
});

HomeBanner.displayName = 'HomeBanner';

export default HomeBanner;
