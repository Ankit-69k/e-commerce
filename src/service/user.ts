import { PrismaClient } from "@prisma/client";
import { CreateUserInput, UserResponse } from "../types/user";
import { ApiError } from "../utils/apiError";

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  // Service to create User
  async createUser(data: CreateUserInput): Promise<UserResponse> {
    try {
      const user = await this.prisma.user.create({
        data,
        include: {
          orders: true, // Includes orders in the response
        },
      });
      return user as UserResponse;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new ApiError(500, "Unable to create user");
    }
  }

  // Service to Get User Details by ID
  async getUserById(id: number): Promise<UserResponse | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          orders: true,
        },
      });
      return user as UserResponse | null;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new ApiError(500, "Unable to fetch user");
    }
  }

  // Service to Update User
  async updateUser(
    id: number,
    data: Partial<CreateUserInput>
  ): Promise<UserResponse> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data,
        include: {
          orders: true,
        },
      });
      return updatedUser as UserResponse;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new ApiError(500, "Unable to update user");
    }
  }

  // Service to Delete User
  async deleteUser(id: number): Promise<UserResponse> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id },
        include: {
          orders: true,
        },
      });
      return deletedUser as UserResponse;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new ApiError(500, "Unable to delete user");
    }
  }

  // Service to get all Users
  async getAllUsers(
    limit: number,
    offset: number
  ): Promise<{ users: UserResponse[]; total: number }> {
    try {
      const users = (await this.prisma.user.findMany({
        skip: offset,
        take: limit,
        include: {
          orders: true,
        },
      })) as UserResponse[];

      const total = await this.prisma.user.count();

      return { users, total };
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new ApiError(500, "Unable to fetch users");
    }
  }
}
