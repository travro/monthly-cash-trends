import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { TransactionRepositoryService } from '../../services/transaction-repository.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsComponent implements OnInit {

  private transactions: Transaction[];
  private sortParam: number = 0;


  constructor(private repo: TransactionRepositoryService) {
    this.transactions = this.repo.getAllTransactions();
  }

  ngOnInit() {

  }

  get trans(): Transaction[] {
    return this.transactions;
  }

  deleteTrans(id: number) {
    this.repo.deleteTransaction(id);
  }


}


