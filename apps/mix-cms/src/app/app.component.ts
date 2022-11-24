import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InitStep } from '@mix/mix.lib';
import {
  AuthApiService,
  LocalStorage,
  LocationService,
  ShareApiService,
  TenancyApiService,
  UiThemeController
} from '@mix/mix.share';
import { TuiRootModule } from '@taiga-ui/core';

export const defaultRedirectRoute = 'dashboard';
export const fallbackRouteToDefault = (route: string) =>
  route !== '/' ? route : defaultRedirectRoute;

@Component({
  selector: 'mix-cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, TuiRootModule, RouterModule]
})
export class AppComponent {
  public isLoading = true;

  constructor(
    private tenantApi: TenancyApiService,
    private auth: AuthApiService,
    private tabControl: LocationService,
    private themeControl: UiThemeController,
    private shareApi: ShareApiService
  ) {
    this.tabControl.init();
    this._checkBackground();
    this._checkSystem();
  }

  private _checkSystem(): void {
    this.tenantApi.getInitStatus().subscribe((step: InitStep) => {
      switch (step) {
        case InitStep.Blank:
          break;
        case InitStep.SelectTheme:
          break;
        default:
          this._checkAppData();
          break;
      }
    });
  }

  private _checkBackground(): void {
    this.themeControl.initTheme(this.themeControl.defaultTheme);
  }

  private _checkAppData(): void {
    this.shareApi.getCurrentCultures().subscribe({
      next: cultures => {
        this.shareApi.culture$.next(cultures);
        if (!LocalStorage.getItem('culture')) {
          LocalStorage.setItem('culture', JSON.stringify(cultures[0]));
        }

        this._checkAuthorization();
      },
      error: () => {
        setTimeout(() => (this.isLoading = false), 500);
      }
    });
  }

  private _checkAuthorization(): void {
    this.auth.fetchUserInfo().subscribe({
      next: res => {
        this.auth.user$.next(res);
        setTimeout(() => (this.isLoading = false), 0);
      },
      error: () => {
        setTimeout(() => (this.isLoading = false), 500);
      }
    });
  }
}
