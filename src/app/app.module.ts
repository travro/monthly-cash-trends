import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

//imported features
import { LandingModule } from './modules/landing/landing.module';
import { LoginModule } from './modules/login/login.module';
import { MenuModule } from './modules/menu/menu.module';
import { LandingComponent } from './modules/landing/landing/landing.component';
import { LoginComponent } from './modules/login/login/login.component';
import { MenuComponent } from './modules/menu/menu/menu.component';
import { BudgetComponent } from './modules/budget/budget/budget.component';
import { TransactionsComponent } from './modules/transactions/transactions/transactions.component';
import { TrendsComponent } from './modules/trends/trends/trends.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LandingModule,
    LoginModule,
    MenuModule,
    HttpClientModule,
    //product routes are configured after 'imported' feater routes
    RouterModule.forRoot([
      { path: 'home', component: LandingComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'menu', component: MenuComponent,
        children: [
          { path: 'budget', component: BudgetComponent },
          { path: 'transactions', component: TransactionsComponent },
          { path: 'trends', component: TrendsComponent },
          { path: '', redirectTo: 'budget', pathMatch: 'full' },
          { path: '**', redirectTo: 'budget' }
        ]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
