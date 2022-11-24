import { Route } from '@angular/router';

export const MODULES_ROUTES: Route[] = [
  {
    path: 'list',
    loadComponent: () =>
      import('./list/module-list.component').then(c => c.ModuleListComponent),
    data: { title: 'List' }
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create/module-create.component').then(
        c => c.ModuleCreateComponent
      ),
    data: { title: 'Create' }
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/module-detail.component').then(
        c => c.ModuleDetailComponent
      ),
    data: {
      title: 'Detail'
    }
  }
];
