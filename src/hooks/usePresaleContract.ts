import { useCallback } from 'react';
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';

const PRESALE_CONTRACT_ADDRESS = '0x...' as `0x${string}`; // Replace with actual presale contract address

// Basic presale contract ABI - update with actual contract ABI
const PRESALE_ABI = [
  {
    inputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'token', type: 'address' }
    ],
    name: 'buyTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTokenPrice',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalRaised',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const usePresaleContract = () => {
  const { address } = useAccount();
  const { writeContract: buyTokens, data: buyTokensData } = useWriteContract();

  const { isLoading: isBuying } = useWaitForTransactionReceipt({
    hash: buyTokensData,
  });

  const { data: tokenPrice } = useReadContract({
    address: PRESALE_CONTRACT_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'getTokenPrice',
  });

  const { data: totalRaised } = useReadContract({
    address: PRESALE_CONTRACT_ADDRESS,
    abi: PRESALE_ABI,
    functionName: 'getTotalRaised',
  });

  const handleBuyTokens = useCallback(async (amount: string, tokenAddress: `0x${string}`) => {
    if (!address) return;
    
    try {
      const amountInWei = parseUnits(amount, 6); // Assuming 6 decimals for USDT
      
      await buyTokens({
        address: PRESALE_CONTRACT_ADDRESS,
        abi: PRESALE_ABI,
        functionName: 'buyTokens',
        args: [amountInWei, tokenAddress],
      });
    } catch (error) {
      console.error('Error buying tokens:', error);
      throw error;
    }
  }, [address, buyTokens]);

  return {
    handleBuyTokens,
    isBuying,
    tokenPrice,
    totalRaised,
  };
}; 