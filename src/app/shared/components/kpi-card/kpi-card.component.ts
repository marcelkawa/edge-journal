import { Component, input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  imports: [],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
})
export class KpiCardComponent {
  label = input.required<string>();
  value = input.required<string>();
  change = input<string>();
  trend = input<'up' | 'down' | 'neutral'>('neutral');
}