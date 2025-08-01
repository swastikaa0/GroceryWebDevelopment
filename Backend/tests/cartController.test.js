const cartController = require("../controllers/cartController");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Mock the models
jest.mock("../models/Cart");
jest.mock("../models/Product");

describe("Cart Controller", () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup mock request with user authentication
    mockRequest = {
      user: { userId: 1 },
      body: {},
      params: {}
    };

    // Setup mock response
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe("getCart", () => {
    it("should return cart items and total successfully", async () => {
      const mockCartItems = [
        { id: 1, product_id: 1, quantity: 2, name: "Apple", price: 1.99 },
        { id: 2, product_id: 2, quantity: 1, name: "Banana", price: 0.99 }
      ];
      const mockCartTotal = { total_amount: 4.97, item_count: 2, total_quantity: 3 };

      Cart.findByUser.mockResolvedValue(mockCartItems);
      Cart.getCartTotal.mockResolvedValue(mockCartTotal);

      await cartController.getCart(mockRequest, mockResponse);

      expect(Cart.findByUser).toHaveBeenCalledWith(1);
      expect(Cart.getCartTotal).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: {
          items: mockCartItems,
          total: mockCartTotal
        }
      });
    });

    it("should handle server error", async () => {
      const error = new Error("Database error");
      Cart.findByUser.mockRejectedValue(error);

      await cartController.getCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("addToCart", () => {
    it("should add product to cart successfully", async () => {
      const mockProduct = {
        id: 1,
        name: "Apple",
        stock_quantity: 10,
        max_order_quantity: 5
      };
      const mockCartItem = {
        id: 1,
        user_id: 1,
        product_id: 1,
        quantity: 2
      };

      mockRequest.body = { product_id: 1, quantity: 2 };
      Product.findById.mockResolvedValue(mockProduct);
      Cart.addItem.mockResolvedValue(mockCartItem);

      await cartController.addToCart(mockRequest, mockResponse);

      expect(Product.findById).toHaveBeenCalledWith(1);
      expect(Cart.addItem).toHaveBeenCalledWith(1, 1, 2);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: "Product added to cart successfully",
        data: mockCartItem
      });
    });

    it("should return 400 when product_id is missing", async () => {
      mockRequest.body = { quantity: 2 };

      await cartController.addToCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Product ID and valid quantity are required"
      });
    });

    it("should return 400 when quantity is missing", async () => {
      mockRequest.body = { product_id: 1 };

      await cartController.addToCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Product ID and valid quantity are required"
      });
    });

    it("should return 400 when quantity is invalid", async () => {
      mockRequest.body = { product_id: 1, quantity: 0 };

      await cartController.addToCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Product ID and valid quantity are required"
      });
    });

    it("should return 404 when product not found", async () => {
      mockRequest.body = { product_id: 999, quantity: 2 };
      Product.findById.mockResolvedValue(null);

      await cartController.addToCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Product not found"
      });
    });

    it("should return 400 when insufficient stock", async () => {
      const mockProduct = {
        id: 1,
        name: "Apple",
        stock_quantity: 1,
        max_order_quantity: 5
      };

      mockRequest.body = { product_id: 1, quantity: 3 };
      Product.findById.mockResolvedValue(mockProduct);

      await cartController.addToCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Insufficient stock available"
      });
    });

    it("should return 400 when quantity exceeds max order quantity", async () => {
      const mockProduct = {
        id: 1,
        name: "Apple",
        stock_quantity: 10,
        max_order_quantity: 2
      };

      mockRequest.body = { product_id: 1, quantity: 5 };
      Product.findById.mockResolvedValue(mockProduct);

      await cartController.addToCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Maximum order quantity is 2"
      });
    });

    it("should handle server error", async () => {
      const error = new Error("Database error");
      mockRequest.body = { product_id: 1, quantity: 2 };
      Product.findById.mockRejectedValue(error);

      await cartController.addToCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("updateCartItem", () => {
    it("should update cart item successfully", async () => {
      const mockProduct = {
        id: 1,
        name: "Apple",
        stock_quantity: 10,
        max_order_quantity: 5
      };
      const mockCartItem = {
        id: 1,
        user_id: 1,
        product_id: 1,
        quantity: 3
      };

      mockRequest.params = { product_id: 1 };
      mockRequest.body = { quantity: 3 };
      Product.findById.mockResolvedValue(mockProduct);
      Cart.updateQuantity.mockResolvedValue(mockCartItem);

      await cartController.updateCartItem(mockRequest, mockResponse);

      expect(Product.findById).toHaveBeenCalledWith(1);
      expect(Cart.updateQuantity).toHaveBeenCalledWith(1, 1, 3);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: "Cart updated successfully",
        data: mockCartItem
      });
    });

    it("should return 400 when quantity is missing", async () => {
      mockRequest.params = { product_id: 1 };
      mockRequest.body = {};

      await cartController.updateCartItem(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Valid quantity is required"
      });
    });

    it("should return 400 when quantity is invalid", async () => {
      mockRequest.params = { product_id: 1 };
      mockRequest.body = { quantity: 0 };

      await cartController.updateCartItem(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Valid quantity is required"
      });
    });

    it("should return 404 when product not found", async () => {
      mockRequest.params = { product_id: 999 };
      mockRequest.body = { quantity: 2 };
      Product.findById.mockResolvedValue(null);

      await cartController.updateCartItem(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Product not found"
      });
    });

    it("should return 400 when insufficient stock", async () => {
      const mockProduct = {
        id: 1,
        name: "Apple",
        stock_quantity: 1,
        max_order_quantity: 5
      };

      mockRequest.params = { product_id: 1 };
      mockRequest.body = { quantity: 3 };
      Product.findById.mockResolvedValue(mockProduct);

      await cartController.updateCartItem(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Insufficient stock available"
      });
    });

    it("should return 400 when quantity exceeds max order quantity", async () => {
      const mockProduct = {
        id: 1,
        name: "Apple",
        stock_quantity: 10,
        max_order_quantity: 2
      };

      mockRequest.params = { product_id: 1 };
      mockRequest.body = { quantity: 5 };
      Product.findById.mockResolvedValue(mockProduct);

      await cartController.updateCartItem(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Maximum order quantity is 2"
      });
    });

    it("should return 404 when cart item not found", async () => {
      const mockProduct = {
        id: 1,
        name: "Apple",
        stock_quantity: 10,
        max_order_quantity: 5
      };

      mockRequest.params = { product_id: 1 };
      mockRequest.body = { quantity: 2 };
      Product.findById.mockResolvedValue(mockProduct);
      Cart.updateQuantity.mockResolvedValue(null);

      await cartController.updateCartItem(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Cart item not found"
      });
    });

    it("should handle server error", async () => {
      const error = new Error("Database error");
      mockRequest.params = { product_id: 1 };
      mockRequest.body = { quantity: 2 };
      Product.findById.mockRejectedValue(error);

      await cartController.updateCartItem(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("removeFromCart", () => {
    it("should remove cart item successfully", async () => {
      const mockCartItem = {
        id: 1,
        user_id: 1,
        product_id: 1,
        quantity: 2
      };

      mockRequest.params = { product_id: 1 };
      Cart.removeItem.mockResolvedValue(mockCartItem);

      await cartController.removeFromCart(mockRequest, mockResponse);

      expect(Cart.removeItem).toHaveBeenCalledWith(1, 1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: "Product removed from cart successfully"
      });
    });

    it("should return 404 when cart item not found", async () => {
      mockRequest.params = { product_id: 999 };
      Cart.removeItem.mockResolvedValue(null);

      await cartController.removeFromCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Cart item not found"
      });
    });

    it("should handle server error", async () => {
      const error = new Error("Database error");
      mockRequest.params = { product_id: 1 };
      Cart.removeItem.mockRejectedValue(error);

      await cartController.removeFromCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("clearCart", () => {
    it("should clear cart successfully", async () => {
      Cart.clearCart.mockResolvedValue(3); // 3 items removed

      await cartController.clearCart(mockRequest, mockResponse);

      expect(Cart.clearCart).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: "Cart cleared successfully"
      });
    });

    it("should handle server error", async () => {
      const error = new Error("Database error");
      Cart.clearCart.mockRejectedValue(error);

      await cartController.clearCart(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Server error"
      });
    });
  });
}); 