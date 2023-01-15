import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
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
import { combineLatest, debounceTime, map, Subject, switchMap, takeUntil } from 'rxjs';

import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { updateOrderVariant } from '../../helper/order.helper';

@Component({
  selector: 'mix-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DestroyService]
})
export class CartComponent extends BaseComponent implements OnInit {
  public checkItems: number[] = [];
  public currentSubTotal = 0;
  public currentOrder: OrderItem[] = [];
  public currentPosts: MixPostPortalModel[] = [];
  public displayedColumns: string[] = [
    'Products',
    'Category',
    'Price',
    'Unit',
    'Quantity',
    'Subtotal',
    'Action'
  ];
  public dataSource: OrderItem[] = [];
  public quantityChange$: Subject<OrderItem> = new Subject();

  constructor(
    public router: Router,
    public cartApi: CartApiService,
    public postApi: MixPostContentApiService,
    public dialog: MatDialog,
    public appEvent: AppEventService,
    public destroy: DestroyService
  ) {
    super();
  }

  public get canCheckOut(): boolean {
    return !!this.dataSource && !!this.dataSource.length && !!this.checkItems.length && !this.dataSource.some(data => {
      return this.isSoldOut(data) || this.isOverStock(data);
    })
  }

  public isOrderItemChecked(orderItem: OrderItem): boolean {
    return this.checkItems.some(v => v === orderItem.postId);
  }

  public checkedItemChange(value: MatCheckboxChange, order: OrderItem): void {
    if (value.checked) {
      this.checkItems.push(order.postId);
      order.isActive = true;
    } else {
      this.checkItems = this.checkItems.filter(v => v !== order.postId);
      order.isActive = false;
    }

    this.cartApi
      .changeSelectedCart(order)
      .pipe(this.observerLoadingState())
      .subscribe(v => this.updateOrder(v));
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
    this.cartApi
      .getMyCart()
      .pipe(
        switchMap(result => {
          return combineLatest(
            result.orderItems.map(item => this.postApi.getById(item.postId))
          ).pipe(map(r => ({ order: result, post: r })));
        })
      )
      .pipe(this.observerLoadingState())
      .subscribe(v => {
        this.currentPosts = v.post;
        this.updateOrder(v.order);
      });
  }

  public checkout(): void {
    this.router.navigateByUrl('/cart/delivery-payment');
  }

  public itemQuantityChange(order: OrderItem, value: number): void {
    order.quantity = value;
    this.quantityChange$.next(order);
  }

  public removeItem(id: number): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `Do you want to delete this item`
      })
      .afterClosed()
      .subscribe((yes: boolean) => {
        if (yes) {
          this.cartApi
            .removeFromCart(id)
            .pipe(
              this.toast.observe({
                success: 'Remove item successfully',
                loading: 'Removing...',
                error: 'Something error, please try again'
              })
            )
            .subscribe((result) => {
              this.updateOrder(result);
            });
        }
      });
  }

  public updateOrder(v: Order, notify: boolean = true): void {
    v = updateOrderVariant(v, this.currentPosts);
    this.currentOrder = v.orderItems;
    this.checkItems = this.currentOrder
      .filter(or => or.isActive)
      .map(or => or.postId);

    this.dataSource = this.currentOrder;
    this.currentSubTotal = v.total;

    if (notify) {
      this.appEvent.notify({
        type: AppEvent.CartUpdate,
        data: v
      })
    }
  }

  public gotoPost(order: OrderItem): void {
    window.open(environment.nestoDomain + `post/${order.postId}`, '_self')
  }

  public isOverStock(orderItem: OrderItem): boolean {
    return !!orderItem.inventory && orderItem.inventory !== 0 && orderItem.inventory < orderItem.quantity;
  }

  public isSoldOut(orderItem: OrderItem): boolean {
    return  orderItem.inventory === 0;
  }
}
