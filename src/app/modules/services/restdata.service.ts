import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import {map} from 'rxjs/operators'


import { Transaction } from '../models/transaction.model';


@Injectable({
  providedIn: 'root'
})


export class RestDataService {

  constructor(private http: HttpClient) { }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('https://5b82c6892fd7f2001417916a.mockapi.io/mock');

  }

  /**/
}








