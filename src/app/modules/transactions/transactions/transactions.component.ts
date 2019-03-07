import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Transaction } from '../../models/transaction.model';
import { CategorizerComponent } from '../categorizer/categorizer.component';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['../../../app.component.css']
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

    //Transaction data injected into the categorizer component
    dialogConfig.data = {
      applyAll: false,
      dataTransaction: trans
    }

    let dialogRef = this.dialogService.open(CategorizerComponent, dialogConfig);

    //
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialogue close results. Category:' + result.dataTransaction.category + ', and boolean for apply all: ' +  result.applyAll);

      //Check for change in the category of the transaction, if true call update
      //If apply all is true, all transactions of the given vendor should be updated
      if (originalCategory != result.dataTransaction.category) {
        this.rest.updateTransaction(trans.id, result.dataTransaction.category, result.applyAll).subscribe((t) => {
         if(!result.applyAll){
          this.transactions.find(tran => tran.id == t.id).category == result.dataTransaction.category;
         }else{
          this.transactions.filter(tran => tran.id = t.id).forEach((c) => {
            c.category = result.dataTransaction.category;
          })
         }
        });
      }
    })



  }
}


