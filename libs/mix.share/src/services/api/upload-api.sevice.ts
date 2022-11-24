import { Injectable } from '@angular/core';
import { MixApiDict } from '@mix/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases';

@Injectable({ providedIn: 'root' })
export class UploadApiService extends BaseApiService {
  public uploadFile(formData: FormData): Observable<string> {
    return this.http.post(
      this.url + MixApiDict.UploadApi.uploadEndpoint,
      formData,
      { responseType: 'text' }
    );
  }

  public deleteFile(filePath: string): Observable<void> {
    const params: IHttpParamObject = {
      fullPath: filePath
    };

    return this.delete(MixApiDict.UploadApi.deleteEndpoint, params);
  }
}
