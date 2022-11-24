import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppEvent, AppEventService } from '@mix/mix.share';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { TUI_ARROW, TuiAccordionModule, TuiArrowModule } from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { MixMenuTemplateItem } from 'libs/mix.share/src/components/side-menu';

import { RouteConfig } from '../../routes/route.const';

@Component({
  selector: 'mix-content-menu',
  templateUrl: './content-menu.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TuiAccordionModule,
    TuiButtonModule,
    TuiArrowModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiDropdownModule,
    RouterModule,
    TablerIconsModule
  ]
})
export class ContentMenuComponent {
  public readonly arrow = TUI_ARROW;
  public readonly routes = RouteConfig;
  public readonly events = AppEvent;
  public open = false;

  public items: MixMenuTemplateItem[] = [
    {
      groupName: 'Page',
      icon: 'notebook',
      child: [
        {
          title: 'All',
          action: () => this.navigateTo(this.routes.PageList),
          icon: 'list-numbers'
        },
        {
          title: 'Published',
          action: () => this.navigateTo(this.routes.PageList),
          icon: 'list-numbers',
          showDot: true,
          dotColor: '#4BD28F'
        },
        {
          title: 'Create',
          action: () => this.createNew('CreatePage'),
          icon: 'plus'
        }
      ]
    },
    {
      groupName: 'Post',
      icon: 'clipboard-list',
      child: [
        {
          title: 'All',
          action: () => this.navigateTo(this.routes.PostList),
          icon: 'list-numbers'
        },
        {
          title: 'Published',
          action: () => this.navigateTo(this.routes.PostList),
          icon: 'list-numbers',
          showDot: true,
          dotColor: '#4BD28F'
        },
        {
          title: 'Create',
          action: () => this.createNew('CreatePost'),
          icon: 'plus'
        }
      ]
    },
    {
      groupName: 'Module',
      icon: 'components',
      child: [
        {
          title: 'All',
          action: () => this.navigateTo(this.routes.ModuleList),
          icon: 'list-numbers'
        },
        {
          title: 'Published',
          action: () => this.navigateTo(this.routes.ModuleList),
          icon: 'list-numbers',
          showDot: true,
          dotColor: '#4BD28F'
        },
        {
          title: 'Create',
          action: () => this.createNew('CreateModule'),
          icon: 'plus'
        }
      ]
    },
    {
      groupName: 'Database',
      icon: 'database',
      child: [
        {
          title: 'All tables',
          action: () => this.navigateTo(this.routes.DatabaseList),
          icon: 'list-numbers'
        },
        {
          title: 'Create',
          action: () => this.navigateTo(this.routes.DatabaseCreate),
          icon: 'plus'
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
