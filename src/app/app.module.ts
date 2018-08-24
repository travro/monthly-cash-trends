import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BudgetModule } from './modules/budget/budget.module';
import { TrendsModule } from './modules/trends/trends.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BudgetModule,
    TransactionsModule,
    TrendsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
