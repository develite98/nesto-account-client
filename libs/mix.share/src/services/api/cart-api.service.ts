import { Injectable } from '@angular/core';
import {
  AddToOrder,
  CheckoutType,
  MixApiDict,
  Order,
  OrderStatus,
  PaginationRequestModel,
  PaginationResultModel
} from '@mix/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases';

export interface GetOrderQuery extends PaginationRequestModel {
  statuses?: OrderStatus[];
}

@Injectable({ providedIn: 'root' })
export class CartApiService extends BaseApiService {
  public getMyCart(): Observable<Order> {
    return this.get(MixApiDict.CartApi.getMyCart);
  }

  public getOrders(
    request: GetOrderQuery
  ): Observable<PaginationResultModel<Order>> {
    return this.get<PaginationResultModel<Order>>(
      MixApiDict.CartApi.getOrders,
      <IHttpParamObject>(<any>request)
    );
  }
  public addToCart(item: AddToOrder): Observable<Order> {
    return this.post<AddToOrder, Order>(MixApiDict.CartApi.addToCart, item);
  }

  public checkout(
    item: Order,
    type: CheckoutType
  ): Observable<{ url: string }> {
    return this.post<Order, { url: string }>(
      MixApiDict.CartApi.checkout + '/' + type,
      item
    );
  }

  public changeSelectedCart(item: AddToOrder): Observable<Order> {
    return this.post<AddToOrder, Order>(
      MixApiDict.CartApi.changeSelectedCart,
      item
    );
  }

  public removeFromCart(postId: number): Observable<Order> {
    return this.delete<Order>(MixApiDict.CartApi.removeFromCart + postId);
  }
}
