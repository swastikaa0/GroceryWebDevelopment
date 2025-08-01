const productController = require("../controllers/productController");
const Product = require("../models/Product");

// Mock the Product model
jest.mock("../models/Product");

describe("Product Controller", () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup mock request
    mockRequest = {
      body: {},
      params: {},
      query: {}
    };

    // Setup mock response
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe("getAllProducts", () => {
    it("should return all products successfully", async () => {
      const mockProducts = [
        { id: 1, name: "Apple", price: 1.99 },
        { id: 2, name: "Banana", price: 0.99 }
      ];
      const mockTotalCount = 2;

      mockRequest.query = { limit: 10, offset: 0 };
      Product.findAll.mockResolvedValue(mockProducts);
      Product.getCount.mockResolvedValue(mockTotalCount);

      await productController.getAllProducts(mockRequest, mockResponse);

      expect(Product.findAll).toHaveBeenCalledWith({
        category_id: undefined,
        search: undefined,
        min_price: undefined,
        max_price: undefined,
        is_featured: false,
        sort_by: undefined,
        limit: 10,
        offset: 0
      });
      expect(Product.getCount).toHaveBeenCalledWith({
        category_id: undefined,
        search: undefined,
        min_price: undefined,
        max_price: undefined,
        is_featured: false,
        sort_by: undefined,
        limit: 10,
        offset: 0
      });
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockProducts,
        pagination: {
          total: mockTotalCount,
          page: 1,
          limit: 10,
          totalPages: 1
        }
      });
    });

    it("should use default pagination when not provided", async () => {
      const mockProducts = [];
      const mockTotalCount = 0;

      Product.findAll.mockResolvedValue(mockProducts);
      Product.getCount.mockResolvedValue(mockTotalCount);

      await productController.getAllProducts(mockRequest, mockResponse);

      expect(Product.findAll).toHaveBeenCalledWith({
        category_id: undefined,
        search: undefined,
        min_price: undefined,
        max_price: undefined,
        is_featured: false,
        sort_by: undefined,
        limit: 20,
        offset: 0
      });
    });

    it("should handle filters correctly", async () => {
      const mockProducts = [];
      const mockTotalCount = 0;

      mockRequest.query = {
        category_id: 1,
        search: "apple",
        min_price: 1,
        max_price: 10,
        is_featured: "true",
        sort_by: "price_asc"
      };

      Product.findAll.mockResolvedValue(mockProducts);
      Product.getCount.mockResolvedValue(mockTotalCount);

      await productController.getAllProducts(mockRequest, mockResponse);

      expect(Product.findAll).toHaveBeenCalledWith({
        category_id: 1,
        search: "apple",
        min_price: 1,
        max_price: 10,
        is_featured: true,
        sort_by: "price_asc",
        limit: 20,
        offset: 0
      });
    });

    it("should handle server error", async () => {
      const error = new Error("Database error");
      Product.findAll.mockRejectedValue(error);

      await productController.getAllProducts(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("getProductById", () => {
    it("should return product successfully", async () => {
      const mockProduct = {
        id: 1,
        name: "Apple",
        price: 1.99,
        description: "Fresh apple"
      };

      mockRequest.params = { id: 1 };
      Product.findById.mockResolvedValue(mockProduct);

      await productController.getProductById(mockRequest, mockResponse);

      expect(Product.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockProduct
      });
    });

    it("should return 404 when product not found", async () => {
      mockRequest.params = { id: 999 };
      Product.findById.mockResolvedValue(null);

      await productController.getProductById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Product not found"
      });
    });

    it("should handle server error", async () => {
      const error = new Error("Database error");
      mockRequest.params = { id: 1 };
      Product.findById.mockRejectedValue(error);

      await productController.getProductById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("createProduct", () => {
    it("should create product successfully", async () => {
      const mockProduct = {
        id: 1,
        name: "New Product",
        price: 9.99,
        description: "Test product"
      };

      mockRequest.body = {
        name: "New Product",
        price: 9.99,
        description: "Test product"
      };

      // Mock validationResult to return no errors
      const mockValidationResult = {
        isEmpty: () => true,
        array: () => []
      };
      jest.doMock('express-validator', () => ({
        validationResult: jest.fn(() => mockValidationResult)
      }));

      Product.create.mockResolvedValue(mockProduct);

      await productController.createProduct(mockRequest, mockResponse);

      expect(Product.create).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockProduct
      });
    });

    it("should return 400 when validation fails", async () => {
      const mockErrors = [
        { field: 'name', message: 'Name is required' }
      ];

      const mockValidationResult = {
        isEmpty: () => false,
        array: () => mockErrors
      };

      // Mock validationResult to return errors
      jest.doMock('express-validator', () => ({
        validationResult: jest.fn(() => mockValidationResult)
      }));

      await productController.createProduct(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        errors: mockErrors
      });
    });

    it("should handle server error", async () => {
      const error = new Error("Database error");
      Product.create.mockRejectedValue(error);

      await productController.createProduct(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("updateProduct", () => {
    it("should update product successfully", async () => {
      const mockProduct = {
        id: 1,
        name: "Updated Product",
        price: 15.99,
        description: "Updated description"
      };

      mockRequest.params = { id: 1 };
      mockRequest.body = {
        name: "Updated Product",
        price: 15.99
      };

      // Mock validationResult to return no errors
      const mockValidationResult = {
        isEmpty: () => true,
        array: () => []
      };
      jest.doMock('express-validator', () => ({
        validationResult: jest.fn(() => mockValidationResult)
      }));

      Product.update.mockResolvedValue(mockProduct);

      await productController.updateProduct(mockRequest, mockResponse);

      expect(Product.update).toHaveBeenCalledWith(1, mockRequest.body);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockProduct
      });
    });

    it("should return 400 when validation fails", async () => {
      const mockErrors = [
        { field: 'price', message: 'Price must be positive' }
      ];

      const mockValidationResult = {
        isEmpty: () => false,
        array: () => mockErrors
      };

      mockRequest.params = { id: 1 };
      mockRequest.body = { price: -10 };

      // Mock validationResult to return errors
      jest.doMock('express-validator', () => ({
        validationResult: jest.fn(() => mockValidationResult)
      }));

      await productController.updateProduct(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        errors: mockErrors
      });
    });

    it("should return 404 when product not found", async () => {
      mockRequest.params = { id: 999 };
      mockRequest.body = { name: "Updated Product" };

      // Mock validationResult to return no errors
      const mockValidationResult = {
        isEmpty: () => true,
        array: () => []
      };
      jest.doMock('express-validator', () => ({
        validationResult: jest.fn(() => mockValidationResult)
      }));

      Product.update.mockResolvedValue(null);

      await productController.updateProduct(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Product not found"
      });
    });

    it("should handle server error", async () => {
      const error = new Error("Database error");
      mockRequest.params = { id: 1 };
      Product.update.mockRejectedValue(error);

      await productController.updateProduct(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("deleteProduct", () => {
    it("should delete product successfully", async () => {
      const mockProduct = {
        id: 1,
        name: "Deleted Product"
      };

      mockRequest.params = { id: 1 };
      Product.delete.mockResolvedValue(mockProduct);

      await productController.deleteProduct(mockRequest, mockResponse);

      expect(Product.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: "Product deleted successfully"
      });
    });

    it("should return 404 when product not found", async () => {
      mockRequest.params = { id: 999 };
      Product.delete.mockResolvedValue(null);

      await productController.deleteProduct(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Product not found"
      });
    });

    it("should handle server error", async () => {
      const error = new Error("Database error");
      mockRequest.params = { id: 1 };
      Product.delete.mockRejectedValue(error);

      await productController.deleteProduct(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("getFeaturedProducts", () => {
    it("should return featured products successfully", async () => {
      const mockProducts = [
        { id: 1, name: "Featured Product 1", is_featured: true },
        { id: 2, name: "Featured Product 2", is_featured: true }
      ];

      Product.findAll.mockResolvedValue(mockProducts);

      await productController.getFeaturedProducts(mockRequest, mockResponse);

      expect(Product.findAll).toHaveBeenCalledWith({ is_featured: true, limit: 8 });
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockProducts
      });
    });

    it("should handle server error", async () => {
      const error = new Error("Database error");
      Product.findAll.mockRejectedValue(error);

      await productController.getFeaturedProducts(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("getLowStockProducts", () => {
    it("should return low stock products successfully", async () => {
      const mockProducts = [
        { id: 1, name: "Low Stock Product 1", stock_quantity: 5 },
        { id: 2, name: "Low Stock Product 2", stock_quantity: 3 }
      ];

      Product.getLowStockProducts.mockResolvedValue(mockProducts);

      await productController.getLowStockProducts(mockRequest, mockResponse);

      expect(Product.getLowStockProducts).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockProducts
      });
    });

    it("should handle server error", async () => {
      const error = new Error("Database error");
      Product.getLowStockProducts.mockRejectedValue(error);

      await productController.getLowStockProducts(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("searchProducts", () => {
    it("should search products successfully", async () => {
      const mockProducts = [
        { id: 1, name: "Apple", description: "Fresh apple" },
        { id: 2, name: "Apple Juice", description: "Apple juice drink" }
      ];

      mockRequest.query = { q: "apple", limit: 10, offset: 0 };
      Product.findAll.mockResolvedValue(mockProducts);

      await productController.searchProducts(mockRequest, mockResponse);

      expect(Product.findAll).toHaveBeenCalledWith({
        search: "apple",
        limit: 10,
        offset: 0
      });
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockProducts
      });
    });

    it("should return 400 when search query is missing", async () => {
      mockRequest.query = { limit: 10 };

      await productController.searchProducts(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Search query is required"
      });
    });

    it("should use default pagination when not provided", async () => {
      const mockProducts = [];

      mockRequest.query = { q: "test" };
      Product.findAll.mockResolvedValue(mockProducts);

      await productController.searchProducts(mockRequest, mockResponse);

      expect(Product.findAll).toHaveBeenCalledWith({
        search: "test",
        limit: 20,
        offset: 0
      });
    });

    it("should handle server error", async () => {
      const error = new Error("Database error");
      mockRequest.query = { q: "test" };
      Product.findAll.mockRejectedValue(error);

      await productController.searchProducts(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Server error"
      });
    });
  });
});