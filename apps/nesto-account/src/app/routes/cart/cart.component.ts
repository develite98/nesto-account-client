import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderItem } from '@mix/mix.lib';
import {
  BaseComponent,
  CartApiService,
  MixPostContentApiService
} from '@mix/mix.share';
import { combineLatest, debounceTime, map, Subject, switchMap } from 'rxjs';

import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'mix-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends BaseComponent implements OnInit {
  public currentSubTotal = 0;
  public currentOrder: OrderItem[] = [];
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
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
    this.quantityChange$.pipe(debounceTime(200)).subscribe(i => {
      this.cartApi
        .addToCart({
          title: i.title,
          quantity: i.quantity,
          postId: i.postId,
          image: i.image,
          referenceUrl: i.referenceUrl,
          description: i.description
        })
        .subscribe(() => this.loadData());
    });
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
        this.currentOrder = v.order.orderItems.map(item => {
          item.post = v.post.find(p => p.id === item.postId);

          return item;
        });

        this.dataSource = this.currentOrder;
        this.currentSubTotal = this.currentOrder.reduce(
          (a, b) => a + this.getSubtotal(b),
          0
        );
      });
  }

  public checkout(): void {
    this.router.navigateByUrl('/cart/delivery-payment');
  }

  public getSubtotal(order: OrderItem): number {
    if (order.post?.additionalData && order.post?.additionalData['price']) {
      return (
        order.quantity *
        (order.post?.additionalData['price'] as unknown as number)
      );
    } else {
      return 0;
    }
  }

  public itemQuantityChange(order: OrderItem): void {
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
            .subscribe(() => {
              this.loadData();
            });
        }
      });
  }
}
