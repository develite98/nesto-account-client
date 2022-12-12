import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent, FormUtils, ProvinceApiService } from '@mix/mix.share';

import { NestoUserDataApiService } from '../../../services/nesto-api.service';

@Component({
  selector: 'mix-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddressFormComponent extends BaseComponent {
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
    ward: new FormControl('')
  });

  constructor(
    public provinceApi: ProvinceApiService,
    public nestoUserData: NestoUserDataApiService,
    public dialogRef: MatDialogRef<AddressFormComponent>
  ) {
    super();
  }

  public ngOnInit(): void {
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

  public submitAddress(): void {
    if (FormUtils.validateForm(this.addressForm)) {
      const address = {
        Name: this.addressForm.value.name,
        Phone: this.addressForm.value.phone,
        Email: this.addressForm.value.email,
        Street: this.addressForm.value.street,
        Note: this.addressForm.value.note,
        Province: this.allProvinces.find(
          v => v.code === this.addressForm.value.province
        )?.name,
        District: this.currentDistrict.find(
          v => v.code === this.addressForm.value.district
        )?.name
      };

      this.nestoUserData
        .addAddress(address)
        .pipe(
          this.toast.observe({
            loading: 'Thêm địa chỉ...',
            success: 'Thêm địa chỉ thành công',
            error: 'Có lỗi xảy ra, hãy thử lại'
          })
        )
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
          }
        });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
