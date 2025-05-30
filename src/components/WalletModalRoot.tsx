import React from 'react';
import ConnectWalletModal from './Modal/ConnectWalletModal';
import { useWalletModal } from '../context/WalletModalContext';

const WalletModalRoot: React.FC = () => {
  const { isWalletModalOpen, closeWalletModal } = useWalletModal();

  return (
    <ConnectWalletModal
      isOpen={isWalletModalOpen}
      onClose={closeWalletModal}
    />
  );
};

export default WalletModalRoot; 