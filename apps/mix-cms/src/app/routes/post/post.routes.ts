import { Route } from '@angular/router';

export const POST_ROUTES: Route[] = [
  {
    path: 'list',
    loadComponent: () =>
      import('./list/list-post.component').then(c => c.ListPostComponent),
    data: { title: 'List' }
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create/post-create.component').then(c => c.PostCreateComponent),
    data: { title: 'Create' }
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/post-detail.component').then(c => c.PostDetailComponent),
    data: {
      title: 'Detail'
    }
  }
];
