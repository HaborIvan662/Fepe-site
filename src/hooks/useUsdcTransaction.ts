import { useCallback, useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { RECIPIENT_ADDRESS, USDC_ADDRESS } from '../config/addresses';
import type { TransactionState } from './useEthTransaction';

const USDC_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
  }
] as const;

export const useUsdcTransaction = (): TransactionState => {
  const { address } = useAccount();
  const [isTransferring, setIsTransferring] = useState(false);

  // Send USDC
  const { writeContractAsync, data: hash } = useWriteContract();

  // Wait for transfer transaction
  const { isLoading: isTransferLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleTransfer = useCallback(async (amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    try {
      setIsTransferring(true);
      await writeContractAsync({
        address: USDC_ADDRESS,
        abi: USDC_ABI,
        functionName: 'transfer',
        args: [RECIPIENT_ADDRESS, parseUnits(amount, 6)], // USDC uses 6 decimals
      });
    } catch (error) {
      console.error('Transfer error:', error);
      throw error;
    } finally {
      setIsTransferring(false);
    }
  }, [address, writeContractAsync]);

  return {
    handleTransfer,
    isTransferring: isTransferring || isTransferLoading,
    isSuccess: !!isSuccess,
    hash: hash || null,
  };
}; 