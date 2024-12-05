import { Request, Response } from "express";
import { UserService } from "../service/user";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

export class UserHandler {
  constructor(private userService: UserService) {}

  // Handler to create a User
  createUser = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await this.userService.createUser(userData);
    const response = new ApiResponse(201, user, "User created successfully");
    res.status(response.statusCode).json(response);
  });

  // Handler to get User Details by Id
  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const response = new ApiResponse(200, user, "User retrieved successfully");
    res.status(response.statusCode).json(response);
  });

  // Handler to update a User
  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const updateData = req.body;
    const updatedUser = await this.userService.updateUser(userId, updateData);
    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }
    const response = new ApiResponse(
      200,
      updatedUser,
      "User updated successfully"
    );
    res.status(response.statusCode).json(response);
  });

  // Handler to delete a User
  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const isDeleted = await this.userService.deleteUser(userId);
    if (!isDeleted) {
      throw new ApiError(404, "User not found");
    }
    const response = new ApiResponse(204, null, "User deleted successfully");
    res.status(response.statusCode).json(response);
  });

  // Handler to get All Users
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { users, total } = await this.userService.getAllUsers(limit, offset);
    const totalPages = Math.ceil(total / limit);

    const response = new ApiResponse(
      200,
      {
        users,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      },
      "Users retrieved successfully"
    );

    res.status(response.statusCode).json(response);
  });
}
