import { Route } from '@angular/router';

export const PAGE_ROUTES: Route[] = [
  {
    path: 'list',
    loadComponent: () =>
      import('./list/page-list.component').then(c => c.PageListComponent),
    data: { title: 'List' }
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create/page-create.component').then(c => c.PageCreateComponent),
    data: { title: 'Create' }
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/page-detail.component').then(c => c.PageDetailComponent),
    data: {
      title: 'Detail'
    }
  }
];
