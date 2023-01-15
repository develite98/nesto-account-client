import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { OrderItem } from '@mix/mix.lib';
import { environment } from 'apps/nesto-account/src/environments/environment';

@Component({
  selector: 'mix-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() public order!: OrderItem;
  @Input() public type: 'view' | 'edit' = 'edit';

  @Output() public quantityChange: EventEmitter<number> =
    new EventEmitter<number>();

  @Output() public checkedChange: EventEmitter<MatCheckboxChange> =
    new EventEmitter<MatCheckboxChange>();

  @Output() public remove: EventEmitter<void> = new EventEmitter<void>();

  public gotoPost(): void {
    window.open(environment.nestoDomain + `post/${this.order.postId}`, '_self')
  }

  public get isOverStock(): boolean {
    return !!this.order && !!this.order.inventory && this.order.inventory !== 0 && this.order.inventory < this.order.quantity;
  }

  public get isSoldOut(): boolean {
    return !!this.order && this.order.inventory === 0;
  }
}
