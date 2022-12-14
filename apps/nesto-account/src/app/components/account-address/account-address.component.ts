import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthApiService, BaseComponent } from '@mix/mix.share';

import { Address } from '../../models/user-data.model';
import { AddressFormComponent } from './address-form/address-form.component';

@Component({
  selector: 'mix-account-address',
  templateUrl: './account-address.component.html',
  styleUrls: ['./account-address.component.scss']
})
export class AccountAddressComponent extends BaseComponent implements OnInit {
  public currentAddress: Address[] = [];

  constructor(public dialog: MatDialog, private authApi: AuthApiService) {
    super();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.authApi
      .fetchUserData()
      .pipe(
        this.toast.observe({
          success: 'Loading your address',
          error: '',
          loading: 'Successfully'
        })
      )
      .subscribe(result => {
        this.currentAddress = result.addresses;
      });
  }

  public showDialog(): void {
    const dialogRef = this.dialog.open(AddressFormComponent, {
      panelClass: 'nesto-dialog'
    });

    dialogRef.afterClosed().subscribe(v => {
      if (v) this.loadData();
    });
  }

  public delete(): void {
    //
  }
}
