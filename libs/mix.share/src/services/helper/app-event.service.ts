import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';

export enum AppEvent {
  NewModuleAdded = 'NewModuleAdded',
  NewPageAdded = 'NewPageAdded',
  NewPostAdded = 'NewPostAdded',
  NewThemeAdded = 'NewThemeAdded',
  CreatePost = 'CreatePost',
  CreatePage = 'CreatePage',
  CreateModule = 'CreateModule',
  CreateTheme = 'CreateTheme',
  UniversalSearch = 'UniversalSearch',
  ThemeSelected = 'ThemeSelected',
  Refresh = 'Refresh',
  InstallApp = 'InstallApp',
  CartUpdate = 'CartUpdate'
}

export interface AppEventModel {
  type: AppEvent;
  data?: any;
}

@Injectable({ providedIn: 'root' })
export class AppEventService {
  public event$: Subject<AppEventModel> = new Subject();

  public notify(event: AppEventModel): void {
    this.event$.next(event);
  }

  public onSearch(): void {
    this.event$.next({ type: AppEvent.UniversalSearch });
  }

  public getEvent(type: AppEvent): Observable<AppEventModel> {
    return this.event$.pipe(filter(e => e.type === type));
  }
}
