import { Component } from '@angular/core';
import {
  DashboardApiService,
  MixWidgetComponent,
  ShareModule
} from '@mix/mix.share';

@Component({
  selector: 'mix-universe-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [ShareModule, MixWidgetComponent]
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
  public currentDay = this.weekday[new Date().getDay()];
  public currentDate = new Date().toLocaleDateString();
  public portalInfo$ = this.dashboardApi.getDashboardInfo();

  constructor(public dashboardApi: DashboardApiService) {}
}
