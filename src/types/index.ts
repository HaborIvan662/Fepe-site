export interface Token {
  symbol: string;
  name: string;
  icon: string;
}

export interface TimeUnit {
  value: string;
  label: string;
}

export interface SwapState {
  payAmount: string;
  receiveAmount: string;
  selectedToken: string;
}

export interface PresaleInfo {
  raised: string;
  total: string;
  progress: number;
  price: string;
} 