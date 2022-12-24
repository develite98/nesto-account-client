import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { SignUpModel } from '@mix/mix.lib';
import { AuthApiService, FormUtils, ShareApiService } from '@mix/mix.share';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'mix-nesto-footer',
  templateUrl: './nesto-footer.component.html',
  styleUrls: ['./nesto-footer.component.scss']
})
export class NestoFooterComponent {
  public nestoHost = 'http://nesto.tanconstructions.com.au/';
  public navigation = {
    product: this.nestoHost + 'products',
    collection: this.nestoHost + 'collection',
    stories: this.nestoHost + 'stories',
    about: this.nestoHost + 'about-us',
    contact: this.nestoHost + 'contact-us',
    career: this.nestoHost + 'career',
    blogs: this.nestoHost + 'blogs',
    search: this.nestoHost + 'search',
    account: this.nestoHost + 'customer-account/account-information',
    checkout: this.nestoHost + 'customer-account/cart/delivery-payment',
    cart: this.nestoHost + 'customer-account/cart',
    faq: this.nestoHost + 'faq',
    ordering: this.nestoHost + 'ordering-shipping',
    return: this.nestoHost + 'return-policies',
    partner: this.nestoHost + 'partner-ship'
  };

  public confirmationValidator = (
    control: FormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public signupForm: FormGroup = this.fb.group({
    userName: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required, this.confirmationValidator]]
  });

  constructor(
    private fb: FormBuilder,
    private shareSetting: ShareApiService,
    private authSrv: AuthApiService,
    private toast: HotToastService,
    private cdr: ChangeDetectorRef
  ) {}

  public createAccount(): void {
    if (FormUtils.validateForm(this.signupForm)) {
      const registerData: SignUpModel = {
        ...this.signupForm.value,
        email: this.signupForm.value.userName
      };

      this.authSrv
        .register(registerData)
        .pipe(
          this.toast.observe({
            success: 'Successfully create your account',
            loading: 'Creating . . .',
            error: 'Something wrong, please try again'
          })
        )
        .subscribe(() => {
          (window as any)['headerService'].login.next();
        });
    }
  }
}
