import { PrismaClient } from "@prisma/client";
import { CreateUserInput, UserResponse } from "../types/user";

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(data: CreateUserInput): Promise<UserResponse> {
    const user = await this.prisma.user.create({
      data,
      include: {
        orders: true, // Includes orders in the response
      },
    });
    return user as UserResponse;
  }

  async getUserById(id: number): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        orders: true,
      },
    });
    return user as UserResponse | null;
  }

  async getUserByEmail(email: string): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        orders: true,
      },
    });
    return user as UserResponse | null;
  }

  async updateUser(
    id: number,
    data: Partial<CreateUserInput>
  ): Promise<UserResponse> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
      include: {
        orders: true,
      },
    });
    return updatedUser as UserResponse;
  }

  async deleteUser(id: number): Promise<UserResponse> {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
      include: {
        orders: true,
      },
    });
    return deletedUser as UserResponse;
  }

  async getAllUsers(limit: number, offset: number) {
    const users = await this.prisma.user.findMany({
      skip: offset,
      take: limit,
    });

    const total = await this.prisma.user.count();

    return { users, total };
  }
}
