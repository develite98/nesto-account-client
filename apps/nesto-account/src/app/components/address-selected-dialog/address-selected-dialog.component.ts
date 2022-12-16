import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Address } from '../../models/user-data.model';

@Component({
  selector: 'mix-address-selected-dialog',
  templateUrl: './address-selected-dialog.component.html',
  styleUrls: ['./address-selected-dialog.component.scss']
})
export class AddressSelectedDialogComponent {
  public availableAddress: Address[] = [];
  public selectedAddressId = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<AddressSelectedDialogComponent>
  ) {
    this.availableAddress = data.addresses;
    this.selectedAddressId = data.selectedAddress;
  }

  public submit(): void {
    this.dialog.close({
      selectedAddress: this.availableAddress.find(
        add => add.id === this.selectedAddressId
      )
    });
  }

  public selectedChange(item: any): void {
    console.log(item);
  }
}
