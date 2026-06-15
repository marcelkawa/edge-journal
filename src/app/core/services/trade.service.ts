import { Injectable, computed, signal } from '@angular/core';
import { Trade } from '../models/trade.model';
import {
  calculateAverageLoss,
  calculateAverageRiskReward,
  calculateAverageWin,
  calculateBestTrade,
  calculateEquityCurve,
  calculateProfitFactor,
  calculateTotalProfitLoss,
  calculateWinRate,
  calculateWorstTrade,
} from '../utils/analytics';

const STORAGE_KEY = 'edge-journal-trades';

const MOCK_TRADES: Trade[] = [
  {
    id: crypto.randomUUID(),
    date: '2026-06-01',
    symbol: 'EUR/USD',
    direction: 'long',
    entryPrice: 1.0823,
    exitPrice: 1.0865,
    positionSize: 1,
    profitLoss: 418,
    riskRewardRatio: 2.09,
    setup: 'Breakout',
    tags: ['A+ Setup', 'Discipline'],
    notes: 'Breakout mit Retest sauber gehandelt.',
  },
  {
    id: crypto.randomUUID(),
    date: '2026-06-02',
    symbol: 'NAS100',
    direction: 'short',
    entryPrice: 18725.6,
    exitPrice: 18512.3,
    positionSize: 1,
    profitLoss: 639,
    riskRewardRatio: 2.37,
    setup: 'Liquidity Sweep',
    tags: ['Discipline'],
    notes: 'Short nach Liquiditätsabgriff.',
  },
  {
    id: crypto.randomUUID(),
    date: '2026-06-03',
    symbol: 'XAU/USD',
    direction: 'short',
    entryPrice: 2332.1,
    exitPrice: 2325.4,
    positionSize: 1,
    profitLoss: 335,
    riskRewardRatio: 1.35,
    setup: 'Rejection',
    tags: ['A+ Setup'],
    notes: 'Rejection an Widerstand.',
  },
  {
    id: crypto.randomUUID(),
    date: '2026-06-04',
    symbol: 'GBP/JPY',
    direction: 'long',
    entryPrice: 193.45,
    exitPrice: 192.91,
    positionSize: 1,
    profitLoss: -210,
    riskRewardRatio: 1.1,
    setup: 'Trend Continuation',
    tags: ['Bad Entry'],
    notes: 'Zu spät eingestiegen.',
  },
  {
    id: crypto.randomUUID(),
    date: '2026-06-05',
    symbol: 'BTC/USD',
    direction: 'long',
    entryPrice: 68400,
    exitPrice: 69150,
    positionSize: 1,
    profitLoss: 520,
    riskRewardRatio: 1.9,
    setup: 'Momentum',
    tags: ['Trend Following'],
    notes: 'Guter Momentum-Trade.',
  },
  {
    id: crypto.randomUUID(),
    date: '2026-06-06',
    symbol: 'USD/JPY',
    direction: 'short',
    entryPrice: 155.88,
    exitPrice: 156.21,
    positionSize: 1,
    profitLoss: -160,
    riskRewardRatio: 0.8,
    setup: 'News Fade',
    tags: ['FOMO'],
    notes: 'Trade war nicht sauber geplant.',
  },
];

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private readonly startingBalance = 50000;

  private readonly tradesSignal = signal<Trade[]>(this.loadInitialTrades());

  readonly trades = this.tradesSignal.asReadonly();

  readonly totalProfitLoss = computed(() =>
    calculateTotalProfitLoss(this.tradesSignal())
  );

  readonly balance = computed(() =>
    this.startingBalance + this.totalProfitLoss()
  );

  readonly winRate = computed(() =>
    calculateWinRate(this.tradesSignal())
  );

  readonly averageWin = computed(() =>
    calculateAverageWin(this.tradesSignal())
  );

  readonly averageLoss = computed(() =>
    calculateAverageLoss(this.tradesSignal())
  );

  readonly profitFactor = computed(() =>
    calculateProfitFactor(this.tradesSignal())
  );

  readonly averageRiskReward = computed(() =>
    calculateAverageRiskReward(this.tradesSignal())
  );

  readonly bestTrade = computed(() =>
    calculateBestTrade(this.tradesSignal())
  );

  readonly worstTrade = computed(() =>
    calculateWorstTrade(this.tradesSignal())
  );

  readonly equityCurve = computed(() =>
    calculateEquityCurve(this.tradesSignal(), this.startingBalance)
  );

  addTrade(trade: Omit<Trade, 'id'>): void {
    const newTrade: Trade = {
      ...trade,
      id: crypto.randomUUID(),
    };

    this.tradesSignal.update(trades => [newTrade, ...trades]);
    this.saveTrades();
  }

  deleteTrade(id: string): void {
    this.tradesSignal.update(trades => trades.filter(trade => trade.id !== id));
    this.saveTrades();
  }

  resetDemoData(): void {
    this.tradesSignal.set(MOCK_TRADES);
    this.saveTrades();
  }

  private loadInitialTrades(): Trade[] {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return MOCK_TRADES;
    }

    try {
      return JSON.parse(stored) as Trade[];
    } catch {
      return MOCK_TRADES;
    }
  }

  private saveTrades(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tradesSignal()));
  }
}