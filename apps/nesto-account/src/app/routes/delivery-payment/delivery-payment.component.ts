import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderItem } from '@mix/mix.lib';
import {
  AuthApiService,
  BaseComponent,
  CartApiService,
  MixPostApiService
} from '@mix/mix.share';
import { combineLatest, map, switchMap } from 'rxjs';

import { AddressSelectedDialogComponent } from '../../components/address-selected-dialog/address-selected-dialog.component';
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
    public cartApi: CartApiService,
    public postApi: MixPostApiService
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
        this.currentAddress = result.addresses ?? [];
        this.selectedAddress = this.currentAddress.find(
          f => f.isDefault === true
        );
      });

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
      .subscribe({
        next: v => {
          this.currentOrder = v.order.orderItems.map(item => {
            item.post = v.post.find(p => p.id === item.postId);

            return item;
          });

          this.currentSubTotal = v.order.total;
        }
      });
  }

  public changeAddress(): void {
    this.dialog
      .open(AddressSelectedDialogComponent, {
        data: {
          addresses: this.currentAddress,
          selectedAddress: this.selectedAddress?.id
        },
        autoFocus: false
      })
      .afterClosed()
      .subscribe(r => {
        if (r.selectedAddress) {
          this.selectedAddress = r.selectedAddress;
        }
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
