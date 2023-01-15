/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  AuthApiService,
  BaseComponent,
  DestroyService,
  FormUtils
} from '@mix/mix.share';
import { UserData } from 'libs/mix.share/src/services/api/auth-api.service';
import { switchMap, takeUntil } from 'rxjs';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'mix-account-main-info',
  templateUrl: './account-main-info.component.html',
  styleUrls: ['./account-main-info.component.scss'],
  providers: [DestroyService],
  encapsulation: ViewEncapsulation.None
})
export class AccountMainInfoComponent extends BaseComponent implements OnInit {
  public userForm = new FormGroup({
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    fullName: new FormControl(''),
    avatar: new FormControl(''),
    dateOfBirth: new FormControl<Date | null>(null),
    gender: new FormControl('')
  });
  public userModel!: UserData;
  public userAvatar = '';

  public confirmationValidator = (
    control: FormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.passwordForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public passwordForm = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.confirmationValidator
    ])
  });

  constructor(
    public authService: AuthApiService,
    public destroy$: DestroyService,
    public dialog: MatDialog
  ) {
    super();
  }

  public ngOnInit(): void {
    this.authService.isAuthorized$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthorized => {
        if (isAuthorized) {
          this.authService.fetchUserData().subscribe(u => {
            this.userModel = u;
            this.userForm.controls.email.patchValue(u.email ?? '');
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
              dateOfBirth: this.userForm.value.dateOfBirth ?? undefined,
              email: this.userForm.value.email ?? ''
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

  public changePassword(): void {
    if (FormUtils.validateForm(this.passwordForm)) {
      this.dialog
        .open(ConfirmationDialogComponent, {
          data: `Are you sure to change your password?`
        })
        .afterClosed()
        .subscribe((yes: boolean) => {
          if (yes) {
            this.authService
              .changePassword({
                currentPassword: this.passwordForm.value.currentPassword || '',
                newPassword: this.passwordForm.value.password || '',
                confirmPassword: this.passwordForm.value.confirmPassword || ''
              })
              .pipe(
                this.toast.observe({
                  success: 'Updating your password',
                  error: 'Error, please try again',
                  loading: 'Successfully'
                })
              )
              .subscribe(() => {
                this.passwordForm.reset();
              });
          } else {
            return;
          }
        });
    }
  }
}
