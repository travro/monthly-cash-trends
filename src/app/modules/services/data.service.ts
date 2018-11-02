import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
//
import { Transaction } from '../models/transaction.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  //https://5b82c6892fd7f2001417916a.mockapi.io/mock
  //
  baseUrl: string = 'http://localhost:3500/';

  constructor(private http: HttpClient) { }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'categories');
  }

  /**
   *
   * @param newCat
   *
   *
   */
  insertNewCategory(newCat: string): Observable<Category> {
    return this.http.post<Category>(this.baseUrl + `categories/${newCat}`, newCat, {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      })
    })
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(this.baseUrl + `categories/${id}`);
  }

}
  /*
  *Transactions should be read only
  *
  deleteTransactions(id: number): Observable<any>{
    return this.http.delete(this.baseUrl + `${id}`);
  }
  */










