import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { AppEventService, BASE_URL } from '@mix/mix.share';
import {TuiSidebarModule} from '@taiga-ui/addon-mobile';
import {TuiActiveZoneModule} from '@taiga-ui/cdk';
import { TuiButtonModule, TuiRootModule, TuiSvgModule } from '@taiga-ui/core';
import {
  TuiAvatarModule,
  TuiDataListWrapperModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiRadioLabeledModule,
  TuiSelectModule,
  TuiTabsModule
} from '@taiga-ui/kit';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AccountAddressComponent } from './components/account-address/account-address.component';
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
    AccountRefundManageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    FormsModule,
    TuiTabsModule,
    TuiAvatarModule,
    TuiInputFilesModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiInputModule,
    TuiRadioLabeledModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AppEventService,
    {
      provide: BASE_URL,
      useValue: environment.baseUrl
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
