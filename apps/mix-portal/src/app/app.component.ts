import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InitStep } from '@mix/mix.lib';
import {
  AuthApiService,
  LocationService,
  TenancyApiService
} from '@mix/mix.share';
import { TuiRootModule } from '@taiga-ui/core';

@Component({
  selector: 'mix-spa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, TuiRootModule, RouterModule]
})
export class AppComponent {
  public isLoading = true;

  constructor(
    private tenantApi: TenancyApiService,
    private route: Router,
    private auth: AuthApiService,
    private tabControl: LocationService
  ) {
    this._checkSystem();
    this.tabControl.init();
  }

  private _checkSystem(): void {
    this.tenantApi.getInitStatus().subscribe((step: InitStep) => {
      switch (step) {
        case InitStep.Blank:
          this.route.navigateByUrl('/init').then(() => {
            this.isLoading = false;
          });
          break;
        case InitStep.SelectTheme:
          this.route.navigateByUrl('/init/setup-theme').then(() => {
            this.isLoading = false;
          });
          break;
        default:
          this._checkAuthorization();
          break;
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
        setTimeout(() => (this.isLoading = false), 0);
      }
    });
  }
}
