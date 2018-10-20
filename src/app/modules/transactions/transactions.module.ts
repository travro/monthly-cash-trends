import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions/transactions.component';
import { CategorizerComponent } from './categorizer/categorizer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TransactionsComponent, CategorizerComponent],
  exports: [TransactionsComponent]
})
export class TransactionsModule { }
