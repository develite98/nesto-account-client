import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { TuiRootModule } from '@taiga-ui/core';
import { TuiTabsModule } from '@taiga-ui/kit';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
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
  },
  {
    path: '',
    redirectTo: 'account-information',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CartComponent,
    AccountInformationComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    RouterModule.forRoot(ROUTES),
    TuiTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
