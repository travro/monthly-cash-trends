import { Component, OnInit } from '@angular/core';

import { Budget } from '../../models/budget.model';
import { DataService } from '../../services/data.service';

@Component({
  templateUrl: './budget.component.html',
  styleUrls: ['../../../app.component.css']
})
export class BudgetComponent implements OnInit {

  private budget: Budget[];
  
  constructor(private rest: DataService) {
    this.rest.getBudget().subscribe(
      (data) => this.budget = data      
    );
    
   }

  ngOnInit() {
  }

  get buds(): Budget[] {
    return this.budget;
  } 

}
