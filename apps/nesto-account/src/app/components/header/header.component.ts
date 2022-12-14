import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@mix/mix.lib';
import {
  AuthApiService,
  CartApiService,
  ShareApiService
} from '@mix/mix.share';

import { LoginComponent } from '../../routes/login/login.component';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';

@Component({
  selector: 'mix-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public currentUser: User | null = null;
  public currentTotalCart = 0;
  public showLogin = false;

  constructor(
    private fb: FormBuilder,
    private shareSetting: ShareApiService,
    private authSrv: AuthApiService,
    private cartSrv: CartApiService,
    public dialog: MatDialog
  ) {
    this.authSrv.user$.subscribe(u => {
      this.currentUser = u;
      this.cartSrv.getMyCart().subscribe(v => {
        this.currentTotalCart = v.orderItems.length;
      });
    });
  }

  public showLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'login-dialog'
    });
  }

  public showCartDialog(): void {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      panelClass: 'side-dialog',
      autoFocus: false
    });
  }

  public logOut(): void {
    this.currentUser = null;
    this.currentTotalCart = 0;
    this.authSrv.logout();
  }
}
