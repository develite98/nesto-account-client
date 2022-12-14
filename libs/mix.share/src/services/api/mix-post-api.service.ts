import { Injectable } from '@angular/core';
import {
  BaseMixApiDictionary,
  MixApiDict,
  MixPostPortalModel
} from '@mix/mix.lib';

import { BaseMixApiService } from './base-mix-api.service';

@Injectable({ providedIn: 'root' })
export class MixPostApiService extends BaseMixApiService<MixPostPortalModel> {
  protected get apiDict(): BaseMixApiDictionary {
    return MixApiDict.PostApi;
  }
}

@Injectable({ providedIn: 'root' })
export class MixPostContentApiService extends BaseMixApiService<MixPostPortalModel> {
  protected get apiDict(): BaseMixApiDictionary {
    return MixApiDict.PostContentApi;
  }
}
