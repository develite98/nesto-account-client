import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthApiService, BaseComponent } from '@mix/mix.share';

import { Address } from '../../models/user-data.model';
import { NestoUserDataApiService } from '../../services/nesto-api.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AddressFormComponent } from './address-form/address-form.component';

@Component({
  selector: 'mix-account-address',
  templateUrl: './account-address.component.html',
  styleUrls: ['./account-address.component.scss']
})
export class AccountAddressComponent extends BaseComponent implements OnInit {
  public currentAddress: Address[] = [];

  constructor(
    public dialog: MatDialog,
    private authApi: AuthApiService,
    public nestoUserData: NestoUserDataApiService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.authApi
      .fetchUserData()
      .pipe(
        this.observerLoadingState(),
        this.toast.observe({
          success: 'Successfully load your address',
          error: '',
          loading: 'Loading your address'
        })
      )
      .subscribe(result => {
        this.currentAddress = result.addresses ?? [];
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

  public updateAddress(address: Address): void {
    const dialogRef = this.dialog.open(AddressFormComponent, {
      panelClass: 'nesto-dialog',
      data: {
        address: address,
        mode: 'update'
      }
    });

    dialogRef.afterClosed().subscribe(v => {
      if (v) this.loadData();
    });
  }

  public delete(id: number): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `Do you want to delete this address`
      })
      .afterClosed()
      .subscribe((yes: boolean) => {
        if (yes) {
          this.nestoUserData
            .deleteAddress(id)
            .pipe(
              this.toast.observe({
                success: 'Successfully',
                error: '',
                loading: 'Deleting your address '
              })
            )
            .subscribe(() => this.loadData());
        } else {
          return;
        }
      });
  }
}
