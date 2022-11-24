import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppEvent, AppEventService, MixMenuTemplateItem } from '@mix/mix.share';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { TUI_ARROW, TuiAccordionModule, TuiArrowModule } from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';

import { RouteConfig } from '../../routes/route.const';

@Component({
  selector: 'mix-cms-user-menu',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    TuiAccordionModule,
    TuiButtonModule,
    TuiArrowModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    RouterModule,
    TablerIconsModule
  ],
  templateUrl: './user-menu.component.html'
})
export class UserMenuComponent {
  public readonly arrow = TUI_ARROW;
  public readonly routes = RouteConfig;
  public readonly events = AppEvent;
  public open = false;

  public items: MixMenuTemplateItem[] = [
    {
      groupName: 'Users',
      icon: 'notebook',
      child: [
        {
          title: 'All',
          action: () => this.navigateTo(RouteConfig.User),
          icon: 'list-numbers'
        },
        {
          title: 'Create new',
          action: () => undefined,
          icon: 'list-numbers'
        }
      ]
    },
    {
      groupName: 'Access Rights',
      icon: 'notebook',
      child: [
        {
          title: 'Permissions',
          action: () => undefined,
          icon: 'list-numbers'
        },
        {
          title: 'Roles',
          action: () => this.navigateTo(RouteConfig.UserRole),
          icon: 'list-numbers'
        }
      ]
    }
  ];

  constructor(private route: Router, public appEvent: AppEventService) {}

  public navigateTo(route: string): void {
    this.route.navigateByUrl(`${route}`);
  }
}
