import { Injectable } from '@angular/core';
import {
  MixApiDict,
  MixUser,
  PaginationRequestModel,
  PaginationResultModel
} from '@mix/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class UserApiService extends BaseApiService {
  public getUsers(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<MixUser>> {
    return this.get<PaginationResultModel<MixUser>>(
      MixApiDict.UserApi.getListEndpoint,
      <IHttpParamObject>request
    );
  }

  public getUserProfile(id: string): Observable<MixUser> {
    return this.get(`${MixApiDict.UserApi.getProfileEndpoint}/${id}`);
  }

  public saveUserProfile(user: MixUser): Observable<void> {
    return this.post(MixApiDict.UserApi.saveProfileEndpoint, user);
  }
}
