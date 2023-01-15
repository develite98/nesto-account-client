import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CheckoutType, MixPostPortalModel, Order, OrderStatus, PaymentStatus } from '@mix/mix.lib';
import { BaseComponent, CartApiService, MixPostContentApiService } from '@mix/mix.share';
import { combineLatest, map, switchMap } from 'rxjs';

import { updateOrderVariant } from '../../helper/order.helper';

@Component({
  selector: 'mix-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentResultComponent extends BaseComponent implements OnInit {
  public currentOrderResult?: Order;
  public currentPosts: MixPostPortalModel[] = [];
  constructor(public cartApi: CartApiService,  public postApi: MixPostContentApiService) {
    super();
  }

  public orderStatus = OrderStatus;
  public paymentStatus = PaymentStatus;
  public checkoutType = CheckoutType;

  ngOnInit(): void {
    this.cartApi
      .getOrders({
        pageSize: 5,
        pageIndex: 0
      })
      .pipe(
        switchMap(result => {
          return combineLatest(
            result.items[0].orderItems.map(item => this.postApi.getById(item.postId))
          ).pipe(map(r => ({ order: result, post: r })));
        })
      )
      .pipe(this.observerLoadingState())
      .subscribe(result => {
        this.currentOrderResult = result.order.items[0];
        this.currentPosts = result.post;
        this.currentOrderResult = updateOrderVariant(this.currentOrderResult , this.currentPosts);
      });
  }

  public viewOrderStatus(): void {
    this.route.navigateByUrl('/');
  }
}
