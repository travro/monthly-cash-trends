import { Component, OnInit, OnChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Transaction } from '../../models/transaction.model';
import { CategorizerComponent } from '../categorizer/categorizer.component';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['../../../app.component.css', './transactions.component.css']
})

export class TransactionsComponent implements OnInit, OnChanges {

  private transactions: Transaction[];

  //MatDialog is the service that opens the dialog component (categorizer.component.ts) on behalf of this component
  constructor(private rest: DataService, private dialogService: MatDialog) {
    this.rest.getAllTransactions().subscribe(
      (data) => this.transactions = data
    );
  }

  ngOnInit() {
    console.log('this thing got initiated, Trav')
  }

  ngOnChanges() {
    console.log('sumtin changed, Trav')
  }

  get trans(): Transaction[] {
    return this.transactions;
  }

  openCategorizerDialog(selectedTrans: Transaction): void {

    let originalCategory: string = selectedTrans.category;
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '480px';
    dialogConfig.height = '600px';

    //Transaction data injected into the categorizer component
    dialogConfig.data = {
      applyAll: false,
      dataTransaction: selectedTrans
    }

    let dialogRef = this.dialogService.open(CategorizerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if(originalCategory != result.dataTransaction.category || result.dataTransaction.applyAll)
      if(result.applyAll){
        this.transactions.forEach((one) =>{ if(one.vendor == result.dataTransaction.vendor){ one.category = result.dataTransaction.category}})
      }      
      this.rest.updateTransaction(selectedTrans.id, result.dataTransaction.category, result.applyAll).subscribe();
    });
  }
}

