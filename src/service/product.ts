import { PrismaClient } from "@prisma/client";
import { CreateProductInput, ProductResponse } from "../types/product";
import { ApiError } from "../utils/apiError";

export class ProductService {
  constructor(private readonly prisma: PrismaClient) {}

  // Service to Create Products
  async createProduct(data: CreateProductInput): Promise<ProductResponse> {
    try {
      const product = await this.prisma.product.create({
        data,
        include: {
          orders: true,
        },
      });
      return product as ProductResponse;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new ApiError(500, "Unable to create product");
    }
  }

  // Service to get Product Details by Id
  async getProductById(id: number): Promise<ProductResponse | null> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          orders: true,
        },
      });
      return product as ProductResponse | null;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw new ApiError(500, "Unable to fetch product");
    }
  }

  // Service to Update Product Details
  async updateProduct(
    id: number,
    data: Partial<CreateProductInput>
  ): Promise<ProductResponse> {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data,
        include: {
          orders: true,
        },
      });
      return updatedProduct as ProductResponse;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new ApiError(500, "Unable to update product");
    }
  }

  // Service to Delete Product
  async deleteProduct(id: number): Promise<ProductResponse> {
    try {
      const deletedProduct = await this.prisma.product.delete({
        where: { id },
      });
      return deletedProduct as ProductResponse;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new ApiError(
        500,
        "Unable to delete product. Check for related data constraints."
      );
    }
  }

  // Service to get all the products
  async getAllProducts(
    limit: number,
    offset: number
  ): Promise<{ products: ProductResponse[]; total: number }> {
    try {
      const products = (await this.prisma.product.findMany({
        skip: offset,
        take: limit,
      })) as ProductResponse[];

      const total = await this.prisma.product.count();

      return { products, total };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new ApiError(500, "Unable to fetch products");
    }
  }
}
