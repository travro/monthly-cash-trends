import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from '../../services/data.service';
import { Category } from '../../models/category.model';


@Component({
  selector: 'app-categorizer',
  templateUrl: './categorizer.component.html',
  styleUrls: ['./categorizer.component.css']
})
export class CategorizerComponent implements OnInit {

  private categories: Category[];
  private openingCategory: string;
  public selectedCategory: string;
  public applyAll: boolean = false;

  //MatDialogRef contains a dialog reference to the component in the dialog
  //MAT_DIALOG_DATA holds the data passed in by MatDialogConfig, which was injected in the parent (transactions.component.ts)
  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<CategorizerComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

    this.dataService
      .getAllCategories()
      .subscribe((observer: Category[]) => { this.categories = observer });

    this.openingCategory = this.selectedCategory = data.dataTransaction.category;
  }

  ngOnInit() {
    console.log(this.selectedCategory + ' is this instance\'s selected category')
  }

  get cats(): Category[] {
    return this.categories;
  }

  insertNewCategory(): void {
    let catToAdd = prompt("Insert the name of the new category (Letters only)");
    if (/^[a-zA-Z\s]+$/.test(catToAdd) && catToAdd !== '' && catToAdd !== null) {
      this.dataService
        .insertNewCategory(catToAdd)
        .subscribe(
          (newPostedCategory: Category) => {
            this.categories.push(newPostedCategory);
          },
          (err) => {
            if (err) console.log("Categorizer insert error: " + err);
          });
    }
    else {
      alert('You must enter a category containing only letters');
    }
  }
  //TOFIX - category does not remove from template
  removeSelectedCategory(): void {
    let catToRemove: Category = this.categories.find((cat) => cat.category == this.selectedCategory);

    if (confirm(`Remove the selected category: ${this.selectedCategory}? \nWARNING: Any transaction already set to this category will be reset to 'Uncategorized'`)) {
      this.dataService
        .deleteCategory(catToRemove.id)
        .subscribe(
          (deletedCategory: Category) => {
            this.categories.splice(this.categories.findIndex((element : Category) => element.id == deletedCategory.id), 1);
          },
          (err) => {
            if (err) console.log("Categorizer delete error: " + err);
          });
    }
  }

  closeNoChanges(): void {
    this.data.dataTransaction.category = this.openingCategory;
    this.dialogRef.close(this.data);

  }

  applyChanges(): void {
    if (confirm(`Apply the category ${this.selectedCategory} to ${this.data.dataTransaction.vendor} ${(this.applyAll) ? 'and to all of their transactions?' : '?'}`)) {
      this.data.dataTransaction.category = this.selectedCategory;
      this.data.dataTransaction.applyAll = this.applyAll;
      this.dialogRef.close(this.data);
      this.selectedCategory = null;
      this.applyAll = false;
    }
  }
}
