import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog,MatDialogRef } from '@angular/material/dialog';

import { Address } from '../../models/user-data.model';
import { AddressInputComponent } from '../address-input/address-input.component';

@Component({
  selector: 'mix-address-selected-dialog',
  templateUrl: './address-selected-dialog.component.html',
  styleUrls: ['./address-selected-dialog.component.scss']
})
export class AddressSelectedDialogComponent {
  @ViewChild('createForm') public addressForm!: AddressInputComponent;
  @ViewChild('updateForm') public updateForm!: AddressInputComponent;
  public mode: 'select' | 'create' | 'update' = 'select'
  public availableAddress: Address[] = [];
  public selectedAddressId = 0;
  public currentUpdateAddress?: Address;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<AddressSelectedDialogComponent>,
    public matDialog: MatDialog
  ) {
    this.availableAddress = data.addresses;
    this.selectedAddressId = data.selectedAddress;
  }

  public submit(): void {
    if (this.mode === 'select') {
      this.dialog.close({
        selectedAddress: this.availableAddress.find(
          add => add.id === this.selectedAddressId
        ),
        availableAddress: this.availableAddress
      });
    } else if (this.mode === 'create') {
      this.addressForm.submitAddress((result) => {
        if (result && result.addresses && result.addresses.length) {
          this.availableAddress = result.addresses;
          this.selectedAddressId = result.addresses[result.addresses.length - 1].id;
          this.mode = 'select';
        }
      })
    } else if (this.mode === 'update') {
      this.updateForm.submitAddress((result) => {
        if (result && result.addresses && result.addresses.length) {
          this.availableAddress = result.addresses;
          this.mode = 'select';
        }
      })
    }

  }

  public close(): void {
    this.dialog.close({
      selectedAddress: this.availableAddress.find(
        add => add.id === this.selectedAddressId
      ),
      availableAddress: this.availableAddress
    });
  }

  public updateAddress(address: Address): void {
    this.currentUpdateAddress = address;
    this.mode = 'update';
  }
}
