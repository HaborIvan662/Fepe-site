import { useMemo } from 'react';

export const usePresaleInfo = () => {
  const presaleInfo = useMemo(() => {
    const price = 0.000384; // Remove $ and convert to number
    const tokensPerUSDT = Math.floor(1 / price); // Calculate how many tokens per 1 USDT

    return {
      raised: '$549,635.72',
      // total: '851,721',
      // progress: 62.8143,
      price: `$${price}`,
      tokensPerUSDT
    };
  }, []);

  return presaleInfo;
}; 