import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
//
import { Transaction } from '../models/transaction.model';
import { Category } from '../models/category.model';
import { Budget } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  //https://5b82c6892fd7f2001417916a.mockapi.io/mock
  //
  baseUrl: string = 'http://localhost:3500/';

  constructor(private http: HttpClient) { }

  getBudget(): Observable<Budget[]>{
    return this.http.get<Budget[]>(this.baseUrl + 'budget');
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl + 'transactions');
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'categories');
  }

  /**
   *
   * @param newCat: string entry of the new category
   *
   *
   */
  insertNewCategory(newCat: string): Observable<Category> {
    return this.http.post<Category>(this.baseUrl + `categories/insert/${newCat}`, newCat, {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      })
    })
  }
  /**
   *
   * @param id: id of category to be deleted from database
   */
  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(this.baseUrl + `categories/delete/${id}`);
  }

  /**
   *
   * @param transId id of the transaction being updated
   * @param catId id of the new category for the transaction
   * @param applyAll boolean value, if true, update all transactions of the given id
   */
  updateTransaction(transId: number, category: string, applyAll: boolean): Observable<void> {
    let route : string = (applyAll)? 'all' : 'one';
    return this.http.put<void>(this.baseUrl + `transactions/update-${route}/${transId}`, category);
  }

}











