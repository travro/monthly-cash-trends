import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Transaction } from '../../models/transaction.model';
import { TransactionRepositoryService } from '../../services/transaction-repository.service';
import { CategorizerComponent } from '../categorizer/categorizer.component';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsComponent implements OnInit {

  private transactions: Transaction[];

  //MatDialog is the service that opens the dialog component (categorizer.component.ts) on behalf of this component
  constructor(
    private repo: TransactionRepositoryService,
    private dialogService: MatDialog) {
    this.transactions = this.repo.getAllTransactions();
  }

  ngOnInit() {

  }

  get trans(): Transaction[] {
    return this.transactions;
  }

  openCategorizerDialog(): void {

    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '480px';
    dialogConfig.height = '600px';
    dialogConfig.data = { name: "Good job Travis" };

    let dialogRef = this.dialogService.open(CategorizerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) =>{
      console.log(result);
    })
  }


}


