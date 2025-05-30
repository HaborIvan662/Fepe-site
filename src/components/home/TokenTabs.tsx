interface TokenTabsProps {
  selectedToken: string;
  onTokenSelect: (token: string) => void;
  isBNBMode?: boolean;
}

const TokenTabs = ({ selectedToken, onTokenSelect, isBNBMode = false }: TokenTabsProps) => {
  
  const tokens = isBNBMode ? ["BNB", "usdt", "usdc", "card"] : ["ETH", "usdt", "usdc", "card"];

  return (
    <div className="flex justify-center items-center w-full rounded-[10px]">
      {tokens.map((token, i) => (
        <button 
          key={token} 
          onClick={() => onTokenSelect(token)}
          className={`flex items-center justify-center gap-2 min-w-[100px] h-[45px] p-[6px] border-[3px] border-black border-l-0 font-medium transition-colors
            ${i === 0 ? 'rounded-l-[8px] border-l-[3px]' : ''}
            ${i === tokens.length - 1 ? 'rounded-r-[8px]' : ''}
            ${token === selectedToken ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
          <img 
            src={`/assets/images/svg-icons/${token}.svg`} 
            alt={token} 
            className="h-[26px]"
          />
          <span className="font-semibold">{token.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
};

export default TokenTabs; 