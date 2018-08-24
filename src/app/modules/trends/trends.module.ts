import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendsComponent } from './trends/trends.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TrendsComponent],
  exports: [TrendsComponent]
})
export class TrendsModule { }
