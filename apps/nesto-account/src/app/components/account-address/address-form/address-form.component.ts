import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent, FormUtils, ProvinceApiService } from '@mix/mix.share';

import { Address } from '../../../models/user-data.model';
import { NestoUserDataApiService } from '../../../services/nesto-api.service';

@Component({
  selector: 'mix-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddressFormComponent extends BaseComponent implements OnInit {
  @Input() public address?: Address;
  @Input() public mode: 'create' | 'update' = 'create';

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
    public dialogRef: MatDialogRef<AddressFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.address = data?.address;
    this.mode = data?.mode ?? 'create';
  }

  public get isUpdate(): boolean {
    return this.mode === 'update';
  }

  public ngOnInit(): void {
    if (this.isUpdate && this.address) {
      this.addressForm.controls['name'].setValue(this.address.name);
      this.addressForm.controls['email'].setValue(this.address.email);
      this.addressForm.controls['phone'].setValue(this.address.phone);
      this.addressForm.controls['isDefault'].setValue(this.address.isDefault);
      this.addressForm.controls['note'].setValue(this.address.note);
      this.addressForm.controls['street'].setValue(this.address.street);
    }

    this.provinceApi.getProvince().subscribe(p => {
      this.allProvinces = p;
      if (this.isUpdate) {
        const province = this.allProvinces.find(
          p => p.name === this.address?.province
        );

        this.addressForm.controls['province'].setValue(
          province?.code ?? p[0].code
        );
      } else {
        this.addressForm.controls['province'].setValue(p[0].code);
      }
    });

    this.addressForm.controls['province'].valueChanges.subscribe(code => {
      this.currentDistrict =
        this.allProvinces.find(v => v.code === code)?.districts ?? [];

      this.addressForm.controls['district'].setValue(
        this.currentDistrict[0].code
      );

      if (this.isUpdate) {
        const district = this.currentDistrict.find(
          d => d.name === this.address?.district
        );

        this.addressForm.controls['district'].setValue(
          district?.code ?? this.currentDistrict[0].code
        );
      } else {
        this.addressForm.controls['district'].setValue(
          this.currentDistrict[0].code
        );
      }
    });

    this.addressForm.controls['district'].valueChanges.subscribe(code => {
      this.currentWards =
        this.currentDistrict.find(v => v.code === code)?.wards ?? [];

      if (this.isUpdate) {
        const wards = this.currentWards.find(
          d => d.name === this.address?.ward
        );

        this.addressForm.controls['ward'].setValue(
          wards?.code || this.currentWards[0].code
        );
      } else {
        this.addressForm.controls['ward'].setValue(this.currentWards[0].code);
      }
    });
  }

  public submitAddress(): void {
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

      if (this.isUpdate) {
        this.nestoUserData
          .updateAddress({
            ...this.address,
            ...address
          })
          .pipe(
            this.toast.observe({
              loading: 'Updating shipping address...',
              success: 'Successfully update your address',
              error: 'Something wrong, please try again'
            })
          )
          .subscribe({
            next: (result) => {
              this.dialogRef.close(result);
            }
          });
      } else {
        this.nestoUserData
          .addAddress(address)
          .pipe(
            this.toast.observe({
              loading: 'Add your shipping address...',
              success: 'Successfully add your address',
              error: 'Something wrong, please try again'
            })
          )
          .subscribe({
            next: (result) => {
              this.dialogRef.close(result);
            }
          });
      }
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
