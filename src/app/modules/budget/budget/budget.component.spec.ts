import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetComponent } from './budget.component';
import { HttpClientModule } from '@angular/common/http';

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
