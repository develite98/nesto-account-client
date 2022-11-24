import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  AppEvent,
  AppEventService,
  DestroyService,
  MixMenuTemplateItem,
  ThemeFileTreeComponent
} from '@mix/mix.share';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { TUI_ARROW, TuiAccordionModule, TuiArrowModule } from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';
import { filter, takeUntil } from 'rxjs';

import { RouteConfig } from '../../routes/route.const';

@Component({
  selector: 'mix-template-menu',
  templateUrl: './template-menu.component.html',
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
    TablerIconsModule
  ],
  providers: [DestroyService]
})
export class TemplateMenuComponent {
  public readonly arrow = TUI_ARROW;
  public readonly routes = RouteConfig;
  public items: MixMenuTemplateItem[] = [
    {
      groupName: 'Theme',
      child: [
        {
          title: 'List theme',
          action: () => this.navigateTo(this.routes.ThemeList),
          icon: 'list-numbers'
        },
        {
          title: 'Create new',
          action: () => this.createNewTheme(),
          icon: 'plus'
        }
      ]
    },
    {
      groupName: 'Mix Market',
      child: [
        {
          title: 'Visit',
          action: () => this.navigateTo(this.routes.ThemeList)
        },
        {
          title: 'View template',
          action: () => this.navigateTo(this.routes.ThemeList)
        }
      ]
    }
  ];

  public selectedThemeId: number | undefined = undefined;
  public selectedTheme: { title: string; id: number }[] = [];

  public fileTreeHeight = '50vh';
  @ViewChild('mainMenu', { static: true }) public mainMenu!: ElementRef;
  constructor(
    private route: Router,
    public appEvent: AppEventService,
    public destroy$: DestroyService,
    private host: ElementRef
  ) {
    this.appEvent.event$
      .pipe(
        filter(e => e.type === AppEvent.ThemeSelected),
        takeUntil(this.destroy$)
      )
      .subscribe(e => {
        if (this.selectedTheme.find(i => i.id == e.data.id)) {
          return;
        }

        this.selectedTheme.push(e.data);
        this.selectedThemeId = e.data.id;
      });
  }

  public resizeChange(entry: ResizeObserverEntry): void {
    const fullHeight = this.host.nativeElement.children[0].clientHeight;
    const menuHeight = this.mainMenu.nativeElement.clientHeight;
    this.fileTreeHeight = `${fullHeight - menuHeight - 150}px`;
  }

  public navigateTo(route: string): void {
    this.route.navigateByUrl(`${route}`);
  }

  public createNewTheme(): void {
    this.appEvent.notify({ type: AppEvent.CreateTheme });
  }
}
