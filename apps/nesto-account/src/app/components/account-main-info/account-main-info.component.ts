import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mix-account-main-info',
  templateUrl: './account-main-info.component.html',
  styleUrls: ['./account-main-info.component.scss']
})
export class AccountMainInfoComponent {
  public dayControl = new FormControl();
  public monthControl = new FormControl();
  public yearControl = new FormControl();

}
