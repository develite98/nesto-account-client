import { Component, Input, OnInit } from '@angular/core';
import { Order, OrderStatus } from '@mix/mix.lib';

@Component({
  selector: 'mix-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() public order!: Order;
  public title = '';

  public get estimateOrderTime(): Date {
    return new Date();
  }

  public ngOnInit(): void {
    if (this.order) {
      switch (this.order.orderStatus) {
        case OrderStatus.SHIPPING:
          this.title = 'ON SHIPPING';
          break;
        case OrderStatus.PAID:
          this.title = 'PAID';
          break;
        case OrderStatus.WAITING_FOR_PAYMENT:
          this.title = 'WAITING FOR PAYMENT';
          break;
        case OrderStatus.SUCCESS:
          this.title = 'FINISH';
          break;
        default:
          this.title = 'PROCESSING';
      }
    }
  }
}
