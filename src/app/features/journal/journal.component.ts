import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TradeService } from '../../core/services/trade.service';
import { TradeDirection } from '../../core/models/trade.model';

@Component({
  selector: 'app-journal',
  imports: [ReactiveFormsModule],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.scss',
})
export class JournalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly tradeService = inject(TradeService);

  readonly form = this.fb.nonNullable.group({
    date: [new Date().toISOString().slice(0, 10), Validators.required],
    symbol: ['EUR/USD', Validators.required],
    direction: ['long' as TradeDirection, Validators.required],
    entryPrice: [1, [Validators.required, Validators.min(0.00001)]],
    exitPrice: [1, [Validators.required, Validators.min(0.00001)]],
    positionSize: [1, [Validators.required, Validators.min(0.01)]],
    profitLoss: [0, Validators.required],
    riskRewardRatio: [1, [Validators.required, Validators.min(0)]],
    setup: ['A+ Setup', Validators.required],
    tags: ['Discipline, A+ Setup'],
    notes: [''],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.tradeService.addTrade({
      ...value,
      tags: value.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean),
    });

    this.form.patchValue({
      profitLoss: 0,
      notes: '',
    });
  }

  resetDemoData(): void {
    this.tradeService.resetDemoData();
  }
}