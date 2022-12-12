export class UsersApiDictionary {
  public prefix = '/rest/mix-account/user/';
  public initFullTenantEndpoint = this.prefix + 'register';
  public getListEndpoint = this.prefix + 'list';
  public getProfileEndpoint = this.prefix + 'details';
  public saveProfileEndpoint = this.prefix + 'save';
}
