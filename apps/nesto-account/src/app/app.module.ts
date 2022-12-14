import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { AppEventService, AuthInterceptor, BASE_URL } from '@mix/mix.share';
import { SkeletonLoadingComponent } from '@mix/mix.ui';
import { HotToastModule } from '@ngneat/hot-toast';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AccountAddressComponent } from './components/account-address/account-address.component';
import { AddressFormComponent } from './components/account-address/address-form/address-form.component';
import { AccountMainInfoComponent } from './components/account-main-info/account-main-info.component';
import { UserAvatarComponent } from './components/account-main-info/user-avatar/user-avatar.component';
import { AccountOrderManageComponent } from './components/account-order-manage/account-order-manage.component';
import { OrderCardComponent } from './components/account-order-manage/order-card/order-card.component';
import { AccountPaymentInfoComponent } from './components/account-payment-info/account-payment-info.component';
import { AccountRefundManageComponent } from './components/account-refund-manage/account-refund-manage.component';
import { AddressInputComponent } from './components/address-input/address-input.component';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { AtmIconComponent } from './components/svg-icon/atm.component';
import { MOMOIconComponent } from './components/svg-icon/momo.component';
import { NationIconComponent } from './components/svg-icon/nation.component';
import { VisaIconComponent } from './components/svg-icon/visa.component';
import { ZalopayIconComponent } from './components/svg-icon/zalopay-icon.component';
import { AccountInformationComponent } from './routes/account-information/account-information.component';
import { CartComponent } from './routes/cart/cart.component';
import { DeliveryPaymentComponent } from './routes/delivery-payment/delivery-payment.component';
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
    path: 'cart/delivery-payment',
    component: DeliveryPaymentComponent
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
    AddressFormComponent,
    VisaIconComponent,
    OrderCardComponent,
    DeliveryPaymentComponent,
    MOMOIconComponent,
    AtmIconComponent,
    ZalopayIconComponent,
    NationIconComponent,
    CartDialogComponent,
    UserAvatarComponent,
    AddressInputComponent
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
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    SkeletonLoadingComponent,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule
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
  //   entryComponents: [HeaderComponent]
  // })
  // export class AppModule implements DoBootstrap {
  //   constructor(private injector: Injector) {
  //     const webComponent = createCustomElement(HeaderComponent, { injector });
  //     customElements.define('mix-header', webComponent);
  //   }

  //   // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  //   ngDoBootstrap() {}
  // }
  bootstrap: [AppComponent]
})
export class AppModule {}
