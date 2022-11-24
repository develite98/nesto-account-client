export const environment = {
  production: false,
  // domainUrl: '//v2.dev.mixcore.org/',
  // baseUrl: '//v2.dev.mixcore.org/api/v2/rest',
  domainUrl: 'https://localhost:5010/',
  baseUrl: 'https://localhost:5010/api/v2/rest',
  getThemeUrl:
    '//store.mixcore.org/api/v1/rest/en-us/post/client?pageSize=20&status=Published&orderBy=CreatedDateTime&direction=Desc&postType=theme',
  getAppUrl:
    'https://market.mixcore.net/api/v2/rest/post-content/filter?pageSize=20&status=Published&orderBy=createdDatetime&direction=Desc&searchColumns=title&searchMethod=Like&mixDatabaseName=mixcorePortalApp&queries=[object%20Object]'
};
