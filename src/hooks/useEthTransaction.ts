import { useCallback, useState } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { RECIPIENT_ADDRESS } from '../config/addresses';

export interface TransactionState {
  handleTransfer: (amount: string) => Promise<void>;
  isTransferring: boolean;
  isSuccess: boolean;
  hash: `0x${string}` | null;
}

export const useEthTransaction = (): TransactionState => {
  const { address } = useAccount();
  const [isTransferring, setIsTransferring] = useState(false);

  // Send ETH
  const { sendTransactionAsync, data: hash } = useSendTransaction();

  // Wait for transfer transaction
  const { isLoading: isTransferLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleTransfer = useCallback(async (amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    try {
      setIsTransferring(true);
      await sendTransactionAsync({
        to: RECIPIENT_ADDRESS,
        value: parseEther(amount),
      });
    } catch (error) {
      console.error('Transfer error:', error);
      throw error;
    } finally {
      setIsTransferring(false);
    }
  }, [address, sendTransactionAsync]);

  return {
    handleTransfer,
    isTransferring: isTransferring || isTransferLoading,
    isSuccess: !!isSuccess,
    hash: hash || null,
  };
}; 