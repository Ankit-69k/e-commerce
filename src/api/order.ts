import { Request, Response } from "express";
import { OrderService } from "../service/order";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

export class OrderHandler {
  constructor(private orderService: OrderService) {}

  // Handler to create an Order
  createOrder = asyncHandler(async (req: Request, res: Response) => {
    const orderData = req.body;
    const order = await this.orderService.createOrder(orderData);
    const response = new ApiResponse(201, order, "Order created successfully");
    res.status(response.statusCode).json(response);
  });

  // Handler to get Order Details by Id
  getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const orderId = Number(req.params.id);
    const order = await this.orderService.getOrderById(orderId);
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
    const response = new ApiResponse(
      200,
      order,
      "Order retrieved successfully"
    );
    res.status(response.statusCode).json(response);
  });

  // Handler to update an Order
  updateOrder = asyncHandler(async (req: Request, res: Response) => {
    const orderId = Number(req.params.id);
    const updateData = req.body;
    const updatedOrder = await this.orderService.updateOrder(
      orderId,
      updateData
    );
    if (!updatedOrder) {
      throw new ApiError(404, "Order not found");
    }
    const response = new ApiResponse(
      200,
      updatedOrder,
      "Order updated successfully"
    );
    res.status(response.statusCode).json(response);
  });

  // Handler to delete an Order
  deleteOrder = asyncHandler(async (req: Request, res: Response) => {
    const orderId = Number(req.params.id);
    const isDeleted = await this.orderService.deleteOrder(orderId);
    if (!isDeleted) {
      throw new ApiError(404, "Order not found");
    }
    const response = new ApiResponse(204, null, "Order deleted successfully");
    res.status(response.statusCode).json(response);
  });

  // Handler to get all Orders
  getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { orders, total } = await this.orderService.getAllOrders(
      limit,
      offset
    );
    const totalPages = Math.ceil(total / limit);

    const response = new ApiResponse(
      200,
      {
        orders,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      },
      "Orders retrieved successfully"
    );

    res.status(response.statusCode).json(response);
  });

  // Handler to get all the orders of a user
  getOrdersByUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    const orders = await this.orderService.getOrdersByUserId(userId);

    const response = new ApiResponse(
      200,
      orders,
      "Orders retrieved successfully"
    );

    res.status(response.statusCode).json(response);
  });

  // Handler to get last 7 orders
  getLastSevenOrders = asyncHandler(async (req: Request, res: Response) => {
    const orders = await this.orderService.getLastSevenOrders();

    const response = new ApiResponse(
      200,
      orders,
      "Orders retrieved successfully"
    );

    res.status(response.statusCode).json(response);
  });
}
