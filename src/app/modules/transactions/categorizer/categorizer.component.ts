import { Component, OnInit, Input } from '@angular/core';
import { TransactionRepositoryService } from '../../services/transaction-repository.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-categorizer',
  templateUrl: './categorizer.component.html',
  styleUrls: ['./categorizer.component.css']
})
export class CategorizerComponent implements OnInit {

  constructor(private repo: TransactionRepositoryService) { }

  @Input() t: Transaction;



  ngOnInit() {
  }

}
