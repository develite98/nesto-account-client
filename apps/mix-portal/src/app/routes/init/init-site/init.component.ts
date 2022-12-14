import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountModel, InitTenantModel, ThemeModel } from '@mix/mix.lib';
import {
  InitAccountInformationComponent,
  InitModeComponent,
  InitSiteInformationComponent,
  InitThemesComponent,
  ModalService,
  ShareModule,
  SignalEventType,
  TenancyApiService,
  ThemeSignalService
} from '@mix/mix.share';
import { TuiAlertService } from '@taiga-ui/core';
import { of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'mix-portal-init-page',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss'],
  standalone: true,
  imports: [
    ShareModule,
    InitAccountInformationComponent,
    InitSiteInformationComponent,
    InitThemesComponent,
    InitModeComponent
  ]
})
export class InitComponent {
  public tenantData!: InitTenantModel;
  public accountData!: AccountModel;
  public themeData!: ThemeModel | null;

  public step = 0;
  public loading = false;
  public showProgress = false;
  public initProgress = 0;
  public downloadProgress = 0;
  public mode: 'local' | 'universal' = 'local';
  public initApplicationStep: 1 | 2 = 1;
  public progressMessage = 'Please wait while we install your site!';

  constructor(
    public tenancyApi: TenancyApiService,
    public route: Router,
    public themeSignal: ThemeSignalService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    @Inject(ModalService) private readonly modalService: ModalService
  ) {}

  public siteSubmit(value: InitTenantModel): void {
    this.tenantData = value;
    this.step = 1;
  }

  public accountSubmit(value: AccountModel): void {
    this.accountData = value;
    this.step = 2;
  }

  public modeSubmit(value: 'local' | 'universal'): void {
    this.mode = value;
    this.step = 3;
  }

  public themeSubmit(value: ThemeModel | null): void {
    this.themeData = value;
    const message = value
      ? `Choose ${value.title} is your default theme ?`
      : 'Init site with a blank theme ?';
    this.modalService.confirm(message).subscribe(ok => {
      if (ok) this.initApplication();
    });
  }

  public initApplication(): void {
    this.showProgress = true;
    const data = {
      tenantData: this.tenantData,
      accountData: this.accountData
    };

    setTimeout(() => {
      if (this.initProgress <= 30) this.initProgress = 15;
    }, 1500);

    this.tenancyApi
      .initFullTenant(data)
      .pipe(
        tap(() => {
          this.initProgress = this.themeData ? 30 : 100;
          this.initApplicationStep = 1;
        }),
        switchMap(() => {
          if (this.themeData) {
            this.themeSignal
              .getMessage<number>(SignalEventType.THEME_DOWNLOAD)
              .subscribe(v => {
                this.downloadProgress = v.data;
                this.initProgress = 30 + v.data;
              });
          }
          return this.themeData
            ? this.tenancyApi.installTheme(this.themeData.additionalData)
            : of(null);
        })
      )
      .subscribe(() => {
        this.initApplicationStep = 2;
        this.progressMessage = 'Congratulation! Successfully init your site';
        this.alertService
          .open('Create your tenant successfully', { label: 'Success' })
          .subscribe();

        setTimeout(() => {
          localStorage.setItem('redirectUrl', '/init/setup-theme');
          this.route.navigateByUrl('/auth/login');
        }, 2000);
      });
  }
}
