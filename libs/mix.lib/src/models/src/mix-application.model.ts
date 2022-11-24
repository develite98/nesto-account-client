export interface MixApplicationModel {
  baseRoute: string;
  detailUrl: string;
  displayName: string;
  id: number;
  createdDateTime: Date;
  createdBy: string;
  title: string;
  image: string;
  additionalData: {
    source: string;
  };
}
