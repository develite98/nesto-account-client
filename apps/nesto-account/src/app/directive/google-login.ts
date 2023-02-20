import { Directive, ElementRef,Input, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { take } from 'rxjs';

declare let google: { accounts: { id: { renderButton: (arg0: any, arg1: { type: string; size: string; text: string; theme: string; }) => void; }; }; };


@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'google-signin-butt'
})
export class GoogleSigninButtDirective implements OnInit {
  @Input() public selectable = true;

  constructor(private el: ElementRef, private socialAuthService: SocialAuthService) {
  }

  ngOnInit() {
      if (!this.selectable) return;
      this.socialAuthService.initState.pipe(take(1)).subscribe(() => {
          google.accounts.id.renderButton(this.el.nativeElement, {
              type: 'standard',
              size: 'medium',
              text: 'signin_with',
              theme: 'filled_blue'
          });
      });
  }
}
