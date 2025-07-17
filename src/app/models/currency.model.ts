export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface ConversionResult {
  from: string;
  to: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  timestamp: string;
}

export interface ConversionHistory {
  id: string;
  from: string;
  to: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  timestamp: string;
}