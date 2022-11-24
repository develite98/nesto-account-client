import { BaseMixApiDictionary } from './base-dictionary';

export class ThemeApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/mix-portal/mix-theme/';
  }
}
