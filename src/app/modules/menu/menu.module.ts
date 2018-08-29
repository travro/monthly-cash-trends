import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//declared features
import { MenuComponent } from './menu/menu.component';

//imported features
import { BudgetModule } from '../budget/budget.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { TrendsModule } from '../trends/trends.module';

@NgModule({
  imports: [
    BudgetModule,
    TransactionsModule,
    TrendsModule,
    CommonModule,
    RouterModule
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule { }
