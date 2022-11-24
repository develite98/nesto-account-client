import { ApplicationApiDictionary } from './application-api.dictionary';
import { FileApiDictionary } from './file-api.dictionary';
import { DatabaseApiDictionary } from './mix-database.dictionary';
import { UploadFileApiDictionary } from './mix-upload-api.dictionary';
import { ModuleApiDictionary } from './module-api.dictionary';
import { PageApiDictionary } from './page-api.dictionary';
import { PostApiDictionary } from './post-api.dictionary';
import {
  PageModuleApiDictionary,
  PostPostApiDictionary
} from './reference-table.dictionary';
import { RolesApiDictionary } from './role-api.dictionary';
import { ShareApiDictionary } from './share-api.dictionary';
import { TemplateApiDictionary } from './template-api.dictionary';
import { TenancyApiDictionary } from './tenancy-api.dictionary';
import { ThemeApiDictionary } from './theme-api.dictionary';
import { UsersApiDictionary } from './user-api.dictionary';

export class MixApiDictionary {
  public PostApi: PostApiDictionary = new PostApiDictionary();
  public PageApi: PageApiDictionary = new PageApiDictionary();
  public ShareApi: ShareApiDictionary = new ShareApiDictionary();
  public ModuleApi: ModuleApiDictionary = new ModuleApiDictionary();
  public TenancyApi: TenancyApiDictionary = new TenancyApiDictionary();
  public DatabaseApi: DatabaseApiDictionary = new DatabaseApiDictionary();
  public ThemeApi: ThemeApiDictionary = new ThemeApiDictionary();
  public TemplateApi: TemplateApiDictionary = new TemplateApiDictionary();
  public ApplicationApi: ApplicationApiDictionary =
    new ApplicationApiDictionary();
  // reference table
  public PostPostApi: PostPostApiDictionary = new PostPostApiDictionary();
  public PageModuleApi: PageModuleApiDictionary = new PageModuleApiDictionary();
  public UserApi: UsersApiDictionary = new UsersApiDictionary();
  public RoleApi: RolesApiDictionary = new RolesApiDictionary();
  // File
  public UploadApi: UploadFileApiDictionary = new UploadFileApiDictionary();
  public FileApi: FileApiDictionary = new FileApiDictionary();
}

export const MixApiDict = new MixApiDictionary();
