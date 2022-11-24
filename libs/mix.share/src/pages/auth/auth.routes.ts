import { Route } from '@angular/router';

import { MixLoginComponent } from './login/login.component';

export const AUTH_ROUTES: Route[] = [
  {
    path: 'login',
    component: MixLoginComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
