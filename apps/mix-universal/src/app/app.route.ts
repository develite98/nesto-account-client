import { Route } from '@angular/router';

import { MixCmsLayoutComponent } from './layouts/universe-layout/universe-layout.component';
import { ListApplicationComponent } from './routes/applications/list/list-application.component';
import { DashBoardComponent } from './routes/dashboard/dashboard.component';
import { RouteConfig } from './routes/route.const';

export const app_routes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('@mix/mix-page').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    component: MixCmsLayoutComponent,
    data: { title: 'Home' },
    children: [
      {
        path: RouteConfig.Dashboard,
        component: DashBoardComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: RouteConfig.Applications,
        data: { title: 'Apps' },
        children: [
          {
            path: 'list',
            component: ListApplicationComponent,
            data: { title: 'Installed' }
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
