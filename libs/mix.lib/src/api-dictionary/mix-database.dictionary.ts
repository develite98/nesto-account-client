import { BaseMixApiDictionary } from './base-dictionary';

export class DatabaseApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/mix-portal/mix-database/';
  }
}
