import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '@mix/mix.share';

@Component({
  selector: 'mix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nesto-account';

  constructor(public authService: AuthApiService) {}

  ngOnInit(): void {
    this.authService.fetchUserInfo().subscribe({
      next: res => {
        this.authService.user$.next(res);
        this.authService.isAuthorized$.next(true);
      },
      error: () => {
        //
      }
    });
  }
}
