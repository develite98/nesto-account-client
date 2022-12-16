/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthApiService,
  BaseComponent,
  DestroyService,
  FormUtils
} from '@mix/mix.share';
import { UserData } from 'libs/mix.share/src/services/api/auth-api.service';
import { switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'mix-account-main-info',
  templateUrl: './account-main-info.component.html',
  styleUrls: ['./account-main-info.component.scss'],
  providers: [DestroyService]
})
export class AccountMainInfoComponent extends BaseComponent implements OnInit {
  public dayControl = new FormControl();
  public monthControl = new FormControl();
  public yearControl = new FormControl();
  public samplePassword = 'ABCDEFGHIKLMN';

  public userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
    fullName: new FormControl(''),
    avatar: new FormControl(''),
    dateOfBirth: new FormControl<Date | null>(null),
    gender: new FormControl('')
  });

  public passwordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  public userModel!: UserData;
  public userAvatar = '';

  constructor(
    public authService: AuthApiService,
    public destroy$: DestroyService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.authService.isAuthorized$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthorized => {
        if (isAuthorized) {
          this.authService.fetchUserInfo().subscribe(u => {
            this.userForm.controls.email.patchValue(u.email ?? '');
          });

          this.authService.fetchUserData().subscribe(u => {
            this.userModel = u;
            this.userForm.controls.fullName.patchValue(u.fullname ?? '');
            this.userForm.controls.gender.patchValue(u.gender ?? '');
            this.userForm.controls.phoneNumber.patchValue(u.phoneNumber ?? '');
            this.userForm.controls.dateOfBirth.patchValue(
              u.dateOfBirth ?? null
            );
            this.userForm.controls.avatar.patchValue(u['avatar'] ?? '');
            this.userAvatar = u['avatar'] ?? '';
          });
        }
      });
  }

  public avatarChange(filePath: string): void {
    this.userForm.controls.avatar.patchValue(filePath);
    this.userAvatar = filePath;
  }

  public saveUser(): void {
    if (FormUtils.validateForm(this.userForm)) {
      this.authService
        .fetchUserData()
        .pipe(
          switchMap(userData =>
            this.authService.updateUserProfile({
              ...userData,
              phoneNumber: this.userForm.value.phoneNumber ?? '',
              fullname: this.userForm.value.fullName ?? '',
              gender: this.userForm.value.gender ?? '',
              avatar: this.userForm.value.avatar ?? '',
              dateOfBirth: this.userForm.value.dateOfBirth ?? undefined
            })
          )
        )
        .pipe(
          this.toast.observe({
            success: 'Successfully update your profile',
            error: 'Something error, please try again',
            loading: 'Updating...'
          })
        )
        .subscribe();
    }
  }
}
