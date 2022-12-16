export interface UserData {
  addresses: Address[];
}

export interface Address {
  id: number;
  name: string;
  email: string;
  phone: string;
  street: string;
  district: string;
  province: string;
  isDefault: boolean;
}
