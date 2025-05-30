import React, { useState, useCallback } from "react";
import TokenTabs from "./TokenTabs";
import { useAccount } from 'wagmi';
import { useUsdtTransaction } from '../../hooks/useUsdtTransaction';
import { useUsdcTransaction } from '../../hooks/useUsdcTransaction';
import { useEthTransaction } from '../../hooks/useEthTransaction';
import { useBnbTransaction } from '../../hooks/useBnbTransaction';
import type { Hash } from 'viem';
import { useEthPrice } from '../../hooks/useEthPrice';
import { useBnbPrice } from '../../hooks/useBnbPrice';
import { usePresaleInfo } from '../../hooks/usePresaleInfo';

const HomeBanner = () => {
  const [selectedToken, setSelectedToken] = useState("ETH");
  const [isBNBMode, setIsBNBMode] = useState(false);
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [purchasedAmount, setPurchasedAmount] = useState("0");
  const { isConnected } = useAccount();

  const { ethPrice } = useEthPrice();
  const { bnbPrice } = useBnbPrice();
  const { tokensPerUSDT } = usePresaleInfo();

  const { handleTransfer: handleUsdtTransfer, isTransferring: isUsdtTransferring } = useUsdtTransaction();
  const { handleTransfer: handleUsdcTransfer, isTransferring: isUsdcTransferring } = useUsdcTransaction();
  const { handleTransfer: handleEthTransfer, isTransferring: isEthTransferring } = useEthTransaction();
  const { handleTransfer: handleBnbTransfer, isTransferring: isBnbTransferring } = useBnbTransaction();

  const handleTokenSelect = (token: string) => {
    setSelectedToken(token);
  };

  const handleBNBModeToggle = () => {
    setIsBNBMode(!isBNBMode);
    setSelectedToken(isBNBMode ? "ETH" : "BNB");
  };

  const calculateTokenAmount = useCallback((paymentAmount: string, token: string) => {
    if (!paymentAmount || isNaN(Number(paymentAmount))) return "0";
    
    const amount = Number(paymentAmount);
    let usdValue = 0;

    switch (token.toLowerCase()) {
      case 'usdt':
      case 'usdc':
        return (amount * tokensPerUSDT).toString();
      case 'eth':
        if (!ethPrice?.usd) return "0";
        usdValue = amount * ethPrice.usd;
        return (Math.floor(usdValue * tokensPerUSDT)).toString();
      case 'bnb':
        if (!bnbPrice?.usd) return "0";
        usdValue = amount * bnbPrice.usd;
        return (Math.floor(usdValue * tokensPerUSDT)).toString();
      default:
        return "0";
    }
  }, [tokensPerUSDT, ethPrice, bnbPrice]);

  const handlePayment = useCallback(async () => {
    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      switch (selectedToken) {
        case "USDT":
          await handleUsdtTransfer(amount);
          break;
        case "USDC":
          await handleUsdcTransfer(amount);
          break;
        case "ETH":
          await handleEthTransfer(amount);
          break;
        case "BNB":
          await handleBnbTransfer(amount);
          break;
        default:
          throw new Error("Unsupported token");
      }

      // Calculate new token amount based on the payment
      const newTokens = calculateTokenAmount(amount, selectedToken);
      const totalTokens = (parseFloat(purchasedAmount) + parseFloat(newTokens)).toString();
      setPurchasedAmount(totalTokens);
      
      // Clear input
      setAmount("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transaction failed");
    } finally {
      setIsLoading(false);
    }
  }, [amount, selectedToken, isConnected, purchasedAmount, handleUsdtTransfer, handleUsdcTransfer, handleEthTransfer, handleBnbTransfer, calculateTokenAmount]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[600px] mx-auto p-4">
      <div className="w-full bg-white rounded-[10px] p-6 shadow-lg">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Swap</h2>
            <button
              onClick={handleBNBModeToggle}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isBNBMode ? "Switch to ETH" : "Switch to BNB"}
            </button>
          </div>
          
          <TokenTabs 
            selectedToken={selectedToken} 
            onTokenSelect={handleTokenSelect}
            isBNBMode={isBNBMode}
          />

          {/* Payment button */}
          <button
            onClick={handlePayment}
            disabled={isLoading || !amount || !isConnected}
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {isLoading ? "Processing..." : "Pay"}
          </button>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner; 