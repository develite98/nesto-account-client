import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MixApplicationModel } from '@mix/mix.lib';
import {
  AppEvent,
  AppEventService,
  ApplicationApiService,
  BaseComponent,
  FormUtils,
  PortalSidebarControlService,
  SignalEventType,
  ThemeApiService,
  ThemeSignalService
} from '@mix/mix.share';
import {
  FormFieldConfig,
  FormlyTaigaModule,
  SkeletonLoadingComponent
} from '@mix/mix.ui';
import { FormlyModule } from '@ngx-formly/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiIslandModule, TuiProgressModule } from '@taiga-ui/kit';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'mix-install-app',
  standalone: true,
  imports: [
    CommonModule,
    TuiIslandModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiProgressModule,
    FormlyTaigaModule,
    FormlyModule,
    SkeletonLoadingComponent
  ],
  templateUrl: './install-app.component.html',
  styleUrls: ['./install-app.component.scss']
})
export class InstallAppComponent extends BaseComponent implements OnInit {
  public availableApp: MixApplicationModel[] = [];
  public selectedApp: MixApplicationModel | undefined = undefined;
  public progressPercentage = new BehaviorSubject<number>(0);
  public isInstalling = false;

  public appForm: FormGroup = new FormGroup({});
  public model: any = {};
  public fields: FormFieldConfig[] = [
    {
      key: 'displayName',
      type: 'input',
      templateOptions: {
        label: 'Display name',
        placeholder: 'Enter your app name',
        required: true
      }
    },
    {
      key: 'baseRoute',
      type: 'input',
      templateOptions: {
        label: 'Base route',
        placeholder: 'Enter your app route'
      }
    },
    {
      key: 'packateFilePath',
      type: 'input',
      templateOptions: {
        label: 'Package file path',
        placeholder: '',
        disabled: true
      }
    }
  ];

  constructor(
    public themeApiService: ThemeApiService,
    public themeSignal: ThemeSignalService,
    public appApiService: ApplicationApiService,
    public appEventService: AppEventService,
    public sideBarController: PortalSidebarControlService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loading = true;
    this.themeApiService.getAppOnStore().subscribe({
      next: result => {
        this.availableApp = result.items.filter(v =>
          v.image.startsWith('https://')
        );
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => (this.loading = false)
    });
  }

  public selectApp(app: MixApplicationModel): void {
    this.selectedApp = app;
    this.model.packateFilePath = app.additionalData.source;
  }

  public installApp(): void {
    if (FormUtils.validateForm(this.appForm)) {
      this.appForm.disable();
      this.isInstalling = true;
      this.themeSignal
        .getMessage<number>(SignalEventType.THEME_DOWNLOAD)
        .subscribe(value => {
          this.progressPercentage.next(value.data);
        });

      const value = this.appForm.value;
      this.appApiService
        .installApp({
          detailUrl: '/app/',
          mixTenantId: 0,
          id: 0,
          createdDateTime: new Date(),
          priority: 0,
          status: 'Published',
          isValid: false,
          errors: [],
          packateFilePath: value.packateFilePath,
          baseRoute: value.baseRoute,
          displayName: value.displayName
        })
        .pipe(this.toastLoadingState())
        .subscribe({
          next: () => {
            this.appEventService.notify({ type: AppEvent.Refresh });
            this.sideBarController.hide();
          },
          error: () => {
            this.appForm.enable();
            this.progressPercentage.next(0);
          }
        });
    }
  }
}
