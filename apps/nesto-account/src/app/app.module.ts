import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route } from '@angular/router';

import { AppComponent } from './app.component';
import { AccountInformationComponent } from './routes/account-information/account-information.component';
import { CartComponent } from './routes/cart/cart.component';
import { LoginComponent } from './routes/login/login.component';

export const ROUTES: Route[] = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'account-information',
    component: AccountInformationComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CartComponent,
    AccountInformationComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
