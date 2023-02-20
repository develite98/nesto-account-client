/* eslint-disable @typescript-eslint/member-ordering */
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalSettings, SignUpModel } from '@mix/mix.lib';
import {
  AuthApiService,
  BaseComponent,
  FormUtils,
  LoadingState,
  ShareApiService
} from '@mix/mix.share';
import {
  FacebookLoginProvider,
  SocialAuthService
} from 'angularx-social-login';
import { switchMap } from 'rxjs';

import { AddressInputComponent } from '../../components/address-input/address-input.component';

@Component({
  selector: 'mix-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  @ViewChild(AddressInputComponent) public addressForm!: AddressInputComponent;
  public mode: 'login' | 'signup' | 'update-data' | 'update-personal-data' =
    'login';

  public emailPattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
  public phoneNumber = new RegExp(
    '^(\\+\\d{1,2}\\s?)?1?\\-?\\.?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$'
  );

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

  public emailOrPhoneNumber = (
    control: FormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    }
    return this.emailPattern.test(control.value) ||
      this.phoneNumber.test(control.value)
      ? {}
      : {
          patternError: true
        };
  };

  public emailValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {};
    }
    return this.emailPattern.test(control.value)
      ? {}
      : {
          emailError: true
        };
  };

  public phoneNumberValidator = (
    control: FormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return {};
    }
    return this.phoneNumber.test(control.value)
      ? {}
      : {
          phoneError: true
        };
  };

  public loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      this.emailOrPhoneNumber
    ]),
    password: new FormControl('', Validators.required)
  });

  public signupForm: FormGroup = this.fb.group({
    userName: [null, [Validators.required, this.emailOrPhoneNumber]],
    password: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required, this.confirmationValidator]]
  });

  public userProfileForm = new FormGroup({
    email: new FormControl('', [Validators.required, this.emailValidator]),
    phoneNumber: new FormControl('', [
      Validators.required,
      this.phoneNumberValidator
    ]),
    fullName: new FormControl(''),
    avatar: new FormControl(''),
    dateOfBirth: new FormControl<Date | null>(null),
    gender: new FormControl('Male')
  });

  constructor(
    private fb: FormBuilder,
    private shareSetting: ShareApiService,
    private authSrv: AuthApiService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private cdr: ChangeDetectorRef,
    private socialAuthService: SocialAuthService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.mode = 'login';
    this.cdr.detectChanges();

    this.authSrv.fetchUserData().subscribe();
  }

  public facebookSignin(kind: 'Google' | 'Facebook', isSignUp = false): void {
    const fbLoginOptions = {
      scope: 'email'
    };

    this.loadingState$.next(LoadingState.Loading);
    // const providerId = kind === 'Facebook' ? FacebookLoginProvider.PROVIDER_ID : GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions).then((user) => {
      this.authSrv.socialLogin({
        userName: user.email ?? '',
        externalAccessToken: user.authToken,
        provider: 'Facebook',
        email: user.response.email ?? ''
      }).pipe(this.observerLoadingState()).subscribe(
        {
          next: () => {
            if (isSignUp) {
              this.mode = 'update-personal-data';
            } else {
              this.handleLoginSuccess()
            }
          }
        }
      );
    }).catch(() => {
      this.loadingState$.next(LoadingState.Pending);
    });
  }

  public login(callback?: () => void): void {
    if (FormUtils.validateForm(this.loginForm)) {
      this.globalError$.next(null);
      this.loginForm.disable();
      this.shareSetting
        .getGlobalSetting()
        .pipe(
          switchMap((res: GlobalSettings) =>
            this.authSrv.login(this.loginForm.value, res.apiEncryptKey)
          )
        )
        .pipe(
          this.observerLoadingState(),
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
          },
          error: () => {
            this.mode = 'login';
            this.loginForm.enable();
            this.globalError$.next('Invalid username or password');
          }
        });
    }
  }

  public createAccount(): void {
    if (FormUtils.validateForm(this.signupForm)) {
      const registerData: SignUpModel = {
        ...this.signupForm.value,
        email: this.emailPattern.test(this.signupForm.value.userName)
          ? this.signupForm.value.userName
          : ''
      };

      if (this.phoneNumber.test(registerData.userName)) {
        this.userProfileForm.controls['phoneNumber'].patchValue(
          registerData.userName
        );
      }

      this.globalError$.next(null);
      this.loginForm.disable();
      this.authSrv
        .register(registerData)
        .pipe(
          this.observerLoadingState(),
          this.toast.observe({
            success: 'Successfully create your account',
            loading: 'Creating . . .',
            error: 'Something wrong, please try again'
          })
        )
        .subscribe({
          next: () => {
            this.loginForm.controls['userName'].patchValue(
              registerData.userName
            );
            this.loginForm.controls['password'].patchValue(
              registerData.password
            );
            this.loginForm.enable();
            this.mode = 'login';

            setTimeout(() => {
              this.login(() => {
                this.mode = 'update-personal-data';
              });
            }, 100);
          },
          error: (error: { error: string[] }) => {
            this.globalError$.next(error.error[0]);
          }
        });
    }
  }

  public updateProfile(): void {
    if (FormUtils.validateForm(this.userProfileForm)) {
      this.userProfileForm.disable();
      this.authSrv
        .fetchUserData()
        .pipe(
          switchMap(userData =>
            this.authSrv.updateUserProfile({
              ...userData,
              phoneNumber: this.userProfileForm.value.phoneNumber ?? '',
              fullname: this.userProfileForm.value.fullName ?? '',
              gender: this.userProfileForm.value.gender ?? '',
              avatar: this.userProfileForm.value.avatar ?? '',
              dateOfBirth: this.userProfileForm.value.dateOfBirth ?? undefined,
              email: this.userProfileForm.value.email ?? ''
            })
          )
        )
        .pipe(
          this.observerLoadingState(),
          this.toast.observe({
            success: 'Successfully update your profile',
            error: 'Something error, please try again',
            loading: 'Updating...'
          })
        )
        .subscribe(() => {
          this.userProfileForm.enable();
          this.mode = 'update-data';
        });
    }
  }

  public changeMode(mode: 'login' | 'signup' | 'update-data'): void {
    this.globalError$.next(null);
    this.mode = mode;
  }

  public handleLoginSuccess(): void {
    this.dialogRef.close();
  }

  public submitAddress(): void {
    this.addressForm.submitAddress();
  }
}
