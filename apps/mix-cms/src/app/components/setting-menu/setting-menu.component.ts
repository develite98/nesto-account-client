import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppEvent, AppEventService } from '@mix/mix.share';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { TUI_ARROW, TuiAccordionModule, TuiArrowModule } from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { MixMenuTemplateItem } from 'libs/mix.share/src/components/side-menu';

import { RouteConfig } from '../../routes/route.const';

@Component({
  selector: 'mix-setting-menu',
  templateUrl: './setting-menu.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TuiAccordionModule,
    TuiButtonModule,
    TuiArrowModule,
    TuiDataListModule,
    TuiHostedDropdownModule,

    RouterModule,
    TablerIconsModule
  ]
})
export class SettingMenuComponent {
  public readonly arrow = TUI_ARROW;
  public readonly routes = RouteConfig;
  public readonly events = AppEvent;
  public open = false;

  public items: MixMenuTemplateItem[] = [
    {
      groupName: 'Workspace',
      icon: 'notebook',
      child: [
        {
          title: 'Personalization',
          action: () => this.navigateTo(this.routes.Settings),
          icon: 'list-numbers'
        },
        {
          title: 'Accessibility',
          action: () => this.navigateTo(this.routes.Settings),
          icon: 'list-numbers'
        }
      ]
    },
    {
      groupName: 'System',
      icon: 'clipboard-list',
      child: [
        {
          title: 'Global Setting',
          action: () => this.navigateTo(this.routes.GlobalConfig),
          icon: 'list-numbers'
        },
        {
          title: 'Local Setting',
          action: () => this.navigateTo(this.routes.Settings),
          icon: 'list-numbers'
        },
        {
          title: 'Language',
          action: () => this.navigateTo(this.routes.Settings),
          icon: 'list-numbers'
        }
      ]
    }
  ];

  constructor(private route: Router, public appEvent: AppEventService) {}

  public navigateTo(route: string): void {
    this.route.navigateByUrl(`${route}`);
  }

  public createNew(type: 'CreatePage' | 'CreatePost' | 'CreateModule'): void {
    switch (type) {
      case 'CreatePage':
        this.appEvent.notify({ type: AppEvent.CreatePage });
        break;
      case 'CreatePost':
        this.appEvent.notify({ type: AppEvent.CreatePost });
        break;
      default:
        this.appEvent.notify({ type: AppEvent.CreateModule });
        break;
    }

    this.open = false;
  }
}
