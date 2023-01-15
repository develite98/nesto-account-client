import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MixPostPortalModel, Order, OrderItem } from '@mix/mix.lib';
import {
  AppEvent,
  AppEventService,
  BaseComponent,
  CartApiService,
  DestroyService,
  MixPostContentApiService
} from '@mix/mix.share';
import { environment } from 'apps/nesto-account/src/environments/environment';
import { combineLatest, debounceTime, map, of, Subject, switchMap, takeUntil } from 'rxjs';

import { updateOrderVariant } from '../../helper/order.helper';

@Component({
  selector: 'mix-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DestroyService]
})
export class CartDialogComponent extends BaseComponent implements OnInit {
  @ViewChild('body') public cartBody!: ElementRef<HTMLElement>;
  public isNotStick = true;
  public currentPosts: MixPostPortalModel[] = [];
  public nestoHost = environment.nestoDomain;
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

  public currentSubTotal = 0;
  @Input() public currentOrder: OrderItem[] = [];
  @Input() public order?: Order;
  public totalOrder = 0;
  public quantityChange$: Subject<OrderItem> = new Subject();

  constructor(
    public router: Router,
    public cartApi: CartApiService,
    public postApi: MixPostContentApiService,
    public dialogRef: MatDialogRef<CartDialogComponent>,
    public appEvent: AppEventService,
    public destroy: DestroyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.order = data?.order;
  }

  public get disableCheckout(): boolean {
    return (
      !this.currentOrder ||
      !this.currentOrder.length ||
      !this.currentOrder.filter(or => or.isActive).length ||
      this.currentOrder.some(order => this.isSoldOut(order) || this.isOverStock(order))
    );
  }

  public onScroll(): void {
    // this.isNotStick =
    //   this.currentOrder?.length <= 1 ||
    //   this.cartBody.nativeElement.scrollHeight -
    //     this.cartBody.nativeElement.scrollTop -
    //     this.cartBody.nativeElement.clientHeight <
    //     1.5;
  }

  ngOnInit(): void {
    this.loadData();
    this.quantityChange$.pipe(debounceTime(200)).subscribe(i => {
      this.cartApi
        .addToCart({
          sku: i.sku,
          title: i.title,
          quantity: i.quantity,
          postId: i.postId,
          image: i.image,
          referenceUrl: i.referenceUrl,
          description: i.description,
          isActive: true
        })
        .pipe(this.observerLoadingState())
        .subscribe(v => this.updateOrder(v));
    });

    this.appEvent.getEvent(AppEvent.CartUpdate).pipe(takeUntil(this.destroy)).subscribe((event) => {
      this.updateOrder(event.data, false);
    })
  }

  public loadData(): void {
    if (this.order) {
      of(this.order).pipe(switchMap(result => {
        return combineLatest(
          result.orderItems.map(item => this.postApi.getById(item.postId))
        ).pipe(map(r => ({ order: result, post: r })));
      }))
      .pipe(this.observerLoadingState())
      .subscribe({
        next: v => {
          this.currentPosts = v.post;
          this.updateOrder(v.order)
        }
      });
    } else {
      this.cartApi
      .getMyCart()
      .pipe(switchMap(result => {
        return combineLatest(
          result.orderItems.map(item => this.postApi.getById(item.postId))
        ).pipe(map(r => ({ order: result, post: r })));
      }))
      .pipe(this.observerLoadingState())
      .subscribe({
        next: v => {
          this.currentPosts = v.post;
          this.updateOrder(v.order)
        }
      });
    }

  }

  public checkedItemChange(value: MatCheckboxChange, order: OrderItem): void {
    if (value.checked) {
      order.isActive = true;
    } else {
      order.isActive = false;
    }

    this.cartApi
      .changeSelectedCart(order)
      .pipe(this.observerLoadingState())
      .subscribe(v => this.updateOrder(v));
  }

  public itemQuantityChange(order: OrderItem, value: number): void {
    order.quantity = value;
    this.quantityChange$.next(order);
  }

  public goToCheckout(): void {
    window.open(this.navigation.checkout, '_self');
  }

  public gotoPost(order: OrderItem): void {
    window.open(environment.nestoDomain + `post/${order.postId}`, '_self')
  }

  public cart(): void {
    window.open(this.navigation.cart);
  }

  public remove(postId: number): void {
    this.cartApi
      .removeFromCart(postId)
      .pipe(
        this.toast.observe({
          success: 'Remove item successfully',
          loading: 'Removing...',
          error: 'Something error, please try again'
        })
      )
      .subscribe((result) => {
        this.updateOrder(result);
        this.appEvent.notify({
          type: AppEvent.CartUpdate,
          data: result
        })
      });
  }

  public updateOrder(v: Order, notify = true): void {
    v = updateOrderVariant(v, this.currentPosts);
    this.currentOrder = v.orderItems;
    this.totalOrder = this.currentOrder.length;
    this.currentSubTotal = v.total;

    if (notify) {
      this.appEvent.notify({
        type: AppEvent.CartUpdate,
        data: v
      })
    }
  }

  public isOverStock(orderItem: OrderItem): boolean {
    return !!orderItem.inventory && orderItem.inventory !== 0 && orderItem.inventory < orderItem.quantity;
  }

  public isSoldOut(orderItem: OrderItem): boolean {
    return  orderItem.inventory === 0;
  }
}
