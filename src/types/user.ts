import { OrderResponse } from "./order";

export interface CreateUserInput {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: OrderResponse[];
}
