import { BaseMixApiDictionary } from './base-dictionary';

export class ThemeApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/rest/mix-portal/mix-theme/';
  }
}
