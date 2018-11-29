import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from '../../services/data.service';
import { Transaction } from '../../models/transaction.model';
import { Category } from '../../models/category.model';


@Component({
  selector: 'app-categorizer',
  templateUrl: './categorizer.component.html',
  styleUrls: ['./categorizer.component.css']
})
export class CategorizerComponent implements OnInit {

  private categories: Category[];
  public selectedCategory: string;

  //MatDialogRef contains a dialog reference to the component in the dialog
  //MAT_DIALOG_DATA holds the data passed in by MatDialogConfig, which was injected in the parent (transactions.component.ts)
  constructor(
    private rest: DataService,
    private dialogRef: MatDialogRef<CategorizerComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

    this.rest.getAllCategories().subscribe(
      (cats) => { this.categories = cats }
    );

  }

  ngOnInit() { }

  get cats(): Category[] {
    return this.categories;
  }
  /**
   *Insert new category via classic Js prompts with Js REGEX
   */
  insertNewCategory(): void {
    let newCat = prompt("Insert the name of the new category (Letters only)");
    if (/^[a-zA-Z]+$/.test(newCat) && newCat !== '') {
      this.rest.insertNewCategory(newCat).subscribe(
        (cat) => {
          this.categories.push(cat);
        },
        (err) => {
          if (err) console.log("Categorizer insert error: " + err);
        });
    }
    else {
      alert('You must enter a category containing only letters');
    }
  }
  /**
   *Removing a category from list of categories
   */
  removeSelectedCategory(): void {
    let catToRemove: Category = this.categories.find((cat) => cat.category == this.selectedCategory);

    if (confirm(`Are you sure you wish to remove the selected category: ${this.selectedCategory}?`)) {
      this.rest.deleteCategory(catToRemove.id).subscribe((c) => {
        this.categories.splice(this.categories.findIndex((i) => i.id == c.id), 1)
      },
      (err) => {
        if(err) console.log("Categorizer delete error: " + err);
      }
      );
    }
  }

  //Closes the dialog box and sends back the data that was originally injected
  close(): void {
    this.dialogRef.close(this.data);
  }
}
