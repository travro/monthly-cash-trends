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
      () => console.log('got it'));
  }

  getAllTransactions(): Transaction[]{
    return this.transactions;
  }

  deleteTransaction(id: number){
    this.dataservice.deleteTransactions(id).subscribe(
      (data : Transaction) => {
        console.log(data.vendor + 'was deleted')
        this.transactions.splice(this.transactions.findIndex(i => i.id == data.id), 1);
      }
    );
  }
}
