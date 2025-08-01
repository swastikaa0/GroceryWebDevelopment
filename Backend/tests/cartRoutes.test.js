const request = require('supertest');
const express = require('express');
const cartRoutes = require('../routes/cartRoutes');
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// Mock the middleware and controller
jest.mock('../middleware/authMiddleware');
jest.mock('../controllers/cartController');

const app = express();
app.use(express.json());
app.use('/api/cart', cartRoutes);

describe("Cart Routes", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock authentication middleware to pass through
    authMiddleware.auth.mockImplementation((req, res, next) => {
      req.user = { userId: 1, role: 'user' };
      next();
    });
  });

  describe("GET /api/cart", () => {
    it("should return cart items successfully", async () => {
      const mockCartItems = [
        { id: 1, product_id: 1, quantity: 2, name: "Apple", price: 1.99 },
        { id: 2, product_id: 2, quantity: 1, name: "Banana", price: 0.99 }
      ];
      const mockCartTotal = { total_amount: 4.97, item_count: 2, total_quantity: 3 };

      cartController.getCart.mockImplementation((req, res) => {
        res.json({
          success: true,
          data: {
            items: mockCartItems,
            total: mockCartTotal
          }
        });
      });

      const response = await request(app)
        .get('/api/cart')
        .set('Authorization', 'Bearer test-token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: {
          items: mockCartItems,
          total: mockCartTotal
        }
      });
      expect(cartController.getCart).toHaveBeenCalled();
    });

    it("should handle authentication failure", async () => {
      // Mock authentication to fail
      authMiddleware.auth.mockImplementation((req, res, next) => {
        res.status(401).json({ success: false, message: "Unauthorized" });
      });

      const response = await request(app)
        .get('/api/cart')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        success: false,
        message: "Unauthorized"
      });
    });

    it("should handle server error", async () => {
      cartController.getCart.mockImplementation((req, res) => {
        res.status(500).json({
          success: false,
          message: "Server error"
        });
      });

      const response = await request(app)
        .get('/api/cart')
        .set('Authorization', 'Bearer test-token');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("POST /api/cart/add", () => {
    it("should add item to cart successfully", async () => {
      const mockCartItem = {
        id: 1,
        user_id: 1,
        product_id: 1,
        quantity: 2
      };

      cartController.addToCart.mockImplementation((req, res) => {
        res.json({
          success: true,
          message: "Product added to cart successfully",
          data: mockCartItem
        });
      });

      const response = await request(app)
        .post('/api/cart/add')
        .set('Authorization', 'Bearer test-token')
        .send({
          product_id: 1,
          quantity: 2
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: "Product added to cart successfully",
        data: mockCartItem
      });
      expect(cartController.addToCart).toHaveBeenCalled();
    });

    it("should return 400 when product_id is missing", async () => {
      cartController.addToCart.mockImplementation((req, res) => {
        res.status(400).json({
          success: false,
          message: "Product ID and valid quantity are required"
        });
      });

      const response = await request(app)
        .post('/api/cart/add')
        .set('Authorization', 'Bearer test-token')
        .send({
          quantity: 2
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: "Product ID and valid quantity are required"
      });
    });

    it("should return 400 when quantity is missing", async () => {
      cartController.addToCart.mockImplementation((req, res) => {
        res.status(400).json({
          success: false,
          message: "Product ID and valid quantity are required"
        });
      });

      const response = await request(app)
        .post('/api/cart/add')
        .set('Authorization', 'Bearer test-token')
        .send({
          product_id: 1
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: "Product ID and valid quantity are required"
      });
    });

    it("should return 404 when product not found", async () => {
      cartController.addToCart.mockImplementation((req, res) => {
        res.status(404).json({
          success: false,
          message: "Product not found"
        });
      });

      const response = await request(app)
        .post('/api/cart/add')
        .set('Authorization', 'Bearer test-token')
        .send({
          product_id: 999,
          quantity: 2
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        success: false,
        message: "Product not found"
      });
    });

    it("should return 400 when insufficient stock", async () => {
      cartController.addToCart.mockImplementation((req, res) => {
        res.status(400).json({
          success: false,
          message: "Insufficient stock available"
        });
      });

      const response = await request(app)
        .post('/api/cart/add')
        .set('Authorization', 'Bearer test-token')
        .send({
          product_id: 1,
          quantity: 100
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: "Insufficient stock available"
      });
    });
  });

  describe("PUT /api/cart/update/:product_id", () => {
    it("should update cart item successfully", async () => {
      const mockCartItem = {
        id: 1,
        user_id: 1,
        product_id: 1,
        quantity: 5
      };

      cartController.updateCartItem.mockImplementation((req, res) => {
        res.json({
          success: true,
          message: "Cart updated successfully",
          data: mockCartItem
        });
      });

      const response = await request(app)
        .put('/api/cart/update/1')
        .set('Authorization', 'Bearer test-token')
        .send({
          quantity: 5
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: "Cart updated successfully",
        data: mockCartItem
      });
      expect(cartController.updateCartItem).toHaveBeenCalled();
    });

    it("should return 400 when quantity is missing", async () => {
      cartController.updateCartItem.mockImplementation((req, res) => {
        res.status(400).json({
          success: false,
          message: "Valid quantity is required"
        });
      });

      const response = await request(app)
        .put('/api/cart/update/1')
        .set('Authorization', 'Bearer test-token')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: "Valid quantity is required"
      });
    });

    it("should return 400 when quantity is invalid", async () => {
      cartController.updateCartItem.mockImplementation((req, res) => {
        res.status(400).json({
          success: false,
          message: "Valid quantity is required"
        });
      });

      const response = await request(app)
        .put('/api/cart/update/1')
        .set('Authorization', 'Bearer test-token')
        .send({
          quantity: 0
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: "Valid quantity is required"
      });
    });

    it("should return 404 when cart item not found", async () => {
      cartController.updateCartItem.mockImplementation((req, res) => {
        res.status(404).json({
          success: false,
          message: "Cart item not found"
        });
      });

      const response = await request(app)
        .put('/api/cart/update/999')
        .set('Authorization', 'Bearer test-token')
        .send({
          quantity: 5
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        success: false,
        message: "Cart item not found"
      });
    });

    it("should return 400 when insufficient stock", async () => {
      cartController.updateCartItem.mockImplementation((req, res) => {
        res.status(400).json({
          success: false,
          message: "Insufficient stock available"
        });
      });

      const response = await request(app)
        .put('/api/cart/update/1')
        .set('Authorization', 'Bearer test-token')
        .send({
          quantity: 100
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: "Insufficient stock available"
      });
    });
  });

  describe("DELETE /api/cart/remove/:product_id", () => {
    it("should remove cart item successfully", async () => {
      cartController.removeFromCart.mockImplementation((req, res) => {
        res.json({
          success: true,
          message: "Product removed from cart successfully"
        });
      });

      const response = await request(app)
        .delete('/api/cart/remove/1')
        .set('Authorization', 'Bearer test-token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: "Product removed from cart successfully"
      });
      expect(cartController.removeFromCart).toHaveBeenCalled();
    });

    it("should return 404 when cart item not found", async () => {
      cartController.removeFromCart.mockImplementation((req, res) => {
        res.status(404).json({
          success: false,
          message: "Cart item not found"
        });
      });

      const response = await request(app)
        .delete('/api/cart/remove/999')
        .set('Authorization', 'Bearer test-token');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        success: false,
        message: "Cart item not found"
      });
    });

    it("should handle server error", async () => {
      cartController.removeFromCart.mockImplementation((req, res) => {
        res.status(500).json({
          success: false,
          message: "Server error"
        });
      });

      const response = await request(app)
        .delete('/api/cart/remove/1')
        .set('Authorization', 'Bearer test-token');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("DELETE /api/cart/clear", () => {
    it("should clear cart successfully", async () => {
      cartController.clearCart.mockImplementation((req, res) => {
        res.json({
          success: true,
          message: "Cart cleared successfully"
        });
      });

      const response = await request(app)
        .delete('/api/cart/clear')
        .set('Authorization', 'Bearer test-token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: "Cart cleared successfully"
      });
      expect(cartController.clearCart).toHaveBeenCalled();
    });

    it("should handle server error", async () => {
      cartController.clearCart.mockImplementation((req, res) => {
        res.status(500).json({
          success: false,
          message: "Server error"
        });
      });

      const response = await request(app)
        .delete('/api/cart/clear')
        .set('Authorization', 'Bearer test-token');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        success: false,
        message: "Server error"
      });
    });
  });

  describe("Route Protection", () => {
    it("should require authentication for all cart routes", async () => {
      // Mock authentication to fail
      authMiddleware.auth.mockImplementation((req, res, next) => {
        res.status(401).json({ success: false, message: "Unauthorized" });
      });

      const routes = [
        { method: 'get', path: '/api/cart' },
        { method: 'post', path: '/api/cart/add' },
        { method: 'put', path: '/api/cart/update/1' },
        { method: 'delete', path: '/api/cart/remove/1' },
        { method: 'delete', path: '/api/cart/clear' }
      ];

      for (const route of routes) {
        const response = await request(app)
          [route.method](route.path)
          .set('Authorization', 'Bearer invalid-token');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
          success: false,
          message: "Unauthorized"
        });
      }
    });
  });

  describe("Request Validation", () => {
    it("should handle malformed JSON in request body", async () => {
      const response = await request(app)
        .post('/api/cart/add')
        .set('Authorization', 'Bearer test-token')
        .set('Content-Type', 'application/json')
        .send('{"invalid": json}');

      expect(response.status).toBe(400);
    });

    it("should handle missing Content-Type header", async () => {
      const response = await request(app)
        .post('/api/cart/add')
        .set('Authorization', 'Bearer test-token')
        .send({ product_id: 1, quantity: 2 });

      // Should still work as Express can parse JSON without explicit Content-Type
      expect(response.status).not.toBe(400);
    });

    it("should handle large request bodies", async () => {
      const largeBody = {
        product_id: 1,
        quantity: 2,
        notes: "a".repeat(10000) // Very large notes field
      };

      cartController.addToCart.mockImplementation((req, res) => {
        res.json({ success: true, message: "Success" });
      });

      const response = await request(app)
        .post('/api/cart/add')
        .set('Authorization', 'Bearer test-token')
        .send(largeBody);

      expect(response.status).toBe(200);
    });
  });

  describe("Edge Cases", () => {
    it("should handle very large product IDs", async () => {
      cartController.getProductById.mockImplementation((req, res) => {
        res.json({ success: true, data: { id: 999999999 } });
      });

      const response = await request(app)
        .put('/api/cart/update/999999999')
        .set('Authorization', 'Bearer test-token')
        .send({ quantity: 1 });

      expect(response.status).toBe(200);
    });

    it("should handle very large quantities", async () => {
      cartController.addToCart.mockImplementation((req, res) => {
        res.json({ success: true, message: "Success" });
      });

      const response = await request(app)
        .post('/api/cart/add')
        .set('Authorization', 'Bearer test-token')
        .send({
          product_id: 1,
          quantity: 999999
        });

      expect(response.status).toBe(200);
    });

    it("should handle special characters in request body", async () => {
      cartController.addToCart.mockImplementation((req, res) => {
        res.json({ success: true, message: "Success" });
      });

      const response = await request(app)
        .post('/api/cart/add')
        .set('Authorization', 'Bearer test-token')
        .send({
          product_id: 1,
          quantity: 2,
          notes: "Special chars: !@#$%^&*()_+-=[]{}|;':\",./<>?"
        });

      expect(response.status).toBe(200);
    });
  });
}); 