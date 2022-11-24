import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TuiAccordionModule } from '@taiga-ui/kit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { MixMenuTemplateItem } from 'libs/mix.share/src/components/side-menu';

import { RouteConfig } from '../../routes/route.const';

@Component({
  selector: 'mix-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  standalone: true,
  imports: [CommonModule, TuiAccordionModule, RouterModule]
})
export class DashboardMenuComponent {
  public readonly routes = RouteConfig;

  public items: MixMenuTemplateItem[] = [
    {
      groupName: 'Dashboard',
      child: [
        {
          title: 'Dashboard',
          action: () => this.navigateTo(this.routes.PortalDashboard)
        },
        {
          title: 'News',
          action: () => this.navigateTo(this.routes.PortalDashboard)
        }
      ]
    },
    {
      groupName: 'Site',
      child: [
        {
          title: 'Preview your site',
          action: () => this.navigateTo(this.routes.PortalDashboard)
        },
        {
          title: 'Clear cache',
          action: () => this.navigateTo(this.routes.PortalDashboard)
        }
      ]
    }
  ];

  constructor(private route: Router) {}

  public navigateTo(route: string): void {
    this.route.navigateByUrl(`portal/${route}`);
  }
}
