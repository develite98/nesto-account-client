import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { VerticalDisplayPosition } from '@mix/mix.lib';
import {
  AppEvent,
  AppEventService,
  HeaderMenuComponent,
  LocationService,
  MixChatBoxComponent,
  MixChatListMiniComponent,
  MixSubWorkSpaceContainerComponent,
  MixWindowToolbarComponent,
  PortalSidebarControlService,
  PortalSidebarHostComponent,
  ShareModule,
  SidebarContainerComponent,
  SideMenuChildItemDirective,
  SideMenuComponent,
  SubWorkspaceControllerService,
  TabControlDialogComponent,
  UniversalSearchComponent
} from '@mix/mix.share';
import { TuiDialogService } from '@taiga-ui/core';
import {
  DisplayGrid,
  GridsterComponent,
  GridsterConfig,
  GridsterModule,
  GridType
} from 'angular-gridster2';

import { ApplicationMenuComponent } from '../../components/application-menu/application-menu.component';
import { InstallAppComponent } from '../../components/install-app/install-app.component';
import { RouteConfig } from '../../routes/route.const';

@Component({
  selector: 'mix-universe-layout',
  templateUrl: './universe-layout.component.html',
  styleUrls: ['./universe-layout.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderMenuComponent,
    RouterModule,
    ShareModule,
    SideMenuComponent,
    UniversalSearchComponent,
    TabControlDialogComponent,
    MixChatBoxComponent,
    PortalSidebarHostComponent,
    SidebarContainerComponent,
    SideMenuChildItemDirective,
    GridsterModule,
    MixWindowToolbarComponent,
    MixChatListMiniComponent,
    MixSubWorkSpaceContainerComponent,
    ApplicationMenuComponent,
    InstallAppComponent
  ]
})
export class MixCmsLayoutComponent {
  @ViewChild('installAppTpl') public installAppTemplate!: TemplateRef<unknown>;
  @ViewChild('creationTemplate') public createTemplate!: TemplateRef<unknown>;
  @ViewChild(GridsterComponent, { static: true })
  public grister!: GridsterComponent;

  public isShowUniversalSearch = false;
  public isShowTab = false;
  public groupMenus = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'device-desktop-analytics',
      position: VerticalDisplayPosition.Top,
      detail: [],
      route: [RouteConfig.Dashboard]
    },
    {
      id: 'applications',
      title: 'Apps',
      icon: 'apps',
      position: VerticalDisplayPosition.Top,
      detail: [],
      route: [RouteConfig.Applications]
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
    cols: 18,
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

  @HostListener('window:keydown.alt.z', ['$event'])
  tab(e: KeyboardEvent) {
    e.preventDefault();
    this.toggleTabControl(true);
  }

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private tabControl: LocationService,
    @Inject(PortalSidebarControlService)
    private readonly sidebarControl: PortalSidebarControlService,
    private appEvent: AppEventService,
    public subWorkSpaceController: SubWorkspaceControllerService
  ) {
    this.initWorkSpaceController();
    this.appEvent.event$.subscribe(event => {
      if (event.type == AppEvent.InstallApp) {
        this.sidebarControl.show(this.installAppTemplate);
      }
    });
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
        cols: 18
      };
    } else {
      this.mainWorkSpaceGridConfig = {
        ...this.mainWorkSpaceGridConfig,
        cols: 23
      };
    }

    if (this.gridOption.api?.resize) {
      this.gridOption.api.resize();
    }
  }
}
