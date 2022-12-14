import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalSettings, SignUpModel, User } from '@mix/mix.lib';
import { AuthApiService, FormUtils, ShareApiService } from '@mix/mix.share';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';

import { AddressInputComponent } from '../../components/address-input/address-input.component';

@Component({
  selector: 'mix-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild(AddressInputComponent) public addressForm!: AddressInputComponent;
  public mode: 'login' | 'signup' | 'update-data' = 'login';
  public currentUser: User | null = null;
  public loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public confirmationValidator = (
    control: FormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public signupForm: FormGroup = this.fb.group({
    userName: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required, this.confirmationValidator]]
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

  public login(callback?: () => void): void {
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
          next: () => {
            if (!callback) this.handleLoginSuccess();
            else callback();
          }
        });
    }
  }

  public createAccount(): void {
    if (FormUtils.validateForm(this.signupForm)) {
      const registerData: SignUpModel = {
        ...this.signupForm.value,
        email: this.signupForm.value.userName
      };

      this.authSrv
        .register(registerData)
        .pipe(
          this.toast.observe({
            success: 'Successfully create your account',
            loading: 'Creating . . .',
            error: 'Something wrong, please try again'
          })
        )
        .subscribe(() => {
          this.loginForm.controls['userName'].patchValue(registerData.userName);
          this.loginForm.controls['password'].patchValue(registerData.password);

          this.login(() => {
            this.mode = 'update-data';
          });
        });
    }
  }

  public handleLoginSuccess(): void {
    this.dialogRef.close();
  }

  public submitAddress(): void {
    this.addressForm.submitAddress();
  }
}
