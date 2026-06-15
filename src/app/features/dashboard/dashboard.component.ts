import { Component, computed, inject } from '@angular/core';
import { DecimalPipe, CurrencyPipe } from '@angular/common';
import { TradeService } from '../../core/services/trade.service';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [KpiCardComponent, DecimalPipe, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly tradeService = inject(TradeService);

  readonly trades = this.tradeService.trades;
  readonly balance = this.tradeService.balance;
  readonly equityCurve = this.tradeService.equityCurve;

  readonly totalProfitLoss = this.tradeService.totalProfitLoss;
  readonly winRate = this.tradeService.winRate;
  readonly averageWin = this.tradeService.averageWin;
  readonly averageLoss = this.tradeService.averageLoss;
  readonly profitFactor = this.tradeService.profitFactor;
  readonly averageRiskReward = this.tradeService.averageRiskReward;
  readonly bestTrade = this.tradeService.bestTrade;
  readonly worstTrade = this.tradeService.worstTrade;

  readonly recentTrades = computed(() => this.trades().slice(0, 5));

  readonly equityPolyline = computed(() => {
    const values = this.equityCurve();
    const width = 760;
    const height = 260;
    const padding = 20;

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    return values.map((value, index) => {
      const x = padding + (index / (values.length - 1)) * (width - padding * 2);
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    }).join(' ');
  });
}