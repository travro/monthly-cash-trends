import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Transaction } from '../../models/transaction.model';
import { CategorizerComponent } from '../categorizer/categorizer.component';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsComponent implements OnInit {

  private transactions: Transaction[];

  //MatDialog is the service that opens the dialog component (categorizer.component.ts) on behalf of this component
  constructor(
    private rest: DataService,
    private dialogService: MatDialog) {
    this.rest.getAllTransactions().subscribe(
      (data) => this.transactions = data
    );
  }

  ngOnInit() {

  }

  get trans(): Transaction[] {
    return this.transactions;
  }

  openCategorizerDialog(trans: Transaction): void {

    let originalCategory: string = trans.category;
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '480px';
    dialogConfig.height = '600px';
    dialogConfig.data = trans;

    let dialogRef = this.dialogService.open(CategorizerComponent, dialogConfig);

    //
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialogue close results: ' + result.category);

      //check for change in the category of the transaction, if true call update
      if (originalCategory != result.category) {
        this.rest.updateTransaction(trans.id, result.category).subscribe((t) => {
          this.transactions.find(tran => tran.id == t.id).category == result.category;
        });
      }
    })



  }
}


