interface SwapInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: string;
  showMax?: boolean;
  selectedToken?: string;
}

const SwapInput = ({ label, value, onChange, icon, showMax, selectedToken }: SwapInputProps) => {
  const getTokenLabel = () => {
    if (selectedToken) {
      return `Pay with ${selectedToken.toUpperCase()}`;
    }
    return label;
  };

  const getTokenIcon = () => {
    if (selectedToken) {
      if(selectedToken==="ETH" || selectedToken==="BNB")      return `/assets/images/svg-icons/${selectedToken}.svg`;
      else return `/assets/images/svg-icons/${selectedToken.toLowerCase()}.svg`;
    }
    return icon;
  };

  return (
    <div className="flex flex-col justify-between gap-2">
      <label className="text-sm font-medium text-black">{getTokenLabel()}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="w-full p-3 border-[3px] border-black rounded-[16px] text-black bg-white/90"
        />
        {/* {showMax && (
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-black hover:opacity-80">
            MAX
          </button>
        )} */}
        {getTokenIcon() && (
          <img
            src={getTokenIcon()}
            alt={selectedToken?.toLowerCase() || 'token'}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-[26px]"
          />
        )}
      </div>
    </div>
  );
};

export default SwapInput; 