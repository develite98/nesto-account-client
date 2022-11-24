import { Injectable } from '@angular/core';
import {
  BaseMixApiDictionary,
  MixApiDict,
  MixDatabaseModel
} from '@mix/mix.lib';

import { BaseMixApiService } from './base-mix-api.service';

@Injectable({ providedIn: 'root' })
export class DatabaseApiService extends BaseMixApiService<MixDatabaseModel> {
  protected get apiDict(): BaseMixApiDictionary {
    return MixApiDict.DatabaseApi;
  }
}
