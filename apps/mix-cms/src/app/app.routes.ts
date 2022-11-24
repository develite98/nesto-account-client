import { Route } from '@angular/router';

import { MixCmsLayoutComponent } from './layouts/cms-layout/cms-layout.component';
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
        path: RouteConfig.PortalDashboard,
        component: DashBoardComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: RouteConfig.Post,
        loadChildren: () =>
          import('./routes/post/post.routes').then(m => m.POST_ROUTES)
      },
      {
        path: RouteConfig.Page,
        loadChildren: () =>
          import('./routes/page/page.routes').then(m => m.PAGE_ROUTES)
      },
      {
        path: RouteConfig.Module,
        loadChildren: () =>
          import('./routes/module/module.routes').then(m => m.MODULES_ROUTES)
      },
      {
        path: RouteConfig.Database,
        loadChildren: () =>
          import('./routes/database/database.routes').then(
            m => m.DATABASE_ROUTES
          )
      },
      {
        path: RouteConfig.Theme,
        data: { title: 'Theme' },
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./routes/theme/list/list-theme.component').then(
                m => m.ListThemeComponent
              ),
            data: { title: 'List' }
          },
          {
            path: ':themeId/template',
            loadComponent: () =>
              import('./routes/theme/template/template.component').then(
                m => m.TemplateComponent
              ),
            data: { title: 'Template' }
          },
          {
            path: ':themeId/template/:templateId',
            loadComponent: () =>
              import(
                './routes/theme/template-detail/template-detail.component'
              ).then(m => m.TemplateDetailComponent),
            data: { title: 'Template' }
          },
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: RouteConfig.Drive,
        data: { title: 'Drive' },
        loadChildren: () =>
          import('./routes/drive/drive.routes').then(m => m.DRIVE_ROUTES)
      },
      {
        path: RouteConfig.User,
        data: { title: 'User' },
        loadChildren: () =>
          import('./routes/users/user.routes').then(m => m.USER_ROUTES)
      },
      {
        path: RouteConfig.Settings,
        data: { title: 'Settings' },
        loadChildren: () =>
          import('./routes/settings/setting.routes').then(m => m.SETTING_ROUTES)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
