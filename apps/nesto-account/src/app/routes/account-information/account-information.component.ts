import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mix-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountInformationComponent {
  public activeTabIndex = 0;

  constructor(public activeRoute: ActivatedRoute) {
    console.log(this.activeRoute.snapshot.queryParams);
    if (this.activeRoute.snapshot.queryParams && this.activeRoute.snapshot.queryParams['tabIndex'] &&
    Number.parseInt(this.activeRoute.snapshot.queryParams['tabIndex']) <= 3
    ) {
      this.activeTabIndex = Number.parseInt(this.activeRoute.snapshot.queryParams['tabIndex']);
    }
  }
}
