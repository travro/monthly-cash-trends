import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Transaction } from '../../models/transaction.model';
import { CategorizerComponent } from '../categorizer/categorizer.component';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['../../../app.component.css', './transactions.component.css']
})

export class TransactionsComponent implements OnInit {

  private transactions: Transaction[];

  //MatDialog is the service that opens the dialog component (categorizer.component.ts) on behalf of this component
  constructor(private dataService: DataService, private dialogService: MatDialog) {
    this.dataService.getAllTransactions().subscribe((data) => this.transactions = data);
  }

  ngOnInit() {
    console.log('this thing got initiated, Trav')
  }

  get trans(): Transaction[] {
    return this.transactions;
  }

  //TOFIX -- code is calling PUT request even without changes
  openCategorizerDialog(selectedTrans: Transaction): void {

    let openingCategory: string = selectedTrans.category;
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '480px';
    dialogConfig.height = '600px';

    //Transaction data injected into the categorizer component
    dialogConfig.data = {
      applyAll: false,
      dataTransaction: selectedTrans
    }

    let dialogRef = this.dialogService.open(CategorizerComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((result) => {
        if (openingCategory != result.dataTransaction.category || result.dataTransaction.applyAll) {
          if (result.dataTransaction.applyAll) {
            this.transactions.forEach((element) => { if (element.vendor == result.dataTransaction.vendor) { element.category = result.dataTransaction.category } })
          }
          this.dataService.updateTransaction(selectedTrans.id, result.dataTransaction.category, result.applyAll).subscribe();
        }
      });
  }
}

