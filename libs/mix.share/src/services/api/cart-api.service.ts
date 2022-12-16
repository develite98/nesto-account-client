import { Injectable } from '@angular/core';
import { AddToOrder, MixApiDict, Order } from '@mix/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../bases';

@Injectable({ providedIn: 'root' })
export class CartApiService extends BaseApiService {
  public getMyCart(): Observable<Order> {
    return this.get(MixApiDict.CartApi.getMyCart);
  }

  public addToCart(item: AddToOrder): Observable<void> {
    return this.post<AddToOrder, void>(MixApiDict.CartApi.addToCart, item);
  }

  public removeFromCart(postId: number): Observable<void> {
    return this.delete<void>(MixApiDict.CartApi.removeFromCart + postId);
  }
}
