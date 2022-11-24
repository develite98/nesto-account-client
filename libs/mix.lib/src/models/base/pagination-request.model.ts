export interface MixGraphQLModel {
  columns?: string;
}

export interface PaginationRequestModel extends MixGraphQLModel {
  pageSize?: number;
  keyword?: string;
  pageIndex?: number;
  searchColumns?: string;
  searchMethod?: SearchMethod;
  direction?: 'Asc' | 'Desc';
  orderBy?: string;
  filters?: {
    [key: string]: any;
  };
}

export type SearchMethod = 'Like';
