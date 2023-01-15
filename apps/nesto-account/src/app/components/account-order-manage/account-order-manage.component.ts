import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Order, OrderStatus, PaginationResultModel } from '@mix/mix.lib';
import { BaseComponent, CartApiService } from '@mix/mix.share';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'mix-account-order-manage',
  templateUrl: './account-order-manage.component.html',
  styleUrls: ['./account-order-manage.component.scss']
})
export class AccountOrderManageComponent
  extends BaseComponent
  implements OnInit
{
  constructor(public cartApi: CartApiService) {
    super();
  }

  public searchText$ = new FormControl('');
  public searchText = '';
  public selectedIndex = 0;
  public currentOrders?: PaginationResultModel<Order>;

  public tabIndexDicts = [
    [],
    [OrderStatus.SHIPPING, OrderStatus.WAITING_FOR_PAYMENT],
    [OrderStatus.SHIPPING],
    [OrderStatus.SUCCESS],
    [OrderStatus.PAYMENT_FAILED]
  ];

  public ngOnInit(): void {
    this.loadData();

    this.searchText$.valueChanges.pipe(debounceTime(300)).subscribe(text => {
      this.searchText = text ?? '';
      this.loadData();
    });
  }

  public loadData(): void {
    this.cartApi
      .getOrders({
        statuses: this.tabIndexDicts[this.selectedIndex],
        searchColumns: 'id',
        keyword: this.searchText,
        pageSize: 1000
      })
      .pipe(this.observerLoadingState())
      .subscribe(orders => {
        this.currentOrders = orders;
      });
  }

  public selectedTabChange(index: number): void {
    this.selectedIndex = index;
    this.loadData();
  }
}
