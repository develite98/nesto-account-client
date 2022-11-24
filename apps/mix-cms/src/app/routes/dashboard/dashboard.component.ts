import { ChangeDetectorRef, Component } from '@angular/core';
import {
  DashboardApiService,
  MixWidgetComponent,
  ShareModule
} from '@mix/mix.share';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'mix-cms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [ShareModule, MixWidgetComponent, NgxChartsModule]
})
export class DashBoardComponent {
  public weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  public helloPrefix = 'Hi';
  public currentDay = this.weekday[new Date().getDay()];
  public currentDate = new Date().toLocaleDateString();
  public portalInfo$ = this.dashboardApi.getDashboardInfo();
  public cmsData: { name: string; value: number }[] = [];

  colorScheme = {
    domain: [
      '#e60049',
      '#0bb4ff',
      '#50e991',
      '#e6d800',
      '#9b19f5',
      '#ffa300',
      '#dc0ab4',
      '#b3d4ff',
      '#00bfa0'
    ]
  };

  constructor(
    public dashboardApi: DashboardApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.dashboardApi.getDashboardInfo().subscribe(info => {
      const chartData: { name: string; value: number }[] = [];
      chartData.push({
        name: 'Pages',
        value: info.totalPage
      });

      chartData.push({
        name: 'Posts',
        value: info.totalPost
      });

      chartData.push({
        name: 'Modules',
        value: 3
      });

      chartData.push({
        name: 'Users',
        value: 5
      });

      this.cmsData = chartData;
      this.cdr.detectChanges();
    });

    const curHr = new Date().getHours();
    if (curHr <= 3) {
      this.helloPrefix = 'Good night';
    } else if (curHr < 12) {
      this.helloPrefix = 'Good morning';
    } else if (curHr < 18) {
      this.helloPrefix = 'Good afternoon';
    } else {
      this.helloPrefix = 'Good evening';
    }
  }
}
