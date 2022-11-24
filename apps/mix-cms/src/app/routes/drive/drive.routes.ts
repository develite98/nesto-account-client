import { Route } from '@angular/router';

export const DRIVE_ROUTES: Route[] = [
  {
    path: 'app-drive',
    loadComponent: () =>
      import('./my-drive/drive.component').then(c => c.DriveComponent)
  },
  {
    path: 'medias',
    loadComponent: () =>
      import('./medias/medias.component').then(c => c.MediasComponent)
  },
  {
    path: '',
    redirectTo: 'app-drive',
    pathMatch: 'full'
  }
];
