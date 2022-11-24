export enum RouteConfig {
  PortalDashboard = 'dashboard',

  Post = 'post',
  PostDetail = 'post/:id',
  PostList = 'post/list',
  PostCreate = 'post/create',

  Page = 'page',
  PageDetail = 'page/:id',
  PageList = 'page/list',
  PageCreate = 'page/create',

  Module = 'module',
  ModuleDetail = 'module/:id',
  ModuleList = 'module/list',
  ModuleCreate = 'module/create',

  Theme = 'theme',
  ThemeList = 'theme/list',

  Database = 'database',
  DatabaseList = 'database/list',
  DatabaseCreate = 'database/create',

  Drive = 'drive',
  AppDrive = 'drive/app-drive',
  Medias = 'drive/medias',

  User = 'user',
  UserRole = 'user/roles',

  Settings = 'settings',
  GlobalConfig = 'settings/global-config'
}
