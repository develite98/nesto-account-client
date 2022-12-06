import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@mix/mix.lib';
import { AuthApiService, ShareApiService } from '@mix/mix.share';

import { LoginComponent } from '../../routes/login/login.component';

@Component({
  selector: 'mix-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public currentUser: User | null = null;
  public showLogin = false;

  constructor(
    private fb: FormBuilder,
    private shareSetting: ShareApiService,
    private authSrv: AuthApiService,
    public dialog: MatDialog
  ) {
    this.authSrv.user$.subscribe(u => (this.currentUser = u));
  }

  public showDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'login-dialog'
    });
  }
}
