import { BaseMixApiDictionary } from './base-dictionary';

export class ApplicationApiDictionary extends BaseMixApiDictionary {
  protected get url(): string {
    return '/mix-portal/mix-application/';
  }

  public get installEndpoint() {
    return this.url + 'install';
  }
}
