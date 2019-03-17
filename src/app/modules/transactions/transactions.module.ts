// Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material';

// Declarations
import { TransactionsComponent } from './transactions/transactions.component';
import { CategorizerComponent } from './categorizer/categorizer.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  declarations: [TransactionsComponent, CategorizerComponent],
  exports: [TransactionsComponent],

  // Entry components alerts angular to - in this module - as to what components to use as modals
  entryComponents: [CategorizerComponent]

})
export class TransactionsModule { }
