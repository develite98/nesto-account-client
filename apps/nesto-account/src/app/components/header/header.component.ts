import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrderItem, User } from '@mix/mix.lib';
import {
  AuthApiService,
  BaseComponent,
  CartApiService,
  DestroyService,
  ShareApiService
} from '@mix/mix.share';
import { takeUntil } from 'rxjs';

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

  public nestoHost = 'http://nesto.tanconstructions.com.au/';
  public navigation = {
    product: this.nestoHost + 'products',
    collection: this.nestoHost + 'collection',
    stories: this.nestoHost + 'stories',
    about: this.nestoHost + 'about-us',
    career: this.nestoHost + 'career',
    blogs: this.nestoHost + 'blogs',
    search: this.nestoHost + 'search',
    account: this.nestoHost + 'customer-account/account-information',
    checkout: this.nestoHost + 'customer-account/cart/delivery-payment',
    cart: this.nestoHost + 'customer-account/cart'
  };

  public currentUser: User | null = null;
  public currentTotalCart = 0;
  public showLogin = false;

  constructor(
    private fb: FormBuilder,
    private shareSetting: ShareApiService,
    private authSrv: AuthApiService,
    private cartSrv: CartApiService,
    public dialog: MatDialog,
    public headerService: HeaderService,
    public cdr: ChangeDetectorRef,
    private readonly zone: NgZone,
    public destroy: DestroyService
  ) {
    super();
    (window as any)['headerService'] = headerService;
    headerService.addToCart.subscribe(v => this.addToCart(v));
    this.fetchUserCart();
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
        title: post.title,
        quantity: post.quantity,
        postId: post.postId,
        description: post.description ?? '',
        image: post.image ?? '',
        referenceUrl: ''
      })
      .subscribe({
        next: () => {
          this.zone.run(() => {
            this.toast.success('Add to cart successfully');
            this.fetchUserCart();
            this.showCartDialog();
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
      panelClass: 'login-dialog'
    });
  }

  public showCartDialog(): void {
    this.dialog.open(CartDialogComponent, {
      panelClass: 'side-dialog',
      autoFocus: false
    });
  }

  public showSearchDialog(): void {
    this.dialog.closeAll();

    this.dialog.open(this.searchDialog, {
      panelClass: 'full-dialog',
      autoFocus: false
    });
  }

  public logOut(): void {
    this.currentUser = null;
    this.currentTotalCart = 0;
    this.authSrv.logout();
  }
}
