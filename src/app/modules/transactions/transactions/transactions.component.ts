import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Transaction } from '../../../models/transaction.model';
import { CategorizerComponent } from '../categorizer/categorizer.component';
import { DataService } from '../../../services/data.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['../../../app.component.css', './transactions.component.css']
})

export class TransactionsComponent implements OnInit {

  private transactions: Transaction[];

  // MatDialog is the service that opens the dialog component (categorizer.component.ts) on behalf of this component
  constructor(private dataService: DataService, private dialogService: MatDialog) {
    this.dataService.getAllTransactions().subscribe((data) => this.transactions = data);
  }

  ngOnInit() {
    console.log('this thing got initiated, Trav')
  }

  get trans(): Transaction[] {
    return this.transactions;
  }

  // TOFIX -- code is calling PUT request even without changes
  openCategorizerDialog(selectedTrans: Transaction): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '480px';
    dialogConfig.height = '600px';

    // Transaction data injected into the categorizer component
    dialogConfig.data = {
      applyAll: false,
      dataTransaction: selectedTrans
    }

    const dialogRef = this.dialogService.open(CategorizerComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((result) => {
        console.log('How transaction read result:' + result.applyAll);
        // check if there was a change in category or an application to all vendors of the current category
        if (selectedTrans.category !== result.dataTransaction.category || result.applyAll) {
          if (result.applyAll) {
            this.transactions.forEach((element: Transaction) => {
              if (element.vendor === result.dataTransaction.vendor) {
                element.category = result.dataTransaction.category;
              }
            });
          }
          this.dataService
            .updateTransaction(selectedTrans.id, result.dataTransaction.category, result.applyAll)
            .subscribe();
        }
      });
  }
}

