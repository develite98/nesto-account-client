import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivationEnd } from '@angular/router';
import { Order, OrderItem, User } from '@mix/mix.lib';
import {
  AppEvent,
  AppEventService,
  AuthApiService,
  BaseComponent,
  CartApiService,
  DestroyService,
  DynamicDbApiService,
  LoadingState
} from '@mix/mix.share';
import { environment } from 'apps/nesto-account/src/environments/environment';
import { filter, takeUntil } from 'rxjs';

import { LoginComponent } from '../../routes/login/login.component';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { HeaderService } from './header.service';

@Component({
  selector: 'mix-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DestroyService]
})
export class HeaderComponent extends BaseComponent {
  @ViewChild('searchMenu', { static: true }) searchDialog!: TemplateRef<any>;

  public navigation = environment.navigation;
  public currentRoute = '';

  public currentUser: User | null = null;
  public currentTotalCart = 0;
  public currentOrderItems: OrderItem[] = [];
  public showLogin = false;
  public currentSocialNetworks: {name: string, url: string}[] = [];

  constructor(
    private authSrv: AuthApiService,
    private cartSrv: CartApiService,
    public dialog: MatDialog,
    public headerService: HeaderService,
    public cdr: ChangeDetectorRef,
    private readonly zone: NgZone,
    public destroy: DestroyService,
    public appEvent: AppEventService,
    public dynamicDb: DynamicDbApiService
  ) {
    super();
    (window as any)['headerService'] = headerService;
    headerService.addToCart.subscribe(v => this.addToCart(v));
    headerService.login.subscribe(v => {
      this.zone.run(() => {
        this.showLoginDialog();
      });
    });
    this.checkAccount();
    this.fetchUserCart();

    this.currentRoute = window.location.pathname;
    this.route.events
    .pipe(filter(event => event instanceof ActivationEnd))
    .subscribe(() => {
      this.currentRoute = this.route.url;
    })
    this.appEvent.getEvent(AppEvent.CartUpdate).pipe(takeUntil(this.destroy)).subscribe((event) => {
      this.currentTotalCart = event.data?.orderItems?.length ?? 0;
    })

    this.dynamicDb.getDb<{name: string, url: string}>('socialnetwork').subscribe((result) => {
      this.currentSocialNetworks = result.items.slice(0, 3);
    });
  }

  public checkAccount(): void {
    this.loadingState$.next(LoadingState.Loading);
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.authSrv
        .fetchUserInfo()
        .pipe(this.observerLoadingState())
        .subscribe({
          next: res => {
            this.authSrv.user$.next(res);
            this.authSrv.isAuthorized$.next(true);
          },
          error: () => {
            this.toast.warning('Your session is expired, please login again');
            localStorage.removeItem('access_token');
          }
        });
    } else {
      this.loadingState$.next(LoadingState.Success);
    }
  }

  public fetchUserCart(): void {
    this.authSrv.user$.pipe(takeUntil(this.destroy)).subscribe(u => {
      this.currentUser = u;
      this.cartSrv.getMyCart().subscribe(v => {
        this.currentTotalCart = v.orderItems.length;
      });
    });
  }

  public addToCart(post: OrderItem): void {
    this.cartSrv
      .addToCart({
        sku: post.sku,
        title: post.title,
        quantity: post.quantity,
        postId: post.postId,
        description: post.description ?? '',
        image: post.image ?? '',
        referenceUrl: '',
        isActive: true
      })
      .subscribe({
        next: v => {
          this.zone.run(() => {
            this.toast.success('Add to cart successfully');
            this.currentTotalCart = v.orderItems.length;
            this.showCartDialog(v);
            this.cdr.detectChanges();
          });
        },
        error: requestError => {
          if (
            requestError instanceof HttpErrorResponse &&
            requestError.status === 401
          ) {
            this.zone.run(() => {
              this.showLoginDialog();
              this.toast.error('You must login to buy this item');
            });
          }
        }
      });
  }

  public showLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      panelClass: 'login-dialog',
      autoFocus: false
    });
  }

  public showCartDialog(data?: Order): void {
    this.dialog.open(CartDialogComponent, {
      panelClass: 'side-dialog',
      autoFocus: false,
      data: data ? {
        order: data
      } : undefined
    });
  }

  public showSearchDialog(): void {
    this.dialog.closeAll();

    this.dialog.open(this.searchDialog, {
      panelClass: 'full-dialog'
    });
  }

  public onSearch(): void {
    window.open(this.navigation.search);
  }

  public logOut(): void {
    this.currentUser = null;
    this.currentTotalCart = 0;
    this.authSrv.logout();
  }
}
