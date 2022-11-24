import { Injectable } from '@angular/core';
import {
  MixApiDict,
  MixRole,
  PaginationRequestModel,
  PaginationResultModel
} from '@mix/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class RoleApiService extends BaseApiService {
  public getRoles(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<MixRole>> {
    return this.get<PaginationResultModel<MixRole>>(
      MixApiDict.RoleApi.getListEndpoint,
      <IHttpParamObject>request
    );
  }
}
