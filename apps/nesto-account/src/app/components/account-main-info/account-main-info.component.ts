import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthApiService, DestroyService } from '@mix/mix.share';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mix-account-main-info',
  templateUrl: './account-main-info.component.html',
  styleUrls: ['./account-main-info.component.scss'],
  providers: [DestroyService]
})
export class AccountMainInfoComponent implements OnInit {
  public dayControl = new FormControl();
  public monthControl = new FormControl();
  public yearControl = new FormControl();

  constructor(public authService: AuthApiService, public destroy$: DestroyService) {
    //
  }

  public ngOnInit(): void {
    this.authService.isAuthorized$.pipe(takeUntil(this.destroy$)).subscribe((isAuthorized) => {
      if (isAuthorized) {
        this.authService.fetchUserInfo().subscribe(u => console.log(u));
        this.authService.fetchUserData().subscribe(i => console.log(i))
      }
    })
  }

}
