import { BaseMixApiDictionary } from './base-dictionary';

export class PostApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/rest/mix-portal/mix-post-content/';
  }
}

export class PostContentApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/rest/common/post-content/';
  }
}
