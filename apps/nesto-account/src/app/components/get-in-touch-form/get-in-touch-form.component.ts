import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent, DynamicDbApiService, FormUtils } from '@mix/mix.share';

@Component({
  selector: 'mix-get-in-touch-form',
  templateUrl: './get-in-touch-form.component.html',
  styleUrls: ['./get-in-touch-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GetInTouchFormComponent extends BaseComponent {
  constructor(public dbApi: DynamicDbApiService) {
    super();
  }

  public emailPattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
  public phoneNumber = new RegExp(
    '^(\\+\\d{1,2}\\s?)?1?\\-?\\.?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$'
  );

  public emailValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    }
    return this.emailPattern.test(control.value)
      ? {}
      : {
          email: true
        };
  };

  public phoneNumberValidator = (
    control: FormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    }
    return this.phoneNumber.test(control.value)
      ? {}
      : {
          phoneNumber: true
        };
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public getInTouchForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phonenumber: new FormControl('', [
      Validators.required,
      this.phoneNumberValidator
    ]),
    email: new FormControl('', [Validators.required, this.emailValidator]),
    message: new FormControl('')
  });

  public submitGetInTouch(): void {
    if (FormUtils.validateForm(this.getInTouchForm)) {
      this.dbApi.postDb(this.getInTouchForm.value, 'customer_contact').pipe(
        this.observerLoadingState(),
        this.toast.observe({
          success: 'We successfully get your data, thank you.',
          loading: 'Sending your information.'
        })).subscribe(() => {
          this.getInTouchForm.reset();
        });
    }
  }
}
