import { Component, OnInit } from '@angular/core';
import {RestDataService } from '../../services/restdata.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsComponent implements OnInit {

  public transactions: Transaction[];

  constructor(private dataservice: RestDataService) { }

  ngOnInit() {
    this.dataservice.getAllTransactions().subscribe(
      (data) =>{ this.transactions = data},
      (error) => console.log(error),
      () => console.log('got it'));
  }

}
