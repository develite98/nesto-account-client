import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { VerticalDisplayPosition } from '@mix/mix.lib';

import { AppEventService } from '../../services';
import { AppService } from '../../services/helper/app-setting.service';
import { ShareModule } from '../../share.module';
import { SideMenuService } from './side-menu.service';
import { SideMenuButtonComponent } from './side-menu-button/side-menu-button.component';
import { SideMenuChildItemDirective } from './side-menu-child.directive';

export interface MixToolbarMenu {
  id: number | string;
  title: string;
  icon: string;
  hideDetail?: boolean;
  action?: () => void;
  position: VerticalDisplayPosition;
  guideText?: string;
  route?: string | string[];
  childMenuTpl?: TemplateRef<unknown>;
}

export interface MixMenuTemplateItem {
  groupName: string;
  icon?: string;
  child: {
    title: string;
    action: () => void;
    route?: string | string[];
    icon?: string;
    showDot?: boolean;
    dotColor?: string;
  }[];
}

@Component({
  selector: 'mix-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ShareModule, SideMenuButtonComponent]
})
export class SideMenuComponent implements AfterViewInit {
  @Input() public showMenuLevel2 = false;
  @Input() public groups: MixToolbarMenu[] = [];
  @Output() public sizeChange: EventEmitter<boolean> = new EventEmitter();

  @ContentChildren(SideMenuChildItemDirective)
  public childMenu!: QueryList<SideMenuChildItemDirective>;

  public currentSelectedItem: MixToolbarMenu | undefined;
  public currentSelectedChildItem: SideMenuChildItemDirective | undefined;
  public isShowMenu = true;
  public isMiniGroupBar = false;
  public open = false;

  constructor(
    public appService: AppService,
    private router: Router,
    public appEvent: AppEventService,
    public sideMenuService: SideMenuService
  ) {}

  public ngAfterViewInit(): void {
    this.initMenu();
    this.sideMenuService.open$.subscribe(v => this.sizeChange.emit(v));
  }

  public initMenu(): void {
    const route = this.router.url.split('/')[1];
    this.groups = this.groups.map(g => {
      g.childMenuTpl = this.childMenu.find(c => c.key === g.id)?.tpl;

      return g;
    });

    this.currentSelectedItem =
      this.groups.find(i => i.route && i.route.includes(route)) ||
      this.groups[1];
  }

  public toggleMiniSize(): void {
    this.sideMenuService.miniSize$.next(
      !this.sideMenuService.miniSize$.getValue()
    );

    this.sizeChange.emit(true);
  }

  public selectMenu(group: MixToolbarMenu): void {
    if (this.currentSelectedItem === group) return;
    this.currentSelectedItem = group;

    if (group && group.route) {
      this.router.navigateByUrl(`${group.route[0]}`);
    }

    if (!this.sideMenuService.open$.getValue()) {
      this.sideMenuService.open$.next(true);
    }

    this.sizeChange.emit();
  }
}
