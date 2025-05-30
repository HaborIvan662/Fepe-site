import { useCallback, useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { RECIPIENT_ADDRESS, USDT_ADDRESS } from '../config/addresses';
import type { TransactionState } from './useEthTransaction';

const USDT_ABI = [
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

export const useUsdtTransaction = (): TransactionState => {
  const { address } = useAccount();
  const [isTransferring, setIsTransferring] = useState(false);

  // Send USDT
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
        address: USDT_ADDRESS,
        abi: USDT_ABI,
        functionName: 'transfer',
        args: [RECIPIENT_ADDRESS, parseUnits(amount, 6)], // USDT uses 6 decimals
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