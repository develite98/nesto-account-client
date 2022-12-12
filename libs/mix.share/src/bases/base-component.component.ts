import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject, defer, Observable, take, tap } from 'rxjs';

import { HeaderMenuService } from '../components/header-menu/header-menu.service';
import { ModalService } from '../components/modal/modal.service';

export const enum LoadingState {
  Error = 'Error',
  Loading = 'Loading',
  Success = 'Success',
  Pending = 'Pending'
}

export abstract class BaseComponent {
  public alert = inject(TuiAlertService);
  public route = inject(Router);
  public header = inject(HeaderMenuService);
  public modal = inject(ModalService);
  public toast = inject(HotToastService);

  public disabled$ = new BehaviorSubject<boolean>(false);
  public error$ = new BehaviorSubject<boolean>(false);
  public loading$ = new BehaviorSubject<boolean>(true);
  public loading = false;
  public loadingState$: BehaviorSubject<LoadingState> =
    new BehaviorSubject<LoadingState>(LoadingState.Pending);

  public showSuccess(text: string): void {
    this.alert
      .open(new Date().toLocaleString(), {
        label: text,
        status: TuiNotification.Success
      })
      .pipe(take(1))
      .subscribe();
  }

  public showError(text: string): void {
    this.alert
      .open(new Date().toLocaleString(), {
        label: text,
        status: TuiNotification.Error
      })
      .pipe(take(1))
      .subscribe();
  }

  public toastLoadingState<T, DataType>(): (
    source: Observable<T>
  ) => Observable<T> {
    return this.toast.observe({
      loading: 'Saving...',
      success: 'Saved',
      error: 'Error, Could not save.'
    });
  }

  public observerLoadingState<T>(): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>) => {
      return defer(() => {
        this.loadingState$.next(LoadingState.Loading);
        return source.pipe(
          tap({
            next: () => this.loadingState$.next(LoadingState.Success),
            error: () => this.loadingState$.next(LoadingState.Error)
          })
        );
      });
    };
  }
}
