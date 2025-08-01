const Cart = require("../models/Cart");
const pool = require("../config/db");

// Mock the database pool
jest.mock("../config/db", () => ({
  query: jest.fn(),
  connect: jest.fn()
}));

describe("Cart Model", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  describe("findByUser", () => {
    it("should return cart items for user successfully", async () => {
      const mockRows = [
        {
          id: 1,
          user_id: 1,
          product_id: 1,
          quantity: 2,
          name: "Apple",
          price: 1.99,
          discounted_price: 1.79,
          image_urls: ["apple.jpg"],
          stock_quantity: 10,
          unit: "kg",
          max_order_quantity: 5
        },
        {
          id: 2,
          user_id: 1,
          product_id: 2,
          quantity: 1,
          name: "Banana",
          price: 0.99,
          discounted_price: null,
          image_urls: ["banana.jpg"],
          stock_quantity: 20,
          unit: "dozen",
          max_order_quantity: 10
        }
      ];

      pool.query.mockResolvedValue({ rows: mockRows });

      const result = await Cart.findByUser(1);

      expect(pool.query).toHaveBeenCalledWith(expect.stringContaining(
        "SELECT c.*, p.name, p.price, p.discounted_price, p.image_urls, p.stock_quantity, p.unit, p.max_order_quantity"
      ), [1]);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        ...mockRows[0],
        id: mockRows[0].product_id // Ensure id field is the product ID for frontend compatibility
      });
    });

    it("should return empty array when user has no cart items", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await Cart.findByUser(1);

      expect(result).toEqual([]);
    });

    it("should handle database error", async () => {
      const error = new Error("Database connection failed");
      pool.query.mockRejectedValue(error);

      await expect(Cart.findByUser(1)).rejects.toThrow("Database connection failed");
    });
  });

  describe("addItem", () => {
    it("should add new item to cart successfully", async () => {
      const mockRow = {
        id: 1,
        user_id: 1,
        product_id: 1,
        quantity: 2,
        created_at: new Date(),
        updated_at: new Date()
      };

      pool.query.mockResolvedValue({ rows: [mockRow] });

      const result = await Cart.addItem(1, 1, 2);

      expect(pool.query).toHaveBeenCalledWith(expect.stringContaining(
        "INSERT INTO cart (user_id, product_id, quantity)"
      ), [1, 1, 2]);
      expect(result).toEqual(mockRow);
    });

    it("should update existing item quantity when item already exists", async () => {
      const mockRow = {
        id: 1,
        user_id: 1,
        product_id: 1,
        quantity: 5, // Updated quantity (2 + 3)
        created_at: new Date(),
        updated_at: new Date()
      };

      pool.query.mockResolvedValue({ rows: [mockRow] });

      const result = await Cart.addItem(1, 1, 3);

      expect(pool.query).toHaveBeenCalledWith(expect.stringContaining(
        "ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = cart.quantity + $3"
      ), [1, 1, 3]);
      expect(result).toEqual(mockRow);
    });

    it("should handle database error", async () => {
      const error = new Error("Database error");
      pool.query.mockRejectedValue(error);

      await expect(Cart.addItem(1, 1, 2)).rejects.toThrow("Database error");
    });
  });

  describe("updateQuantity", () => {
    it("should update item quantity successfully", async () => {
      const mockRow = {
        id: 1,
        user_id: 1,
        product_id: 1,
        quantity: 5,
        updated_at: new Date()
      };

      pool.query.mockResolvedValue({ rows: [mockRow] });

      const result = await Cart.updateQuantity(1, 1, 5);

      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE cart SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND product_id = $3 RETURNING *",
        [5, 1, 1]
      );
      expect(result).toEqual(mockRow);
    });

    it("should return null when item not found", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await Cart.updateQuantity(1, 999, 5);

      expect(result).toBeNull();
    });

    it("should handle database error", async () => {
      const error = new Error("Database error");
      pool.query.mockRejectedValue(error);

      await expect(Cart.updateQuantity(1, 1, 5)).rejects.toThrow("Database error");
    });
  });

  describe("removeItem", () => {
    it("should remove item from cart successfully", async () => {
      const mockRow = {
        id: 1,
        user_id: 1,
        product_id: 1,
        quantity: 2
      };

      pool.query.mockResolvedValue({ rows: [mockRow] });

      const result = await Cart.removeItem(1, 1);

      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM cart WHERE user_id = $1 AND product_id = $2 RETURNING *",
        [1, 1]
      );
      expect(result).toEqual(mockRow);
    });

    it("should return null when item not found", async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await Cart.removeItem(1, 999);

      expect(result).toBeNull();
    });

    it("should handle database error", async () => {
      const error = new Error("Database error");
      pool.query.mockRejectedValue(error);

      await expect(Cart.removeItem(1, 1)).rejects.toThrow("Database error");
    });
  });

  describe("clearCart", () => {
    it("should clear all items from user cart successfully", async () => {
      pool.query.mockResolvedValue({ rowCount: 3 });

      const result = await Cart.clearCart(1);

      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM cart WHERE user_id = $1",
        [1]
      );
      expect(result).toBe(3); // Number of items removed
    });

    it("should return 0 when cart is already empty", async () => {
      pool.query.mockResolvedValue({ rowCount: 0 });

      const result = await Cart.clearCart(1);

      expect(result).toBe(0);
    });

    it("should handle database error", async () => {
      const error = new Error("Database error");
      pool.query.mockRejectedValue(error);

      await expect(Cart.clearCart(1)).rejects.toThrow("Database error");
    });
  });

  describe("getCartTotal", () => {
    it("should return cart totals successfully", async () => {
      const mockRow = {
        total_amount: 15.97,
        item_count: 3,
        total_quantity: 5
      };

      pool.query.mockResolvedValue({ rows: [mockRow] });

      const result = await Cart.getCartTotal(1);

      expect(pool.query).toHaveBeenCalledWith(expect.stringContaining(
        "SUM(c.quantity * COALESCE(p.discounted_price, p.price)) as total_amount"
      ), [1]);
      expect(result).toEqual(mockRow);
    });

    it("should return zero totals when cart is empty", async () => {
      const mockRow = {
        total_amount: null,
        item_count: 0,
        total_quantity: 0
      };

      pool.query.mockResolvedValue({ rows: [mockRow] });

      const result = await Cart.getCartTotal(1);

      expect(result).toEqual(mockRow);
    });

    it("should handle database error", async () => {
      const error = new Error("Database error");
      pool.query.mockRejectedValue(error);

      await expect(Cart.getCartTotal(1)).rejects.toThrow("Database error");
    });
  });

  describe("Edge Cases", () => {
    it("should handle null values in cart items", async () => {
      const mockRows = [
        {
          id: 1,
          user_id: 1,
          product_id: 1,
          quantity: 2,
          name: "Apple",
          price: 1.99,
          discounted_price: null,
          image_urls: null,
          stock_quantity: 10,
          unit: "kg",
          max_order_quantity: 5
        }
      ];

      pool.query.mockResolvedValue({ rows: mockRows });

      const result = await Cart.findByUser(1);

      expect(result).toHaveLength(1);
      expect(result[0].discounted_price).toBeNull();
      expect(result[0].image_urls).toBeNull();
    });

    it("should handle zero quantity in updateQuantity", async () => {
      const mockRow = {
        id: 1,
        user_id: 1,
        product_id: 1,
        quantity: 0,
        updated_at: new Date()
      };

      pool.query.mockResolvedValue({ rows: [mockRow] });

      const result = await Cart.updateQuantity(1, 1, 0);

      expect(result).toEqual(mockRow);
    });

    it("should handle large quantities", async () => {
      const mockRow = {
        id: 1,
        user_id: 1,
        product_id: 1,
        quantity: 1000,
        updated_at: new Date()
      };

      pool.query.mockResolvedValue({ rows: [mockRow] });

      const result = await Cart.updateQuantity(1, 1, 1000);

      expect(result).toEqual(mockRow);
    });
  });
}); 