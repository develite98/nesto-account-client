export interface UserData {
  Id: number;
  CreatedDateTime: Date;
  LastModified?: Date;
  MixTenantId: number;
  CreatedBy?: string;
  IsDeleted?: boolean;
  Avatar: string;
  ParentId: string;
  ParentType: string;
}

export interface UserRole {
  userId: string;
  roleId: string;
  mixTenantId: number;
}

export class MixUser {
  public id?: string;
  public userName?: string;
  public normalizedUserName?: string;
  public email?: string;
  public connectionId?: string;
  public avatar?: string;
  public userData!: UserData;
  public roles!: UserRole[];
}
