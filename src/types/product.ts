import { OrderResponse } from "./order";

export interface CreateProductInput {
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface ProductResponse {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  orders: OrderResponse[];
}
