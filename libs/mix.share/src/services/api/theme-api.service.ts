import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  BaseMixApiDictionary,
  IPaginationResult,
  MixApiDict,
  MixApplicationModel,
  ThemeModel
} from '@mix/mix.lib';
import { Observable } from 'rxjs';

import { BASE_URL, GET_APP_URL, GET_THEME_URL } from '../../token';
import { AppEventService } from '../helper/app-event.service';
import { BaseMixApiService } from './base-mix-api.service';

@Injectable({ providedIn: 'root' })
export class ThemeApiService extends BaseMixApiService<ThemeModel> {
  protected get apiDict(): BaseMixApiDictionary {
    return MixApiDict.ThemeApi;
  }

  constructor(
    protected override readonly http: HttpClient,
    @Inject(BASE_URL) public override baseUrl: string,
    @Inject(GET_THEME_URL) public getThemeStoreUrl: string,
    @Inject(GET_APP_URL) public getAppUrl: string,
    public override appEvent: AppEventService
  ) {
    super(http, baseUrl, appEvent);
  }

  public getThemeStore(): Observable<IPaginationResult<ThemeModel>> {
    return this.http.get<IPaginationResult<ThemeModel>>(this.getThemeStoreUrl);
  }

  public getAppOnStore(): Observable<IPaginationResult<MixApplicationModel>> {
    return this.http.get<IPaginationResult<MixApplicationModel>>(
      this.getAppUrl
    );
  }
}
