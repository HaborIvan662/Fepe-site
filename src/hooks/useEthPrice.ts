import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface PriceData {
  ethereum: {
    usd: number;
    usdc: number;
  };
}

const CACHE_DURATION = 60000; // 1 minute cache
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000000; // 1 second

export const useEthPrice = () => {
  const [ethPrice, setEthPrice] = useState<{ usd: number; usdc: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const cacheRef = useRef<{ data: PriceData; timestamp: number } | null>(null);
  const retryCountRef = useRef(0);

  const fetchEthPrice = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check cache first
      if (cacheRef.current && Date.now() - cacheRef.current.timestamp < CACHE_DURATION) {
        setEthPrice({
          usd: cacheRef.current.data.ethereum.usd,
          usdc: cacheRef.current.data.ethereum.usdc,
        });
        setIsLoading(false);
        return;
      }

      const response = await axios.get<PriceData>('/api/coingecko/simple/price?ids=ethereum&vs_currencies=usd,usdc', {
        timeout: 5000,
        validateStatus: (status) => status < 500,
      });

      if (response.status === 429) {
        const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, retryCountRef.current);
        retryCountRef.current += 1;

        if (retryCountRef.current <= MAX_RETRIES) {
          setTimeout(fetchEthPrice, retryDelay);
          return;
        }
        throw new Error('Rate limit exceeded. Please try again in a few minutes.');
      }

      if (response.data?.ethereum) {
        // Update cache
        cacheRef.current = {
          data: response.data,
          timestamp: Date.now(),
        };

        setEthPrice({
          usd: response.data.ethereum.usd,
          usdc: response.data.ethereum.usdc,
        });
        retryCountRef.current = 0; // Reset retry count on success
      }
    } catch (err) {
      console.error('Error fetching ETH price:', err);
      if (axios.isAxiosError(err)) {
        if (err.code === 'ERR_NETWORK') {
          setError('Network error. Please check your internet connection.');
        } else if (err.response?.status === 429) {
          setError('Too many requests. Please try again in a few minutes.');
        } else {
          setError('Failed to fetch ETH price. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEthPrice();
    
    // Set up polling with exponential backoff
    const pollInterval = setInterval(() => {
      fetchEthPrice();
    }, 60000); // Poll every minute

    return () => clearInterval(pollInterval);
  }, []);

  return { ethPrice, error, isLoading };
}; 