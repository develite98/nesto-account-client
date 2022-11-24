import { Injectable } from '@angular/core';
import {
  Culture,
  GlobalSettings,
  IGetAllCultureResult,
  MixApiDict
} from '@mix/mix.lib';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseApiService } from '../../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class ShareApiService extends BaseApiService {
  public culture$: BehaviorSubject<Culture[]> = new BehaviorSubject<Culture[]>(
    []
  );

  public getCultures(): Observable<Culture[]> {
    return this.get<IGetAllCultureResult>(
      MixApiDict.ShareApi.getCulturesEndpoint
    ).pipe(map(res => res.items));
  }

  public getCurrentCultures(): Observable<Culture[]> {
    return this.get<IGetAllCultureResult>(
      MixApiDict.ShareApi.getCurrentCulturesEndpoint
    ).pipe(map(res => res.items));
  }

  public getGlobalSetting(): Observable<GlobalSettings> {
    return this.get<GlobalSettings>(
      MixApiDict.ShareApi.getGlobalSettingsEndpoint
    );
  }
}
