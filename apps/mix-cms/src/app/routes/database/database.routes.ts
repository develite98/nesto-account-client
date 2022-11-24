import { Route } from '@angular/router';

export const DATABASE_ROUTES: Route[] = [
  {
    path: 'list',

    loadComponent: () =>
      import('./list/list-database.component').then(
        c => c.ListDatabaseComponent
      ),
    data: { title: 'List' }
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create/database-create.component').then(
        c => c.DatabaseCreateComponent
      ),
    data: { title: 'Create' }
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/database-detail.component').then(
        c => c.DatabaseDetailComponent
      ),
    data: {
      title: 'Detail'
    }
  }
];
