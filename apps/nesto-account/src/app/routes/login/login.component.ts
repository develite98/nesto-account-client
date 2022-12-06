import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalSettings, User } from '@mix/mix.lib';
import { AuthApiService, FormUtils, ShareApiService } from '@mix/mix.share';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';

@Component({
  selector: 'mix-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public currentUser: User | null = null;
  public loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private fb: FormBuilder,
    private shareSetting: ShareApiService,
    private authSrv: AuthApiService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private toast: HotToastService
  ) {
    this.authSrv.user$.subscribe(u => (this.currentUser = u));
  }

  public login(): void {
    if (FormUtils.validateForm(this.loginForm)) {
      this.loginForm.disable();
      this.shareSetting
        .getGlobalSetting()
        .pipe(
          switchMap((res: GlobalSettings) =>
            this.authSrv.login(this.loginForm.value, res.apiEncryptKey)
          )
        )
        .pipe(
          this.toast.observe({
            loading: 'Login...',
            success: 'Login success, welcome',
            error: 'Error, please try agin.'
          })
        )
        .subscribe({
          next: () => this.handleLoginSuccess(),
          error: () => {
            //
          }
        });
    }
  }

  public handleLoginSuccess(): void {
    this.dialogRef.close();
  }
}
