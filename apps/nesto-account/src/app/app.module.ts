import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { AppEventService, AuthInterceptor, BASE_URL } from '@mix/mix.share';
import { HotToastModule } from '@ngneat/hot-toast';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AccountAddressComponent } from './components/account-address/account-address.component';
import { AddressFormComponent } from './components/account-address/address-form/address-form.component';
import { AccountMainInfoComponent } from './components/account-main-info/account-main-info.component';
import { AccountOrderManageComponent } from './components/account-order-manage/account-order-manage.component';
import { AccountPaymentInfoComponent } from './components/account-payment-info/account-payment-info.component';
import { AccountRefundManageComponent } from './components/account-refund-manage/account-refund-manage.component';
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
    HeaderComponent,
    AccountMainInfoComponent,
    AccountAddressComponent,
    AccountPaymentInfoComponent,
    AccountOrderManageComponent,
    AccountRefundManageComponent,
    AddressFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    HotToastModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    AppEventService,
    {
      provide: BASE_URL,
      useValue: environment.baseUrl
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
