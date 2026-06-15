import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { JournalComponent } from './features/journal/journal.component';
import { TradesComponent } from './features/trades/trades.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'journal',
        component: JournalComponent,
      },
      {
        path: 'trades',
        component: TradesComponent,
      },
    ],
  },
];