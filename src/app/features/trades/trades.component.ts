import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TradeService } from '../../core/services/trade.service';

@Component({
  selector: 'app-trades',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './trades.component.html',
  styleUrl: './trades.component.scss',
})
export class TradesComponent {
  private readonly tradeService = inject(TradeService);

  readonly searchTerm = signal('');

  readonly trades = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    if (!term) {
      return this.tradeService.trades();
    }

    return this.tradeService.trades().filter(trade => {
      return [
        trade.symbol,
        trade.direction,
        trade.setup,
        trade.notes,
        ...trade.tags,
      ].some(value => value.toLowerCase().includes(term));
    });
  });

  deleteTrade(id: string): void {
    this.tradeService.deleteTrade(id);
  }

  updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }
}