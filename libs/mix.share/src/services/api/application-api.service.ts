import { Injectable } from '@angular/core';
import {
  ApplicationApiDictionary,
  MixApiDict,
  MixApplicationModel
} from '@mix/mix.lib';
import { Observable } from 'rxjs';

import { BaseMixApiService } from './base-mix-api.service';

@Injectable({ providedIn: 'root' })
export class ApplicationApiService extends BaseMixApiService<MixApplicationModel> {
  protected get apiDict(): ApplicationApiDictionary {
    return MixApiDict.ApplicationApi;
  }

  public installApp(request: any): Observable<boolean> {
    return this.post(this.apiDict.installEndpoint, request);
  }
}
