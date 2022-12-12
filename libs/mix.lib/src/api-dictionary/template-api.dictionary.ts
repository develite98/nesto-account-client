import { BaseMixApiDictionary } from './base-dictionary';

export class TemplateApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/rest/mix-portal/mix-template/';
  }
}
