import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

//Feature Modules
import { LandingModule } from './modules/landing/landing.module';
import { LoginModule } from './modules/login/login.module';
import { MenuModule } from './modules/menu/menu.module';
import { LandingComponent } from './modules/landing/landing/landing.component';
import { LoginComponent } from './modules/login/login/login.component';
import { MenuComponent } from './modules/menu/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LandingModule,
    LoginModule,
    MenuModule,
    RouterModule.forRoot([
      { path: 'home', component: LandingComponent },
      { path: 'login', component: LoginComponent },
      { path: 'menu', component: MenuComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
