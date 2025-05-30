import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface PriceData {
  binancecoin: {
    usd: number;
    usdc: number;
  };
}

const CACHE_DURATION = 60000; // 1 minute cache
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const useBnbPrice = () => {
  const [bnbPrice, setBnbPrice] = useState<{ usd: number; usdc: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const cacheRef = useRef<{ data: PriceData; timestamp: number } | null>(null);
  const retryCountRef = useRef(0);

  const fetchBnbPrice = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check cache first
      if (cacheRef.current && Date.now() - cacheRef.current.timestamp < CACHE_DURATION) {
        setBnbPrice({
          usd: cacheRef.current.data.binancecoin.usd,
          usdc: cacheRef.current.data.binancecoin.usdc,
        });
        setIsLoading(false);
        return;
      }

      const response = await axios.get<PriceData>(`${COINGECKO_API}/simple/price?ids=binancecoin&vs_currencies=usd`, {
        timeout: 5000,
        validateStatus: (status) => status < 500,
      });

      if (response.status === 429) {
        const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, retryCountRef.current);
        retryCountRef.current += 1;

        if (retryCountRef.current <= MAX_RETRIES) {
          setTimeout(fetchBnbPrice, retryDelay);
          return;
        }
        throw new Error('Rate limit exceeded. Please try again in a few minutes.');
      }

      if (response.data?.binancecoin) {
        // Update cache
        cacheRef.current = {
          data: {
            binancecoin: {
              usd: response.data.binancecoin.usd,
              usdc: response.data.binancecoin.usd, // USDC is typically pegged to USD
            }
          },
          timestamp: Date.now(),
        };

        setBnbPrice({
          usd: response.data.binancecoin.usd,
          usdc: response.data.binancecoin.usd, // USDC is typically pegged to USD
        });
        retryCountRef.current = 0; // Reset retry count on success
      }
    } catch (err) {
      console.error('Error fetching BNB price:', err);
      if (axios.isAxiosError(err)) {
        if (err.code === 'ERR_NETWORK') {
          setError('Network error. Please check your internet connection.');
        } else if (err.response?.status === 429) {
          setError('Too many requests. Please try again in a few minutes.');
        } else {
          setError('Failed to fetch BNB price. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBnbPrice();
    
    // Set up polling with exponential backoff
    const pollInterval = setInterval(() => {
      fetchBnbPrice();
    }, 60000); // Poll every minute

    return () => clearInterval(pollInterval);
  }, []);

  return { bnbPrice, error, isLoading };
}; 