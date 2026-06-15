export type TradeDirection = 'long' | 'short';

export interface Trade {
  id: string;
  date: string;
  symbol: string;
  direction: TradeDirection;
  entryPrice: number;
  exitPrice: number;
  positionSize: number;
  profitLoss: number;
  riskRewardRatio: number;
  setup: string;
  tags: string[];
  notes: string;
}

export interface KpiMetric {
  label: string;
  value: string;
  change?: string;
  trend: 'up' | 'down' | 'neutral';
}