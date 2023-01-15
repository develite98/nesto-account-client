export class UploadFileApiDictionary {
  public prefix = '/rest/mix-storage/';
  public uploadEndpoint = this.prefix + 'file-system/upload-file';
  public deleteEndpoint = this.prefix + 'file-system/delete';
  public customerUploadEndpoint = this.prefix + 'upload-file';
}
