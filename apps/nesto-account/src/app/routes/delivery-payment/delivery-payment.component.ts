import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutType, MixPostPortalModel, Order, OrderItem } from '@mix/mix.lib';
import {
  AuthApiService,
  BaseComponent,
  CartApiService,
  MixPostContentApiService
} from '@mix/mix.share';
import { environment } from 'apps/nesto-account/src/environments/environment';
import { combineLatest, map,switchMap } from 'rxjs';

import { AddressFormComponent } from '../../components/account-address/address-form/address-form.component';
import { AddressSelectedDialogComponent } from '../../components/address-selected-dialog/address-selected-dialog.component';
import { updateOrderVariant } from '../../helper/order.helper';
import { Address, UserData } from '../../models/user-data.model';

@Component({
  selector: 'mix-delivery-payment',
  templateUrl: './delivery-payment.component.html',
  styleUrls: ['./delivery-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeliveryPaymentComponent extends BaseComponent implements OnInit {
  public currentAddress: Address[] = [];
  public currentOrderItems: OrderItem[] = [];
  public currentOrder!: Order;
  public selectedAddress?: Address;
  public currentSubTotal = 0;
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

  public currentPaymentType: CheckoutType | undefined = CheckoutType.Onepay;
  public checkoutType = CheckoutType;

  constructor(
    public dialog: MatDialog,
    private authApi: AuthApiService,
    public cartApi: CartApiService,
    public postApi: MixPostContentApiService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public get canCheckout(): boolean {
    return (
      this.currentOrderItems &&
      this.currentOrderItems.filter(or => or.isActive).length >= 1 &&
      !!this.selectedAddress &&
      this.currentPaymentType !== undefined &&
      !this.currentOrderItems.some(or => this.isOverStock(or) || this.isSoldOut(or))
    );
  }

  public loadData(): void {
    this.authApi
      .fetchUserData()
      .pipe(
        this.toast.observe({
          success: 'Successfully load your shipping address',
          error: '',
          loading: 'Loading shipping address'
        })
      )
      .subscribe(result => {
        this.currentAddress = result.addresses ?? [];
        this.selectedAddress = this.currentAddress[0];
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
          this.currentPosts = v.post;
          v.order = updateOrderVariant(v.order, this.currentPosts);
          this.currentOrder = v.order;
          this.currentOrderItems = v.order.orderItems.filter(order => order.isActive);
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
        autoFocus: false,
        panelClass: 'nesto-dialog'
      })
      .afterClosed()
      .subscribe(r => {
        if (r && r.selectedAddress) {
          this.selectedAddress = r.selectedAddress;
          this.currentAddress = r.availableAddress;
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

  public showInputAddress(): void {
    const dialogRef = this.dialog.open(AddressFormComponent, {
      panelClass: 'nesto-dialog'
    });

    dialogRef.afterClosed().subscribe((v: UserData) => {
      if (v && v.addresses) {
        const newAddress = v.addresses[v.addresses.length - 1]
        this.currentAddress.push(newAddress);
        this.selectedAddress = newAddress;
      }
    });
  }

  public onCheckout(): void {
    if (this.currentPaymentType && this.selectedAddress) {
      this.cartApi
        .checkout(
          {
            ...this.currentOrder,
            address: this.selectedAddress,
            email: this.selectedAddress?.email
          },
          this.currentPaymentType
        )
        .pipe(this.observerLoadingState())
        .subscribe(link => {
          window.open(link.url, '_self');
        });
    }
  }

  public isOverStock(orderItem: OrderItem): boolean {
    return !!orderItem.inventory && orderItem.inventory !== 0 && orderItem.inventory < orderItem.quantity;
  }

  public isSoldOut(orderItem: OrderItem): boolean {
    return  orderItem.inventory === 0;
  }
}
