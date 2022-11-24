import { Route } from '@angular/router';

export const USER_ROUTES: Route[] = [
  {
    path: 'users',
    data: { title: 'List' },
    loadComponent: () =>
      import('./list/users.component').then(m => m.UsersComponent)
  },
  {
    path: 'roles',
    data: { title: 'Roles' },
    loadComponent: () =>
      import('./roles/roles.component').then(m => m.RolesComponent)
  },
  {
    path: ':id',
    data: { title: 'Profile' },
    loadComponent: () =>
      import('./user-profile/user-profile.component').then(
        m => m.UserProfileComponent
      )
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];
