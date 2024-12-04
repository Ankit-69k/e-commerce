import express from "express";
import cors from "cors";
import { UserService } from "../service/user";
import { UserHandler } from "../api/user";
import prisma from "../database/db";

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

    userRoutes.post("/users", userHandler.createUser.bind(userHandler));
    userRoutes.get("/users/:id", userHandler.getUserById.bind(userHandler));
    userRoutes.put("/users/:id", userHandler.updateUser.bind(userHandler));
    userRoutes.delete("/users/:id", userHandler.deleteUser.bind(userHandler));
    userRoutes.get("/users", userHandler.getAllUsers.bind(userHandler));

    return app;
  }
}

export default new RegisterRoute().routes();
