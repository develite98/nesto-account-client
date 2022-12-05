import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalSettings } from '@mix/mix.lib';
import { AuthApiService, FormUtils, ShareApiService } from '@mix/mix.share';
import { switchMap } from 'rxjs';

@Component({
  selector: 'mix-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    'userName': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  })

  constructor(
    private fb: FormBuilder,
    private shareSetting: ShareApiService,
    private authSrv: AuthApiService
  ) {
  }

  public login(): void {
    if (FormUtils.validateForm(this.loginForm)) {
      this.shareSetting
      .getGlobalSetting()
      .pipe(
        switchMap((res: GlobalSettings) =>
          this.authSrv.login(this.loginForm.value, res.apiEncryptKey)
        )
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
    //
  }
}
