import { Injectable } from '@angular/core';

//
import { DataService } from './data.service';
import { Transaction } from '../models/transaction.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionRepositoryService {

  private transactions: Transaction[];
  private categories: Category[];

  constructor(private dataservice: DataService) {
    this.dataservice.getAllTransactions().subscribe(
      (data) => {
        this.transactions = data;
        console.log('Transactions Received')
      },
      (error) => console.log(error));

    this.dataservice.getAllCategories().subscribe(
      (cats) => {
        this.categories = cats;
        console.log('Categories Received')
      },
      (error) => console.log(error));
  }

  getAllTransactions(): Transaction[] {
    return this.transactions;
  }

  getAllCategories(): string[] {
    let catsToString: string[] = this.categories.map((c) => c.category );
    return catsToString;
  }
  insertNewCategory(c:string){
    this.dataservice.insertNewCategory(c).subscribe(
      (c)=> this.categories.push(c),
      (err) => console.log(err));
  }

}
