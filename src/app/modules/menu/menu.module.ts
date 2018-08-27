import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//declared features
import { MenuComponent } from './menu/menu.component';

//imported features
import { BudgetComponent } from '../budget/budget/budget.component';
import { TransactionsComponent } from '../transactions/transactions/transactions.component';
import { TrendsComponent } from '../trends/trends/trends.component';
import { BudgetModule } from '../budget/budget.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { TrendsModule } from '../trends/trends.module';

@NgModule({
  imports: [
    BudgetModule,
    TransactionsModule,
    TrendsModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'budget', component: BudgetComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'trends', component: TrendsComponent }
    ])
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule { }
