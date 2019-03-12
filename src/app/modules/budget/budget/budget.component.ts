import { Component, OnInit } from '@angular/core';

import { Budget } from '../../models/budget.model';
import { DataService } from '../../services/data.service';

@Component({
  templateUrl: './budget.component.html',
  styleUrls: ['../../../app.component.css', './budget.component.css']
})
export class BudgetComponent implements OnInit {

  private budget: Budget[];

  constructor(private dataService: DataService) {
    this.dataService.getBudget().subscribe((records) => this.budget = records);

   }

  ngOnInit() {
  }

  get buds(): Budget[] {
    return this.budget;
  }

}
