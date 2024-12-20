export enum MarketStatus {
  OPEN = "open",
  CLOSED = "closed",
}

export type Stock = {
  symbol: string;
  companyName: string;
  currentPrice: number;
  percentageChange: number;
  marketStatus: MarketStatus;
  historicalData: {
    date: string;
    price: number;
  }[];
  volume: number;
  high: number;
  low: number;
}

export const MAX_DISPLAYED = 5;
