import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { GlobalSettings } from '@mix/mix.lib';
import { FormFieldConfig, FormlyTaigaModule } from '@mix/mix.ui';
import { FormlyModule } from '@ngx-formly/core';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core';
import { switchMap } from 'rxjs';

import { BaseComponent } from '../../../bases/base-component.component';
import { AuthApiService, ShareApiService } from '../../../services';
import { FormUtils } from '../../../utils';

@Component({
  selector: 'mix-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormlyModule,
    FormlyTaigaModule,
    ReactiveFormsModule,
    TuiButtonModule
  ]
})
export class MixLoginComponent extends BaseComponent {
  public loginError = new TuiValidationError(
    'Failed to login, please re-check your Username or Password'
  );

  constructor(
    private fb: FormBuilder,
    private shareSetting: ShareApiService,
    private authSrv: AuthApiService
  ) {
    super();
  }

  public signInForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    rememberPassword: [true]
  });
  public model: any = { rememberPassword: true };
  public fields: FormFieldConfig[] = [
    {
      key: 'userName',
      type: 'input',
      props: {
        label: 'Username',
        placeholder: 'Your Username / Email',
        required: true
      }
    },
    {
      key: 'password',
      type: 'input',
      props: {
        label: 'Password',
        placeholder: 'Enter your Password',
        required: true,
        type: 'password'
      }
    },
    {
      key: 'rememberPassword',
      type: 'checkbox',
      props: {
        label: 'Remember your password'
      }
    }
  ];

  public submitForm(): void {
    if (FormUtils.validateForm(this.signInForm)) {
      this.loading = true;
      this.shareSetting
        .getGlobalSetting()
        .pipe(
          switchMap((res: GlobalSettings) =>
            this.authSrv.login(this.signInForm.value, res.apiEncryptKey)
          )
        )
        .subscribe({
          next: () => this.handleLoginSuccess(),
          error: () => this.handleLoginError()
        });
    }
  }

  public handleLoginSuccess(): void {
    this.loading = false;
    this.showSuccess('Successfully login');

    let redirectUrl: string | null = localStorage.getItem('redirectUrl');
    if (!redirectUrl || redirectUrl === '/auth/login') {
      redirectUrl = '';
    }

    this.route
      .navigateByUrl(redirectUrl)
      .then(() => localStorage.removeItem('redirectUrl'));
  }

  public handleLoginError(): void {
    this.loading = false;
    this.showError(
      'Error when login, please re-check your username or password'
    );
  }
}
