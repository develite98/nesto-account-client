import { MixPostPortalModel, Order } from '@mix/mix.lib';

export function updateOrderVariant(v: Order, posts: MixPostPortalModel[]): Order {
  v.orderItems = v.orderItems.map(order => {
    const post = posts.find(post => post.id === order.postId);
    if (
      post &&
      post.additionalData &&
      post.additionalData['variants'] &&
      post.additionalData['variants'].length
    ) {
      const variant = (post.additionalData['variants'] as any[]).find(
        x => x.sku === order.sku
      );
      if (variant) {
        order.variantColor = variant.color;
        order.variantSize = variant.size;
        order.inventory = variant.inventory ?? 0;
      }
    }

    return order;
  });

  return v;
}
