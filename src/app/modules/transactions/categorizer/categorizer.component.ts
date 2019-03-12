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
  public selectedCategory: string;
  public applyAll: boolean = false;

  //MatDialogRef contains a dialog reference to the component in the dialog
  //MAT_DIALOG_DATA holds the data passed in by MatDialogConfig, which was injected in the parent (transactions.component.ts)
  constructor(
    private rest: DataService,
    private dialogRef: MatDialogRef<CategorizerComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.rest.getAllCategories().subscribe((observer: Category[]) => { this.categories = observer });
    this.selectedCategory = data.dataTransaction.category;
  }

  ngOnInit() {
    console.log(this.selectedCategory + ' is this instance\'s selected category')
  }

  get cats(): Category[] {
    return this.categories;
  }
  //TOFIX - category does not add to template
  insertNewCategory(): void {
    let catToAdd = prompt("Insert the name of the new category (Letters only)");
    if (/^[a-zA-Z\s]+$/.test(catToAdd) && catToAdd !== '' && catToAdd !== null) {
      this.rest.insertNewCategory(catToAdd)
        .subscribe(
          (newPostedCategory) => {
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
      this.rest.deleteCategory(catToRemove.id).subscribe(
        (observer: Category) => {
          this.categories.splice(this.categories.findIndex((subjInCategories) => subjInCategories.id == observer.id), 1)
        },
        (err) => {
          if (err) console.log("Categorizer delete error: " + err);
        }
      );
    }
  }

  closeNoChanges(): void {
    this.dialogRef.close(this.data);
    this.selectedCategory = null;
  }
 
  applyChanges(): void {
    //TODO - refactor
    //Check for updating a transaction, if apply all is checked the Window.confirm() box will ask for confirmation to apply the category to all vendors
    if (confirm(`Apply the category ${this.selectedCategory} to ${this.data.dataTransaction.vendor} ${(this.data.applyAll) ? 'and to all of their transactions?' : '?'}`)) {

      if (!this.applyAll) {// for updating a single transaction of a given vendor
        this.data.dataTransaction.category = this.selectedCategory;
        this.dialogRef.close(this.data);
      } else { // for all transaction of the same vendor
        this.data.applyAll = true;
        this.data.dataTransaction.category = this.selectedCategory;
        this.dialogRef.close(this.data);
      }
      this.selectedCategory = null;
      this.applyAll = false;
    }
  }
}
