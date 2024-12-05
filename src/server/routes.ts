import express from "express";
import cors from "cors";
import { UserService } from "../service/user";
import { UserHandler } from "../api/user";
import prisma from "../database/db";
import { ProductService } from "../service/product";
import { ProductHandler } from "../api/product";
import { OrderService } from "../service/order";
import { OrderHandler } from "../api/order";
import { routesJson } from "../constant/routeInfo";

export class RegisterRoute {
  public routes(): express.Router {
    const app = express();
    const PrismaClient = prisma;

    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
      })
    );

    // User Routes
    const userRoutes = express.Router();
    const userService = new UserService(PrismaClient);
    const userHandler = new UserHandler(userService);
    app.use(userRoutes);

    userRoutes.post("/user", userHandler.createUser.bind(userHandler));
    userRoutes.get("/user/:id", userHandler.getUserById.bind(userHandler));
    userRoutes.put("/user/:id", userHandler.updateUser.bind(userHandler));
    userRoutes.delete("/user/:id", userHandler.deleteUser.bind(userHandler));
    userRoutes.get("/users", userHandler.getAllUsers.bind(userHandler));

    // Product Routes
    const productRoutes = express.Router();
    const productService = new ProductService(PrismaClient);
    const productHandler = new ProductHandler(productService);
    app.use(productRoutes);

    productRoutes.post(
      "/product",
      productHandler.createProduct.bind(productHandler)
    );
    productRoutes.get(
      "/product/:id",
      productHandler.getProductById.bind(productHandler)
    );
    productRoutes.put(
      "/product/:id",
      productHandler.updateProduct.bind(productHandler)
    );
    productRoutes.delete(
      "/product/:id",
      productHandler.deleteProduct.bind(productHandler)
    );
    productRoutes.get(
      "/products",
      productHandler.getAllProducts.bind(productHandler)
    );
    productRoutes.get(
      "/products/stock",
      productHandler.getTotalStock.bind(productHandler)
    );
    productRoutes.get(
      "/product/users/:id",
      productHandler.getUsersByProductId.bind(productHandler)
    );

    // Orders Route
    const orderRoutes = express.Router();
    const orderService = new OrderService(PrismaClient);
    const orderHandler = new OrderHandler(orderService);
    app.use(orderRoutes);

    orderRoutes.post("/order", orderHandler.createOrder.bind(orderHandler));
    orderRoutes.get("/order/:id", orderHandler.getOrderById.bind(orderHandler));
    orderRoutes.put("/order/:id", orderHandler.updateOrder.bind(orderHandler));
    orderRoutes.delete(
      "/order/:id",
      orderHandler.deleteOrder.bind(orderHandler)
    );
    orderRoutes.get("/orders", orderHandler.getAllOrders.bind(orderHandler));
    orderRoutes.get(
      "/orders/users/:id",
      orderHandler.getOrdersByUser.bind(orderHandler)
    );
    orderRoutes.get(
      "/orders/lastOrders",
      orderHandler.getLastSevenOrders.bind(orderHandler)
    );

    return app;
  }
}
