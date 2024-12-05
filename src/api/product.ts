import { Request, Response } from "express";
import { ProductService } from "../service/product";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

export class ProductHandler {
  constructor(private productService: ProductService) {}

  // Handler to create a Product
  createProduct = asyncHandler(async (req: Request, res: Response) => {
    const productData = req.body;
    const product = await this.productService.createProduct(productData);
    const response = new ApiResponse(
      201,
      product,
      "Product created successfully"
    );
    res.status(response.statusCode).json(response);
  });

  // Handler to get a Peoduct Details by Id
  getProductById = asyncHandler(async (req: Request, res: Response) => {
    const productId = Number(req.params.id);
    const product = await this.productService.getProductById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    const response = new ApiResponse(
      200,
      product,
      "Product retrieved successfully"
    );
    res.status(response.statusCode).json(response);
  });

  // Handler to update a Product Detail
  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const productId = Number(req.params.id);
    const updateData = req.body;
    const updatedProduct = await this.productService.updateProduct(
      productId,
      updateData
    );
    if (!updatedProduct) {
      throw new ApiError(404, "Product not found");
    }
    const response = new ApiResponse(
      200,
      updatedProduct,
      "Product updated successfully"
    );
    res.status(response.statusCode).json(response);
  });

  // Handler to delete a Product
  deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const productId = Number(req.params.id);
    const isDeleted = await this.productService.deleteProduct(productId);
    if (!isDeleted) {
      throw new ApiError(404, "Product not found");
    }
    const response = new ApiResponse(204, null, "Product deleted successfully");
    res.status(response.statusCode).json(response);
  });

  // Handler to get all the products
  getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { products, total } = await this.productService.getAllProducts(
      limit,
      offset
    );
    const totalPages = Math.ceil(total / limit);

    const response = new ApiResponse(
      200,
      {
        products,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      },
      "Products retrieved successfully"
    );

    res.status(response.statusCode).json(response);
  });

  // Handler to get all the products stock
  getTotalStock = asyncHandler(async (req: Request, res: Response) => {
    const totalStock = await this.productService.getTotalStock();
    const response = new ApiResponse(
      200,
      { totalStock },
      "Total stock retrieved successfully"
    );
    res.status(response.statusCode).json(response);
  });

  // Handler to get all the users by product id
  getUsersByProductId = asyncHandler(async (req: Request, res: Response) => {
    const productId = Number(req.params.id);
    const users = await this.productService.getUsersByProductId(productId);
    const response = new ApiResponse(
      200,
      users,
      "Users retrieved successfully"
    );
    res.status(response.statusCode).json(response);
  });
}
