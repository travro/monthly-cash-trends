import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TransactionRepositoryService } from '../../services/transaction-repository.service';
import { Transaction } from '../../models/transaction.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-categorizer',
  templateUrl: './categorizer.component.html',
  styleUrls: ['./categorizer.component.css']
})
export class CategorizerComponent implements OnInit {

  selectedCategory : string;
  //MatDialogRef contains a dialog reference to the component in the dialog
  //MAT_DIALOG_DATA holds the data passed in by MatDialogConfig, which was injected in the parent (transactions.component.ts)
  constructor(
    private repo: TransactionRepositoryService,
    private dialogRef: MatDialogRef<CategorizerComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  get cats(): Category[]{
    return this.repo.getAllCategories();
  }
  /**
   *Insert new category via classic Js prompts with Js REGEX
   */
  insertNewCategory(): void{
    let cat = prompt("Insert the name of the new category (Letters only)");
    if(/^[a-zA-Z]+$/.test(cat) && cat !== ''){
      this.repo.insertNewCategory(cat);
    }
    else{
      alert('You must enter a category containing only letters');
    }
  }
  /**
   *
   */
  removeSelectedCategory(): void{
    this.repo.deleteCategory(this.selectedCategory);
  }

  //Closes the dialog box and sends back the data that was originally injected
  close(): void {
    this.dialogRef.close(this.data);
  }
}
