import { ApplicationApiDictionary } from './application-api.dictionary';
import { CartApiDictionary } from './cart-api.dictionary';
import { FileApiDictionary } from './file-api.dictionary';
import { DatabaseApiDictionary } from './mix-database.dictionary';
import { MixDynamicDbDictionary } from './mix-dynamic-db.dictionary';
import { UploadFileApiDictionary } from './mix-upload-api.dictionary';
import { ModuleApiDictionary } from './module-api.dictionary';
import { PageApiDictionary } from './page-api.dictionary';
import {
  PostApiDictionary,
  PostContentApiDictionary
} from './post-api.dictionary';
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
import { MixUserDataApiDict } from './user-data-api.dictionary';

export class MixApiDictionary {
  public PostApi: PostApiDictionary = new PostApiDictionary();
  public PostContentApi: PostContentApiDictionary =
    new PostContentApiDictionary();
  public PageApi: PageApiDictionary = new PageApiDictionary();
  public ShareApi: ShareApiDictionary = new ShareApiDictionary();
  public ModuleApi: ModuleApiDictionary = new ModuleApiDictionary();
  public TenancyApi: TenancyApiDictionary = new TenancyApiDictionary();
  public DatabaseApi: DatabaseApiDictionary = new DatabaseApiDictionary();
  public ThemeApi: ThemeApiDictionary = new ThemeApiDictionary();
  public TemplateApi: TemplateApiDictionary = new TemplateApiDictionary();
  public ApplicationApi: ApplicationApiDictionary =
    new ApplicationApiDictionary();
  public UserDataApi: MixUserDataApiDict = new MixUserDataApiDict();
  public CartApi: CartApiDictionary = new CartApiDictionary();
  public DynamicDbApi: MixDynamicDbDictionary = new MixDynamicDbDictionary();

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
