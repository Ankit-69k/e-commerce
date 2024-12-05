export interface CreateOrderInput {
  userId: number;
  productId: number;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  userId: number;
  productId: number;
  orderDate: Date;
  quantity: number;
}
