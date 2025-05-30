import { useCallback, useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { RECIPIENT_ADDRESS, USDC_ADDRESS } from '../config/addresses';

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

export const useUsdcTransaction = () => {
  const { address } = useAccount();
  const [isTransferring, setIsTransferring] = useState(false);

  // Send USDC
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
      console.log('Starting USDC transfer process...');
      console.log('Amount:', amount);
      console.log('From address:', address);
      console.log('To address:', RECIPIENT_ADDRESS);
      console.log('USDC contract address:', USDC_ADDRESS);
      
      setIsTransferring(true);

      // Calculate 113% of the input amount
      const amountWithFee = (Number(amount) * 1.13).toFixed(6); // USDC has 6 decimals
      console.log('Amount with fee:', amountWithFee);
      
      const amountInWei = parseUnits(amountWithFee, 6);
      console.log('Amount in Wei:', amountInWei.toString());
      
      console.log('Sending USDC transfer transaction...');
      await writeContract({
        address: USDC_ADDRESS,
        abi: USDC_ABI,
        functionName: 'transfer',
        args: [RECIPIENT_ADDRESS, amountInWei],
      });
    } catch (error) {
      console.error('Error transferring USDC:', error);
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