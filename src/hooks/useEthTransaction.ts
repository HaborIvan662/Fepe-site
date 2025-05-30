import { useCallback, useState, useEffect } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { RECIPIENT_ADDRESS } from '../config/addresses';

export const useEthTransaction = () => {
  const { address } = useAccount();
  const [isTransferring, setIsTransferring] = useState(false);

  // Send ETH
  const { sendTransaction, data: transferData, error: transferError } = useSendTransaction();

  // Wait for transfer transaction
  const { isLoading: isTransferLoading } = useWaitForTransactionReceipt({
    hash: transferData,
  });

  useEffect(() => {
    if (transferData) {
      console.log('Transfer transaction hash:', transferData);
    }
  }, [transferData]);

  useEffect(() => {
    if (transferError) {
      console.error('Wagmi transfer error:', transferError);
    }
  }, [transferError]);

  const handleTransfer = useCallback(async (amount: string) => {
    if (!address) {
      console.error('No wallet address found');
      return;
    }
    
    try {
      console.log('Starting ETH transfer process...');
      console.log('Amount:', amount);
      console.log('From address:', address);
      console.log('To address:', RECIPIENT_ADDRESS);
      
      setIsTransferring(true);

      // Calculate 113% of the input amount
      const amountWithFee = (Number(amount) * 1.13).toFixed(18); // ETH has 18 decimals
      console.log('Amount with fee:', amountWithFee);
      
      const amountInWei = parseEther(amountWithFee);
      console.log('Amount in Wei:', amountInWei.toString());
      
      console.log('Sending ETH transfer transaction...');
      await sendTransaction({
        to: RECIPIENT_ADDRESS,
        value: amountInWei,
      });
    } catch (error) {
      console.error('Error transferring ETH:', error);
      if (transferError) {
        console.error('Transfer error details:', transferError);
      }
      throw error;
    } finally {
      setIsTransferring(false);
    }
  }, [address, sendTransaction, transferError]);

  return {
    handleTransfer,
    isTransferring: isTransferring || isTransferLoading,
  };
}; 