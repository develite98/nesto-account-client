import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { AddressFormComponent } from './address-form/address-form.component';



@Component({
  selector: 'mix-account-address',
  templateUrl: './account-address.component.html',
  styleUrls: ['./account-address.component.scss']
})
export class AccountAddressComponent {

  constructor(public dialog: MatDialog
  ) {}

  showDialog(): void {
    const dialogRef = this.dialog.open(AddressFormComponent, {'panelClass': 'custom-dialog'});
  }
}
