import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  NgModule
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  PRIMARY_OUTLET,
  Router,
  RouterModule
} from '@angular/router';
import { Culture } from '@mix/mix.lib';
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiBreadcrumbsModule } from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';
import { IconBell, IconHelp } from 'angular-tabler-icons/icons';
import { BehaviorSubject, filter, map, startWith, switchMap } from 'rxjs';

import {
  AppEvent,
  AppEventService,
  AuthApiService,
  ShareApiService
} from '../../services';
import { ShareModule } from '../../share.module';
import { LocalStorage } from '../../utils';
import { LocationControllerComponent } from '../location-controller/location-controller.component';
import { ModalService } from '../modal/modal.service';
import { SideMenuService } from '../side-menu/side-menu.service';
import { HeaderMenuService } from './header-menu.service';

export interface BreadcrumbOption {
  caption: string;
  params: Params;
  routerLink: string;
}

@NgModule({
  imports: [TablerIconsModule.pick({ IconBell, IconHelp })],
  exports: [TablerIconsModule]
})
class HeaderIcons {}

@Component({
  selector: 'mix-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  standalone: true,
  imports: [
    ShareModule,
    TuiBreadcrumbsModule,
    RouterModule,
    TuiLinkModule,
    LocationControllerComponent,
    HeaderIcons
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMenuComponent {
  @Input() public showLogo = false;
  public user$ = this.authService.user$;
  public breadcrumb: BreadcrumbOption[] = [];
  public search = new FormControl('');
  public currentCulture: Culture | undefined = undefined;
  public openSelectCulture = false;

  public searchCultureText$: BehaviorSubject<string> = new BehaviorSubject('');
  public cultures$ = this.searchCultureText$.pipe(
    switchMap(searchText => {
      return this.shareApi.culture$.pipe(
        map(cultures => {
          return cultures.filter(c =>
            c.fullName
              .toLocaleLowerCase()
              .includes(searchText.toLocaleLowerCase().trim())
          );
        })
      );
    })
  );

  constructor(
    public authService: AuthApiService,
    public headerService: HeaderMenuService,
    public router: Router,
    @Inject(ModalService) private readonly modalService: ModalService,
    public activatedRoute: ActivatedRoute,
    public sideMenuService: SideMenuService,
    public shareApi: ShareApiService,
    public appEvent: AppEventService
  ) {
    this._registerRouterChange();
    const cultureString = LocalStorage.getItem('culture');
    if (cultureString) {
      this.currentCulture = JSON.parse(cultureString);
    }
  }

  public toggleMenu(): void {
    this.sideMenuService.open$.next(!this.sideMenuService.open$.getValue());
  }

  public logout(): void {
    this.modalService.confirm('Do you want to sign out ?').subscribe(ok => {
      if (ok)
        this.authService.logout(() => this.router.navigateByUrl('/auth/login'));
    });
  }

  public onCultureSelect(culture: Culture): void {
    this.currentCulture = culture;
    this.openSelectCulture = false;
    LocalStorage.setItem('culture', JSON.stringify(culture));
    this.appEvent.notify({ type: AppEvent.Refresh });
  }

  private _registerRouterChange(): void {
    try {
      this.router.events
        .pipe(
          filter(e => e instanceof NavigationEnd),
          startWith(true)
        )
        .subscribe(() => {
          this.breadcrumb = this._getBreadcrumbs(this.activatedRoute.root);
        });
    } catch (e) {
      throw new Error(`Error when try to load breadcrumb.`);
    }
  }

  private _getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbOption[] = []
  ): BreadcrumbOption[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      if (child.outlet === PRIMARY_OUTLET && !!child.snapshot) {
        const routeUrl: string = child.snapshot.url
          .map(segment => segment.path)
          .filter(path => path)
          .join('/');

        const nextUrl = routeUrl ? `${url}/${routeUrl}` : url;
        const breadcrumbLabel = child.snapshot.data['title'];

        if (routeUrl && breadcrumbLabel) {
          const breadcrumb: BreadcrumbOption = {
            caption: breadcrumbLabel,
            params: child.snapshot.params,
            routerLink: nextUrl
          };
          breadcrumbs.push(breadcrumb);
        }

        return this._getBreadcrumbs(child, nextUrl, breadcrumbs);
      }
    }

    return breadcrumbs;
  }
}
