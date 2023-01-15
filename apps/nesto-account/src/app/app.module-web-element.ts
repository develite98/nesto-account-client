import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
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
import { AppEventService, BASE_URL } from '@mix/mix.share';
import { EmptyContentComponent, SkeletonLoadingComponent } from '@mix/mix.ui';
import { HotToastModule } from '@ngneat/hot-toast';

import { environment } from '../environments/environment';
import { AccountAddressComponent } from './components/account-address/account-address.component';
import { AddressFormComponent } from './components/account-address/address-form/address-form.component';
import { AccountMainInfoComponent } from './components/account-main-info/account-main-info.component';
import { UserAvatarComponent } from './components/account-main-info/user-avatar/user-avatar.component';
import { AccountOrderManageComponent } from './components/account-order-manage/account-order-manage.component';
import { OrderCardComponent } from './components/account-order-manage/order-card/order-card.component';
import { AccountPaymentInfoComponent } from './components/account-payment-info/account-payment-info.component';
import { AccountRefundManageComponent } from './components/account-refund-manage/account-refund-manage.component';
import { AddressInputComponent } from './components/address-input/address-input.component';
import { AddressSelectedDialogComponent } from './components/address-selected-dialog/address-selected-dialog.component';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { GetInTouchFormComponent } from './components/get-in-touch-form/get-in-touch-form.component';
import { GetInvitationFormComponent } from './components/get-invitation-form/get-invitation-form.component';
import { HeaderComponent } from './components/header/header.component';
import { MoneyDisplayComponent } from './components/money-display/money-display.component';
import { NestoFooterComponent } from './components/nesto-footer/nesto-footer.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { AtmIconComponent } from './components/svg-icon/atm.component';
import { MOMOIconComponent } from './components/svg-icon/momo.component';
import { NationIconComponent } from './components/svg-icon/nation.component';
import { VisaIconComponent } from './components/svg-icon/visa.component';
import { ZalopayIconComponent } from './components/svg-icon/zalopay-icon.component';
import { AccountInformationComponent } from './routes/account-information/account-information.component';
import { CartComponent } from './routes/cart/cart.component';
import { DeliveryPaymentComponent } from './routes/delivery-payment/delivery-payment.component';
import { LoginComponent } from './routes/login/login.component';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
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
    AddressInputComponent,
    ConfirmationDialogComponent,
    AddressSelectedDialogComponent,
    MoneyDisplayComponent,
    NestoFooterComponent,
    NumberInputComponent,
    CartItemComponent,
    GetInTouchFormComponent,
    GetInvitationFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    MatMenuModule,
    EmptyContentComponent
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
  ]
})
export class AppModuleWebElement implements DoBootstrap {
  constructor(private injector: Injector) {
    // header
    const webComponent = createCustomElement(HeaderComponent, { injector });
    customElements.define('mix-header', webComponent);

    // footer
    const footerComponent = createCustomElement(NestoFooterComponent, {
      injector
    });
    customElements.define('mix-footer', footerComponent);

    // number input
    const numberInputComponent = createCustomElement(NumberInputComponent, {
      injector
    });
    customElements.define('mix-number-input', numberInputComponent);

    // get in touch form
    const getInTouchForm = createCustomElement(GetInTouchFormComponent, {
      injector
    });
    customElements.define('mix-ng-get-in-touch-form', getInTouchForm);

    // get invitation form
    const getInvitationForm = createCustomElement(GetInvitationFormComponent, {
      injector
    });
    customElements.define('mix-ng-get-invitation-form', getInvitationForm);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngDoBootstrap() {}
}
