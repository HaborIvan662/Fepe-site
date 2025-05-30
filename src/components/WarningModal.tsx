import { useState, useEffect } from 'react';

const WarningModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 flex items-center justify-center w-full h-full">
      <div className="fixed bg-black bg-opacity-20" onClick={handleClose}></div>
      <div className="relative bg-transparent  backdrop-blur-[5px] rounded-lg p-8 w-3/5 h-1/2 mx-4 z-50">
        <div className="mb-6 flex flex-col items-center justify-between">
    
            <div className="font-semibold text-black text-[70px] text-custom-red">
              <span className="text-white drop-shadow">300%</span> guaranteed ROI on pre-sale! 🚀
            </div>
            <div className="text-lg font-bold text-red-500">
              ⚠️ Be careful about scams!
            </div>
   
        </div>
        <button
          onClick={handleClose}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default WarningModal; 