import { Injectable } from '@angular/core';
import {
  MixApiDict,
  MixFile,
  MixFileList,
  PaginationRequestModel,
  PaginationResultModel
} from '@mix/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class MixFileApiService extends BaseApiService {
  public getAssets(request: {
    pageSize: number;
    status: string;
    folder: string;
    orderBy: string;
    direction: string;
  }): Observable<MixFileList> {
    return this.get<MixFileList>(
      MixApiDict.FileApi.getAssests,
      <IHttpParamObject>request
    );
  }

  public getMedias(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<MixFile>> {
    return this.get<PaginationResultModel<MixFile>>(
      MixApiDict.FileApi.getMedias,
      <IHttpParamObject>request
    );
  }
}
