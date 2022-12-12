import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderItem } from '@mix/mix.lib';
import { AuthApiService, BaseComponent, CartApiService } from '@mix/mix.share';

import { Address } from '../../models/user-data.model';

@Component({
  selector: 'mix-delivery-payment',
  templateUrl: './delivery-payment.component.html',
  styleUrls: ['./delivery-payment.component.scss']
})
export class DeliveryPaymentComponent extends BaseComponent implements OnInit {
  public currentAddress: Address[] = [];
  public currentOrder: OrderItem[] = [];
  public selectedAddress?: Address;
  public currentSubTotal = 0;

  constructor(
    public dialog: MatDialog,
    private authApi: AuthApiService,
    public cartApi: CartApiService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.authApi
      .fetchUserData()
      .pipe(
        this.toast.observe({
          success: 'Thành công tải địa chỉ',
          error: '',
          loading: 'Đang tải địa chỉ'
        })
      )
      .subscribe(result => {
        this.currentAddress = result.addresses;
        this.selectedAddress = this.currentAddress.find(
          f => f.isDefault === true
        );
      });

    this.cartApi.getMyCart().subscribe(v => {
      this.currentOrder = v.orderItems;
      this.currentSubTotal = this.currentOrder.reduce(
        (a, b) => a + this.getSubtotal(b),
        0
      );
    });
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
}
