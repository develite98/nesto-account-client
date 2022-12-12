import { BaseMixApiDictionary } from './base-dictionary';

export class PageApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/rest/mix-portal/mix-page-content/';
  }
}
