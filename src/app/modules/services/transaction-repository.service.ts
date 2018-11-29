import { Injectable } from '@angular/core';

//
import { DataService } from './data.service';
import { Transaction } from '../models/transaction.model';
import { Category } from '../models/category.model';
import { Observable, from } from 'rxjs';

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
        console.log('Categories Received');
      },
      (error) => console.log(error));
  }

  getAllTransactions(): Observable<Transaction[]> {
    return from([this.transactions]);
  }

  /**
   * If reinstating this class remember to subscribe the categorizer component to
   * this data
   */
  getAllCategories(): Observable<Category[]> {
    return from([this.categories]);
  }

  insertNewCategory(c: string) {
    this.dataservice.insertNewCategory(c).subscribe(
      (c) => this.categories.push(c),
      (err) => console.log(err));
  }

  deleteCategory(categoryName: string) {
    let categoryToDelete: Category = this.categories.find((index) => index.category == categoryName);
    this.dataservice.deleteCategory(categoryToDelete.id).subscribe((category) => {
      this.categories.splice(this.categories.findIndex((i) => i.id == category.id), 1)
    });
  }

}
