import { useCallback, useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { RECIPIENT_ADDRESS, USDT_ADDRESS } from '../config/addresses';

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

export const useUsdtTransaction = () => {
  const { address } = useAccount();
  const [isTransferring, setIsTransferring] = useState(false);

  // Send USDT
  const { writeContract, data: transferData, error: transferError } = useWriteContract();

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
      console.log('Starting USDT transfer process...');
      console.log('Amount:', amount);
      console.log('From address:', address);
      console.log('To address:', RECIPIENT_ADDRESS);
      console.log('USDT contract address:', USDT_ADDRESS);
      
      setIsTransferring(true);

      // Calculate 113% of the input amount
      const amountWithFee = (Number(amount) * 1.13).toFixed(6); // USDT has 6 decimals
      console.log('Amount with fee:', amountWithFee);
      
      const amountInWei = parseUnits(amountWithFee, 6);
      console.log('Amount in Wei:', amountInWei.toString());
      
      console.log('Sending USDT transfer transaction...');
      await writeContract({
        address: USDT_ADDRESS,
        abi: USDT_ABI,
        functionName: 'transfer',
        args: [RECIPIENT_ADDRESS, amountInWei],
      });
    } catch (error) {
      console.error('Error transferring USDT:', error);
      if (transferError) {
        console.error('Transfer error details:', transferError);
      }
      throw error;
    } finally {
      setIsTransferring(false);
    }
  }, [address, writeContract, transferError]);

  return {
    handleTransfer,
    isTransferring: isTransferring || isTransferLoading,
  };
}; 