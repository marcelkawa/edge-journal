import { Trade } from '../models/trade.model';

export function calculateTotalProfitLoss(trades: Trade[]): number {
  return trades.reduce((sum, trade) => sum + trade.profitLoss, 0);
}

export function calculateWinRate(trades: Trade[]): number {
  if (trades.length === 0) return 0;

  const winningTrades = trades.filter(trade => trade.profitLoss > 0).length;
  return (winningTrades / trades.length) * 100;
}

export function calculateAverageWin(trades: Trade[]): number {
  const wins = trades.filter(trade => trade.profitLoss > 0);

  if (wins.length === 0) return 0;

  return wins.reduce((sum, trade) => sum + trade.profitLoss, 0) / wins.length;
}

export function calculateAverageLoss(trades: Trade[]): number {
  const losses = trades.filter(trade => trade.profitLoss < 0);

  if (losses.length === 0) return 0;

  return losses.reduce((sum, trade) => sum + trade.profitLoss, 0) / losses.length;
}

export function calculateProfitFactor(trades: Trade[]): number {
  const grossProfit = trades
    .filter(trade => trade.profitLoss > 0)
    .reduce((sum, trade) => sum + trade.profitLoss, 0);

  const grossLoss = Math.abs(
    trades
      .filter(trade => trade.profitLoss < 0)
      .reduce((sum, trade) => sum + trade.profitLoss, 0)
  );

  if (grossLoss === 0) return grossProfit > 0 ? grossProfit : 0;

  return grossProfit / grossLoss;
}

export function calculateAverageRiskReward(trades: Trade[]): number {
  if (trades.length === 0) return 0;

  return trades.reduce((sum, trade) => sum + trade.riskRewardRatio, 0) / trades.length;
}

export function calculateBestTrade(trades: Trade[]): number {
  if (trades.length === 0) return 0;

  return Math.max(...trades.map(trade => trade.profitLoss));
}

export function calculateWorstTrade(trades: Trade[]): number {
  if (trades.length === 0) return 0;

  return Math.min(...trades.map(trade => trade.profitLoss));
}

export function calculateEquityCurve(trades: Trade[], startingBalance = 50000): number[] {
  const sortedTrades = [...trades].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const curve: number[] = [startingBalance];

  for (const trade of sortedTrades) {
    const lastValue = curve[curve.length - 1];
    curve.push(lastValue + trade.profitLoss);
  }

  return curve;
}