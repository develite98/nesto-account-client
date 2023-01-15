import { Injectable } from '@angular/core';
import { MixApiDict } from '@mix/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../bases';

@Injectable({ providedIn: 'root' })
export class DynamicDbApiService extends BaseApiService {
  public postDb(
    request: Record<string, string | number | boolean | null>,
    dbName: string
  ): Observable<Record<string, string>> {
    return this.post(MixApiDict.DynamicDbApi.prefix + dbName, request);
  }
}
