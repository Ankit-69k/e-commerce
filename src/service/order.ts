import { PrismaClient } from "@prisma/client";
import { CreateOrderInput, OrderResponse } from "../types/order";
import { ApiError } from "../utils/apiError";

export class OrderService {
  constructor(private readonly prisma: PrismaClient) {}

  // Service to create Order
  async createOrder(data: CreateOrderInput): Promise<OrderResponse> {
    try {
      const order = await this.prisma.order.create({
        data,
        include: {
          user: true,
          product: true,
        },
      });
      return order as OrderResponse;
    } catch (error) {
      throw new ApiError(500, "Unable to create order");
    }
  }

  // Service to get Order Details by Id
  async getOrderById(id: number): Promise<OrderResponse | null> {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id },
        include: {
          user: true,
          product: true,
        },
      });
      return order as OrderResponse | null;
    } catch (error) {
      throw new ApiError(500, "Unable to retrieve order");
    }
  }

  // Service to Update Order
  async updateOrder(
    id: number,
    data: Partial<CreateOrderInput>
  ): Promise<OrderResponse> {
    try {
      const updatedOrder = await this.prisma.order.update({
        where: { id },
        data,
        include: {
          user: true,
          product: true,
        },
      });
      return updatedOrder as OrderResponse;
    } catch (error) {
      throw new ApiError(500, "Unable to update order");
    }
  }

  // Service to Delete Order
  async deleteOrder(id: number): Promise<OrderResponse> {
    try {
      const deletedOrder = await this.prisma.order.delete({
        where: { id },
        include: {
          user: true,
          product: true,
        },
      });
      return deletedOrder as OrderResponse;
    } catch (error) {
      throw new ApiError(500, "Unable to delete order");
    }
  }

  // Service to get all Orders
  async getAllOrders(
    limit: number,
    offset: number
  ): Promise<{ orders: OrderResponse[]; total: number }> {
    try {
      const orders = await this.prisma.order.findMany({
        skip: offset,
        take: limit,
        include: {
          user: true,
          product: true,
        },
      });

      const total = await this.prisma.order.count();

      return { orders, total };
    } catch (error) {
      throw new ApiError(500, "Unable to retrieve orders");
    }
  }

  // Service to get Last 7 Orders
  async getLastSevenOrders(): Promise<OrderResponse[]> {
    try {
      const orders = await this.prisma.order.findMany({
        take: 7,
        orderBy: {
          orderDate: "desc",
        },
        include: {
          user: true,
          product: true,
        },
      });

      return orders as OrderResponse[];
    } catch (error) {
      throw new ApiError(500, "Unable to retrieve orders");
    }
  }

  // Service to get Orders by User Id
  async getOrdersByUserId(userId: number): Promise<OrderResponse[]> {
    try {
      const orders = await this.prisma.order.findMany({
        where: { userId },
        include: {
          user: true,
          product: true,
        },
      });

      return orders as OrderResponse[];
    } catch (error) {
      throw new ApiError(500, "Unable to retrieve orders");
    }
  }
}
