import { CommonModule } from '@angular/common';
import { Component, Inject, Injector } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppEventService, MixMenuTemplateItem } from '@mix/mix.share';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogService,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { TUI_ARROW, TuiAccordionModule, TuiArrowModule } from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';

import { RouteConfig } from '../../routes/route.const';

@Component({
  selector: 'mix-drive-menu',
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
  ],
  templateUrl: './drive-menu.component.html',
  styleUrls: ['./drive-menu.component.scss']
})
export class DriveMenuComponent {
  public readonly arrow = TUI_ARROW;
  public readonly routes = RouteConfig;
  public open = false;
  public items: MixMenuTemplateItem[] = [
    {
      groupName: 'App Drive',
      child: [
        {
          title: 'All',
          action: () => this.navigateTo(this.routes.AppDrive)
        },
        {
          title: 'Images',
          action: () => this.navigateTo(this.routes.Medias)
        }
      ]
    }
  ];

  constructor(
    private route: Router,
    public appEvent: AppEventService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  public navigateTo(route: string): void {
    this.route.navigateByUrl(`${route}`);
  }
}
