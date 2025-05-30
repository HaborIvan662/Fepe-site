import type { FC } from 'react';

interface ClaimNotLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClaimNotLiveModal: FC<ClaimNotLiveModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-[16px] border-[3px] border-black w-[90%] max-w-[400px]">
        <h2 className="text-[24px] font-bold mb-4">Claim Not Live</h2>
        <p className="mb-4">Claiming rewards is not yet live. Please check back later.</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-custom-red text-white border-[3px] border-black rounded-[16px] hover:bg-custom-green hover:text-black"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimNotLiveModal; 