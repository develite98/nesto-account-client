import { BaseMixApiDictionary } from './base-dictionary';

export class ModuleApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/rest/mix-portal/mix-module-content/';
  }
}
