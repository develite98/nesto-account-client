import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent, DynamicDbApiService, FormUtils } from '@mix/mix.share';

@Component({
  selector: 'mix-get-invitation-form',
  templateUrl: './get-invitation-form.component.html',
  styleUrls: ['./get-invitation-form.component.scss']
})
export class GetInvitationFormComponent extends BaseComponent {
  constructor(public dbApi: DynamicDbApiService) {
    super();
  }

  public emailPattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public getInvitationForm = new FormGroup({
    email: new FormControl('', [Validators.required, this.emailValidator])
  });

  public submitGetInvitation(): void {
    if (FormUtils.validateForm(this.getInvitationForm)) {
      this.dbApi.postDb(this.getInvitationForm.value, 'customer_email').pipe(
        this.observerLoadingState(),
        this.toast.observe({
          success: 'We successfully get your data, thank you.',
          loading: 'Sending your information.'
        })).subscribe(() => {
          this.getInvitationForm.reset();
        });
    }
  }
}
