import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mix-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountInformationComponent {
  public activeTabIndex = 0;
}
