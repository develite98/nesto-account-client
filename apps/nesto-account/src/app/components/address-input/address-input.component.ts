import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent, FormUtils, ProvinceApiService } from '@mix/mix.share';

import { Address } from '../../models/user-data.model';
import { NestoUserDataApiService } from '../../services/nesto-api.service';

@Component({
  selector: 'mix-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent extends BaseComponent implements OnInit {
  @Input() public mode: 'create' | 'update' = 'create';
  @Input() public address?: Address;
  public allProvinces: { name: string; code: string; districts: [] }[] = [];
  public currentDistrict: { name: string; code: string; wards: [] }[] = [];
  public currentWards: { name: string; code: string }[] = [];

  public addressForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    street: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    note: new FormControl(''),
    district: new FormControl('', Validators.required),
    ward: new FormControl(''),
    isDefault: new FormControl(false)
  });

  constructor(
    public provinceApi: ProvinceApiService,
    public nestoUserData: NestoUserDataApiService,
    @Optional() public dialogRef: MatDialogRef<AddressInputComponent>
  ) {
    super();
  }

  public ngOnInit(): void {
    if (this.mode == 'update' && this.address) {
      this.addressForm.controls['name'].setValue(this.address.name);
      this.addressForm.controls['email'].setValue(this.address.email);
      this.addressForm.controls['phone'].setValue(this.address.phone);
      this.addressForm.controls['isDefault'].setValue(this.address.isDefault);
      this.addressForm.controls['note'].setValue(this.address.note);
      this.addressForm.controls['street'].setValue(this.address.street);
    }

    this.provinceApi.getProvince().subscribe(p => {
      this.allProvinces = p;
      this.addressForm.controls['province'].setValue(p[0].code);
    });

    this.addressForm.controls['province'].valueChanges.subscribe(code => {
      this.currentDistrict =
        this.allProvinces.find(v => v.code === code)?.districts ?? [];
      this.addressForm.controls['district'].setValue(
        this.currentDistrict[0].code
      );
    });

    this.addressForm.controls['district'].valueChanges.subscribe(code => {
      this.currentWards =
        this.currentDistrict.find(v => v.code === code)?.wards ?? [];
      this.addressForm.controls['ward'].setValue(this.currentWards[0].code);
    });
  }

  public submitAddress(callback?: (address: any) => void): void {
    if (FormUtils.validateForm(this.addressForm)) {
      const address = {
        name: this.addressForm.value.name,
        phone: this.addressForm.value.phone,
        email: this.addressForm.value.email,
        street: this.addressForm.value.street,
        note: this.addressForm.value.note,
        isDefault: this.addressForm.value.isDefault,
        province: this.allProvinces.find(
          v => v.code === this.addressForm.value.province
        )?.name,
        district: this.currentDistrict.find(
          v => v.code === this.addressForm.value.district
        )?.name,
        ward: this.currentWards.find(
          v => v.code === this.addressForm.value.ward
        )?.name
      };

      if (this.mode === 'create') {
        this.nestoUserData
        .addAddress(address)
        .pipe(
          this.toast.observe({
            loading: 'Adding your shipping address...',
            success: 'Successfully add your shipping address',
            error: 'Something wrong, please try again'
          })
        )
        .subscribe({
          next: (result) => {
            if (callback) {
              callback(result)
            } else {
              this.dialogRef.close(true);
            }
          }
        });
      } else {
        this.nestoUserData
        .updateAddress({
          ...this.address,
          ...address
        })
        .pipe(
          this.toast.observe({
            loading: 'Updating your shipping address...',
            success: 'Successfully add your shipping address',
            error: 'Something wrong, please try again'
          })
        )
        .subscribe({
          next: (result) => {
            if (callback) {
              callback(result)
            } else {
              this.dialogRef.close(true);
            }
          }
        });
      }
    }
  }
}
