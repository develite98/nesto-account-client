import { Component } from '@angular/core';
import { AuthApiService } from '@mix/mix.share';

@Component({
  selector: 'mix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nesto-account';

  constructor(public authService: AuthApiService) {}
}
