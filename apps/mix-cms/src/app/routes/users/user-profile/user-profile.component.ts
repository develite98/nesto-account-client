import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MixUser } from '@mix/mix.lib';
import {
  BaseComponent,
  DestroyService,
  FormUtils,
  IconsModule,
  UploadApiService,
  UserApiService
} from '@mix/mix.share';
import { FormFieldConfig, FormlyTaigaModule } from '@mix/mix.ui';
import { TuiButtonModule, TuiGroupModule, TuiSvgModule } from '@taiga-ui/core';
import {
  TuiAvatarModule,
  TuiFileLike,
  TuiInputFilesComponent,
  TuiInputFilesModule,
  TuiTabsModule
} from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'mix-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    TuiTabsModule,
    TuiButtonModule,
    TuiSvgModule,
    FormlyTaigaModule,
    ReactiveFormsModule,
    TuiAvatarModule,
    TuiGroupModule,
    TablerIconsModule,
    IconsModule,
    TuiInputFilesModule,
    TuiTabsModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [DestroyService]
})
export class UserProfileComponent extends BaseComponent implements OnInit {
  @ViewChild(TuiInputFilesComponent, { static: true })
  filesComponent!: TuiInputFilesComponent;

  public currentStep = 'User Profile';
  public activeItemIndex = 0;
  public readonly fileControl = new FormControl();
  public readonly steps = [
    {
      name: 'User Profile',
      icon: 'user'
    },
    {
      name: 'User Roles',
      icon: 'lock-access'
    },
    {
      name: 'Additional',
      icon: 'lock-access'
    }
  ];
  public user?: MixUser;
  public userForm: FormGroup = new FormGroup({});
  public userFields: FormFieldConfig[] = [
    {
      key: 'userName',
      type: 'input',
      props: {
        required: true,
        label: 'User Name',
        placeholder: 'Enter your user name',
        disabled: true
      }
    },
    {
      key: 'email',
      type: 'input',
      props: {
        required: true,
        label: 'Email',
        placeholder: 'Enter your email'
      }
    },
    {
      key: 'phoneNumber',
      type: 'number',
      props: {
        label: 'Phone number',
        placeholder: 'Enter your phone number'
      }
    },
    {
      key: 'description',
      type: 'input',
      props: {
        label: 'Description',
        placeholder: 'Enter about yourself'
      }
    }
  ];

  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.fileControl.valueChanges;
  constructor(
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private destroy: DestroyService,
    private userApi: UserApiService,
    private uploadApi: UploadApiService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.userApi.getUserProfile(id).subscribe(result => {
      this.user = result;
      this.cdr.detectChanges();
    });
    this.loadedFiles$.subscribe(file => {
      file ? this.makeRequest(file) : of(null);
    });
  }

  public saveUser(): void {
    if (FormUtils.validateForm(this.userForm) && this.user) {
      this.userApi
        .saveUserProfile(this.user)
        .pipe(this.toastLoadingState())
        .subscribe();
    }
  }

  public onUpload(): void {
    const event = new MouseEvent('click', { bubbles: true });
    this.filesComponent.nativeFocusableElement?.dispatchEvent(event);
  }

  public removeFile(): void {
    this.fileControl.setValue(null);
  }

  public makeRequest(file: File): void {
    this.loadingFiles$.next(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', '');

    this.uploadApi.uploadFile(formData).subscribe((res: string) => {
      if (this.user) this.user.userData.Avatar = res;
    });
  }
}
