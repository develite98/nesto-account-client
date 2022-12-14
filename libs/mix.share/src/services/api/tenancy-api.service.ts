import { Injectable } from '@angular/core';
import {
  IInitFullTenantRequest,
  InitStep,
  MixApiDict,
  MixSiteDataModel,
  ThemeAdditionalData
} from '@mix/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class TenancyApiService extends BaseApiService {
  public initFullTenant(request: IInitFullTenantRequest): Observable<void> {
    return this.post(MixApiDict.TenancyApi.initFullTenantEndpoint, request);
  }

  public getInitStatus(): Observable<InitStep> {
    return this.get(MixApiDict.TenancyApi.getInitStatusEndpoint);
  }

  public installTheme(themeModel: ThemeAdditionalData): Observable<boolean> {
    return this.post(MixApiDict.TenancyApi.installThemeEndpoint, themeModel);
  }

  public loadTheme(): Observable<MixSiteDataModel> {
    return this.get(MixApiDict.TenancyApi.loadThemeEndpoint);
  }

  public importTheme(siteData: MixSiteDataModel): Observable<MixSiteDataModel> {
    return this.post(MixApiDict.TenancyApi.importTheme, siteData);
  }
}
