import { MixPostPortalModel } from './mix-post.model';

export interface OrderItem {
  title: string;
  description: string;
  image: string;
  referenceUrl: string;
  currency: string;
  postId: number;
  price: number;
  quantity: number;
  total: number;
  orderId: number;
  mixTenantId: number;
  id: number;
  createdDateTime: Date;
  priority: number;
  status: string;
  post?: MixPostPortalModel;
}

export interface Order {
  title: string;
  total: number;
  userId: string;
  orderStatus: string;
  mixTenantId: number;
  orderItems: OrderItem[];
  id: number;
  createdDateTime: Date;
  priority: number;
  status: string;
}

export interface AddToOrder {
  title: string;
  quantity: number;
  postId: number;
  description?: string;
  image?: string;
  referenceUrl?: string;
}
