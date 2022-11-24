import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  AppEvent,
  AppEventService,
  DestroyService,
  ThemeFileTreeComponent
} from '@mix/mix.share';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { TUI_ARROW, TuiAccordionModule, TuiArrowModule } from '@taiga-ui/kit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { MixMenuTemplateItem } from 'libs/mix.share/src/components/side-menu';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ResizeObserverDirective } from 'libs/mix.share/src/components/side-menu/resize-observer.directive';

import { RouteConfig } from '../../routes/route.const';

@Component({
  selector: 'mix-universe-application-menu',
  templateUrl: './application-menu.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TuiAccordionModule,
    TuiButtonModule,
    TuiArrowModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    RouterModule,
    ThemeFileTreeComponent,
    ResizeObserverDirective
  ],
  providers: [DestroyService]
})
export class ApplicationMenuComponent {
  public readonly arrow = TUI_ARROW;
  public readonly routes = RouteConfig;
  public items: MixMenuTemplateItem[] = [
    {
      groupName: 'Applications',
      child: [
        {
          title: 'Manage apps',
          action: () => this.navigateTo(RouteConfig.ApplicationsList)
        }
      ]
    },
    {
      groupName: 'Mix Market',
      child: [
        {
          title: 'Visit',
          action: () => this.navigateTo('')
        },
        {
          title: 'View template',
          action: () => this.navigateTo('')
        }
      ]
    }
  ];

  constructor(
    private route: Router,
    public appEvent: AppEventService,
    public destroy$: DestroyService,
    private host: ElementRef
  ) {}

  public navigateTo(route: string): void {
    this.route.navigateByUrl(`${route}`);
  }

  public installApp(): void {
    this.appEvent.notify({ type: AppEvent.InstallApp });
  }
}
