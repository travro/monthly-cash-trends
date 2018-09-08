import { Injectable } from '@angular/core';

//
import { DataService } from './data.service';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionRepositoryService {

  private transactions: Transaction[];

  constructor(private dataservice: DataService) {
    this.dataservice.getAllTransactions().subscribe(
      (data) => { this.transactions = data },
      (error) => console.log(error),
      () => console.log('Transactions received'));
  }

  getAllTransactions(): Transaction[]{
    return this.transactions;
  }

}
