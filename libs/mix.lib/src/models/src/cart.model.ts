import { MixPostPortalModel } from './mix-post.model';

export interface OrderItem {
  sku: string;
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
  isActive?: boolean;
  variantColor?: string;
  variantSize?: string;
  inventory?: number;
}

export interface Order {
  title: string;
  total: number;
  userId: string;
  mixTenantId: number;
  orderItems: OrderItem[];
  id: number;
  createdDateTime: Date;
  status: string;
  priority: number;
  email?: string;
  address?: Record<string, string> | any;
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentGateway?: CheckoutType;

}

export interface AddToOrder {
  sku: string;
  title: string;
  quantity: number;
  postId: number;
  description?: string;
  image?: string;
  referenceUrl?: string;
  isActive?: boolean;
}

export enum CheckoutType {
  Onepay = 'Onepay',
  Momo = 'Momo'
}

export enum OrderStatus {
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
  PAID = 'PAID',
  NEW = 'NEW',
  SHIPPING = 'SHIPPING',
  SHIPPING_FAILED = 'SHIPPING_FAILED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  SUCCESS = 'SUCCESS',
  CANCELED = 'CANCELED'
}

export enum PaymentStatus {
  SENT = 'SENT',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}
