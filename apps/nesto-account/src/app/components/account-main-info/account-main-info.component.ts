import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from '@mix/mix.lib';
import { AuthApiService, DestroyService } from '@mix/mix.share';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mix-account-main-info',
  templateUrl: './account-main-info.component.html',
  styleUrls: ['./account-main-info.component.scss'],
  providers: [DestroyService]
})
export class AccountMainInfoComponent implements OnInit {
  public dayControl = new FormControl();
  public monthControl = new FormControl();
  public yearControl = new FormControl();
  public samplePassword = 'ABCDEFGHIKLMN';

  public userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
    fullName: new FormControl(''),
    avatar: new FormControl(''),
    dateOfBirth: new FormControl(null)
  });

  public passwordForm = new FormGroup({
    password: new FormControl(this.samplePassword, Validators.required),
    confirmPassword: new FormControl(null, Validators.required)
  });

  public userModel!: UserInfo;
  public userAvatar = '';

  constructor(
    public authService: AuthApiService,
    public destroy$: DestroyService
  ) {
    //
  }

  public ngOnInit(): void {
    this.authService.isAuthorized$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthorized => {
        if (isAuthorized) {
          this.authService.fetchUserInfo().subscribe(u => {
            this.userModel = u;
            this.userForm.controls.email.patchValue(u.email);
            this.userForm.controls.phoneNumber.patchValue(u.phoneNumber ?? '');
            this.userForm.controls.avatar.patchValue(
              u.userData ? u.userData['avatar'] : ''
            );

            this.userAvatar = u.userData ? u.userData['avatar'] : '';
          });
        }
      });
  }

  public avatarChange(filePath: string): void {
    this.userForm.controls.phoneNumber.patchValue(filePath);
    this.userAvatar = filePath;
  }
}
