import { Component, OnInit } from '@angular/core';
import {RestDataService } from '../../services/restdata.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private dataservice: RestDataService, private transactions: Transaction[]) { }

  ngOnInit() {
    this.dataservice.getAllTransactions().subscribe(
      (data) => this.transactions = data,
      () => console.log('there was an error'),
      () => console.log('got it'));
  }

}
