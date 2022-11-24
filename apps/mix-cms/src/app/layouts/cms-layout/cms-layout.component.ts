import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule
} from '@angular/router';
import { VerticalDisplayPosition } from '@mix/mix.lib';
import {
  AppEvent,
  AppEventService,
  HeaderMenuComponent,
  LocationService,
  MessengerComponent,
  MixChatListMiniComponent,
  MixSubWorkSpaceContainerComponent,
  MixWindowToolbarComponent,
  PortalSidebarControlService,
  PortalSidebarHostComponent,
  ShareModule,
  ShortcutGuideComponent,
  SidebarContainerComponent,
  SideMenuChildItemDirective,
  SideMenuComponent,
  SubWorkspaceControllerService,
  TabControlDialogComponent,
  UniversalSearchComponent
} from '@mix/mix.share';
import { TuiDialogService } from '@taiga-ui/core';
import { TuiProgressModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {
  DisplayGrid,
  GridsterComponent,
  GridsterConfig,
  GridsterModule,
  GridType
} from 'angular-gridster2';
import { BehaviorSubject, take } from 'rxjs';

import { ContentMenuComponent } from '../../components/content-menu/content-menu.component';
import { CreationComponent } from '../../components/creation/creation.component';
import { DashboardMenuComponent } from '../../components/dashboard-menu/dashboard-menu.component';
import { DriveMenuComponent } from '../../components/drive-menu/drive-menu.component';
import { MixThemeImportComponent } from '../../components/mix-theme-import/mix-theme-import.component';
import { SettingMenuComponent } from '../../components/setting-menu/setting-menu.component';
import { TemplateMenuComponent } from '../../components/template-menu/template-menu.component';
import { UserMenuComponent } from '../../components/user-menu/user-menu.component';
import { RouteConfig } from '../../routes/route.const';

@Component({
  selector: 'mix-cms-layout',
  templateUrl: './cms-layout.component.html',
  styleUrls: ['./cms-layout.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderMenuComponent,
    RouterModule,
    ShareModule,
    SideMenuComponent,
    UniversalSearchComponent,
    TabControlDialogComponent,
    CreationComponent,
    PortalSidebarHostComponent,
    SidebarContainerComponent,
    SideMenuChildItemDirective,
    DashboardMenuComponent,
    ContentMenuComponent,
    TemplateMenuComponent,
    SettingMenuComponent,
    GridsterModule,
    MixWindowToolbarComponent,
    MixChatListMiniComponent,
    MixSubWorkSpaceContainerComponent,
    DriveMenuComponent,
    UserMenuComponent,
    MixThemeImportComponent,
    MessengerComponent,
    TuiProgressModule
  ]
})
export class MixCmsLayoutComponent {
  @ViewChild('creationTemplate') public createTemplate!: TemplateRef<unknown>;
  @ViewChild('createThemeTpl') public createThemeTpl!: TemplateRef<unknown>;

  @ViewChild(GridsterComponent, { static: true })
  public grister!: GridsterComponent;

  private readonly shortcutDialog = this.dialogService.open<number>(
    new PolymorpheusComponent(ShortcutGuideComponent),
    {
      dismissible: true,
      label: `All shortcut in CMS`
    }
  );
  public isShowUniversalSearch = false;
  public isShowTab = false;
  public createMode: 'Page' | 'Post' | 'Module' = 'Page';
  public groupMenus = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'device-desktop-analytics',
      position: VerticalDisplayPosition.Top,
      detail: [],
      route: [RouteConfig.PortalDashboard]
    },
    {
      id: 'content',
      title: 'Contents',
      icon: 'file-text',
      position: VerticalDisplayPosition.Top,
      detail: [],
      route: [
        RouteConfig.PageList,
        RouteConfig.Page,
        RouteConfig.Post,
        RouteConfig.Module
      ]
    },
    {
      id: 'template',
      title: 'Themes',
      icon: 'color-swatch',
      position: VerticalDisplayPosition.Top,
      route: [RouteConfig.ThemeList, RouteConfig.Theme],
      detail: []
    },
    {
      id: 'files',
      title: 'Drive',
      icon: 'file',
      position: VerticalDisplayPosition.Top,
      detail: [],
      route: [RouteConfig.Drive]
    },
    {
      id: 'users',
      title: 'Users',
      icon: 'users',
      position: VerticalDisplayPosition.Top,
      detail: [],
      route: [RouteConfig.User]
    },
    {
      id: 'marketplaces',
      title: 'Market',
      icon: 'sitemap',
      position: VerticalDisplayPosition.Top,
      route: [RouteConfig.ThemeList, RouteConfig.Theme],
      detail: []
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings',
      position: VerticalDisplayPosition.Bottom,
      route: [RouteConfig.Settings],
      detail: []
    }
  ];
  public gridOption: GridsterConfig = {
    gridType: GridType.Fit,
    margin: 0,
    minCols: 24,
    maxCols: 24,
    minRows: 1,
    maxRows: 1,
    draggable: {
      enabled: true
    },
    pushItems: true,
    disableScrollVertical: true,
    disableScrollHorizontal: true,
    displayGrid: DisplayGrid.None,
    outerMargin: false
  };
  public mainWorkSpaceGridConfig = {
    cols: 19,
    rows: 1,
    y: 0,
    x: 0,
    hasContent: true
  };
  public subWorkSpaceConfig = {
    cols: 5,
    rows: 1,
    y: 0,
    x: 0,
    hasContent: true
  };
  public isShowSubWorkSpace = true;
  public isShowNavigationProgress$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private router: Router,
    private tabControl: LocationService,
    @Inject(PortalSidebarControlService)
    private readonly sidebarControl: PortalSidebarControlService,
    private appEvent: AppEventService,
    public subWorkSpaceController: SubWorkspaceControllerService,
    private cdr: ChangeDetectorRef
  ) {
    this.initWorkSpaceController();
    this.listenRouteChange();

    this.appEvent.event$.subscribe(event => {
      if (event.type == AppEvent.CreatePage) {
        this.createNew('Page');
      } else if (event.type == AppEvent.CreatePost) {
        this.createNew('Post');
      } else if (event.type == AppEvent.CreateModule) {
        this.createNew('Module');
      } else if (event.type == AppEvent.UniversalSearch) {
        this.toggleUniversalSearch();
      } else if (event.type == AppEvent.CreateTheme) {
        this.createNewTheme();
      }
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      const whiteListKeys = ['F1', 'F2', 'F3', 'F4', 'F5'];
      if (whiteListKeys.includes(e.key)) {
        e.preventDefault();
        switch (e.key) {
          case 'F1':
            this.showShortcutGuide();
            break;
          case 'F2':
            this.toggleUniversalSearch();
            break;
          case 'F3':
            this.createNew('Post');
            break;
          case 'F4':
            this.createNew('Page');
            break;
          case 'F5':
            this.createNew('Module');
            break;
        }
        this.cdr.detectChanges();
      }
    });
  }

  @HostListener('window:keydown.alt.z', ['$event'])
  tab(e: KeyboardEvent) {
    e.preventDefault();
    this.toggleTabControl(true);
  }

  @HostListener('window:keyup.alt', ['$event'])
  tabAlt(e: KeyboardEvent) {
    e.preventDefault();
    this.toggleTabControl(false);
  }

  public createNew(type: 'Post' | 'Module' | 'Page'): void {
    this.createMode = type;
    this.sidebarControl.show(this.createTemplate);
  }

  public createNewTheme(): void {
    this.sidebarControl.show(this.createThemeTpl);
  }

  public navigate(url: string): void {
    this.router.navigateByUrl(url);
  }

  public toggleUniversalSearch(): void {
    this.isShowUniversalSearch = !this.isShowUniversalSearch;
  }

  public toggleTabControl(show: boolean): void {
    if (this.isShowTab && show) {
      this.tabControl.nextTab();
    }

    this.isShowTab = show;
  }

  public initWorkSpaceController(): void {
    this.subWorkSpaceController.showSubWorkspace$.subscribe({
      next: isShow => {
        this.toggleSubWorkSpace(isShow);
      }
    });

    this.subWorkSpaceController.newAddItem.subscribe(() => {
      this.subWorkSpaceController.showSubWorkspace$.next(true);
    });

    this.subWorkSpaceController.subWorkSpaceItems.subscribe(items => {
      if (items.length <= 0) {
        this.subWorkSpaceController.showSubWorkspace$.next(false);
      }
    });
  }

  public toggleSubWorkSpace(isShow: boolean): void {
    if (this.isShowSubWorkSpace === isShow) return;
    this.isShowSubWorkSpace = isShow;
    if (isShow) {
      this.mainWorkSpaceGridConfig = {
        ...this.mainWorkSpaceGridConfig,
        cols: 19
      };
    } else {
      this.mainWorkSpaceGridConfig = {
        ...this.mainWorkSpaceGridConfig,
        cols: 24
      };
    }

    setTimeout(() => {
      if (this.gridOption.api?.resize) {
        this.gridOption.api.resize();
      }
    }, 1000);
  }

  public showShortcutGuide(): void {
    this.shortcutDialog.pipe(take(1)).subscribe();
  }

  public listenRouteChange(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isShowNavigationProgress$.next(true);
      } else if (event instanceof NavigationEnd) {
        this.isShowNavigationProgress$.next(false);
      }
    });
  }
}
