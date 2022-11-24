import { Route } from '@angular/router';

export const SETTING_ROUTES: Route[] = [
  {
    path: 'personalization',
    data: { title: 'Personalization' },
    loadComponent: () =>
      import('./persionalization/persionalization.component').then(
        c => c.PersionalizationComponent
      )
  },
  {
    path: 'global-config',
    data: { title: 'Global Metadata' },
    loadComponent: () =>
      import('./global-config/global-config.component').then(
        c => c.GlobalConfigComponent
      )
  },
  {
    path: '',
    redirectTo: 'personalization',
    pathMatch: 'full'
  }
];
