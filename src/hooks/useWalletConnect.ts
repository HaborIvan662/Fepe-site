import { useState, useCallback } from 'react';
import { useConnect } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';

export const useWalletConnect = () => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const { connect, isPending, error: connectError } = useConnect();

  const connectWallet = useCallback(async (walletType: string) => {
    try {
      setSelectedWallet(walletType);
      
      switch (walletType) {
        case 'MetaMask':
          await connect({ connector: injected({ target: 'metaMask' }) });
          break;
        case 'WalletConnect':
          await connect({
            connector: walletConnect({
              projectId: '57826bfdbc6cd9752e192a296fbbd40d',
              showQrModal: true,
            }),
          });
          break;
        case 'Coinbase':
          await connect({ connector: injected({ target: 'coinbaseWallet' }) });
          break;
        default:
          throw new Error('Unsupported wallet type');
      }
    } catch (error) {
      console.error(`Failed to connect ${walletType}:`, error);
      throw error;
    } finally {
      setSelectedWallet(null);
    }
  }, [connect]);

  return {
    connectWallet,
    isPending,
    connectError,
    selectedWallet,
  };
}; 