import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '@mix/mix.share';

import { HeaderService } from './components/header/header.service';

@Component({
  selector: 'mix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthApiService,
    public headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.authService.fetchUserInfo().subscribe({
      next: res => {
        // this.authService.user$.next(res);
        // this.authService.isAuthorized$.next(true);
      },
      error: () => {
        //
      }
    });
  }
}
