import { Injectable } from '@angular/core';
import { OrderItem } from '@mix/mix.lib';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'platform' })
export class HeaderService {
  public addToCart: Subject<OrderItem> = new Subject<OrderItem>();
}
