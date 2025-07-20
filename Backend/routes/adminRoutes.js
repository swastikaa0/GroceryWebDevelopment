const express = require('express');
const pool = require('../config/db');
const { auth: authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Test route to verify admin routes are working
router.get('/test', (req, res) => {
  res.json({ message: 'Admin routes are working!', timestamp: new Date().toISOString() });
});

// Middleware to check if user is admin
const adminMiddleware = async (req, res, next) => {
  try {
    console.log('Admin middleware - user:', req.user);
    if (!req.user) {
      return res.status(401).json({ message: 'No user found in request' });
    }
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get dashboard statistics
router.get('/dashboard/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('Fetching dashboard stats...');
    
    // Get total users count
    const usersResult = await pool.query('SELECT COUNT(*) as count FROM users WHERE role = $1', ['customer']);
    const totalUsers = parseInt(usersResult.rows[0].count);

    // Get total products count - handle if table doesn't exist
    let totalProducts = 0;
    try {
      const productsResult = await pool.query('SELECT COUNT(*) as count FROM products');
      totalProducts = parseInt(productsResult.rows[0].count);
    } catch (error) {
      console.log('Products table might not exist, using default value');
    }

    // Get pending orders count - handle if table doesn't exist
    let pendingOrders = 0;
    try {
      const pendingOrdersResult = await pool.query('SELECT COUNT(*) as count FROM orders WHERE status = $1', ['pending']);
      pendingOrders = parseInt(pendingOrdersResult.rows[0].count);
    } catch (error) {
      console.log('Orders table might not exist, using default value');
    }

    // Get today's revenue
    let todayRevenue = 0;
    try {
      const todayRevenueResult = await pool.query(`
        SELECT COALESCE(SUM(total_amount), 0) as revenue 
        FROM orders 
        WHERE DATE(created_at) = CURRENT_DATE AND status = 'completed'
      `);
      todayRevenue = parseFloat(todayRevenueResult.rows[0].revenue);
    } catch (error) {
      console.log('Revenue calculation failed, using default value');
    }

    // Get monthly revenue
    let monthlyRevenue = 0;
    try {
      const monthlyRevenueResult = await pool.query(`
        SELECT COALESCE(SUM(total_amount), 0) as revenue 
        FROM orders 
        WHERE EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
        AND status = 'completed'
      `);
      monthlyRevenue = parseFloat(monthlyRevenueResult.rows[0].revenue);
    } catch (error) {
      console.log('Monthly revenue calculation failed, using default value');
    }

    // Get low stock items count
    let lowStockItems = 0;
    try {
      const lowStockResult = await pool.query('SELECT COUNT(*) as count FROM products WHERE quantity < $1', [10]);
      lowStockItems = parseInt(lowStockResult.rows[0].count);
    } catch (error) {
      console.log('Low stock calculation failed, using default value');
    }

    const stats = {
      totalUsers,
      totalProducts,
      pendingOrders,
      todayRevenue,
      monthlyRevenue,
      lowStockItems
    };

    console.log('Dashboard stats:', stats);
    res.json(stats);

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get recent activity
router.get('/dashboard/activity', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('Fetching dashboard activity...');
    
    let allActivities = [];

    // Get recent user registrations - with error handling
    try {
      const recentUsers = await pool.query(`
        SELECT 'user' as type, 
               CONCAT('New user ', name, ' registered') as message,
               created_at as time
        FROM users 
        WHERE role = 'customer'
        ORDER BY created_at DESC 
        LIMIT 3
      `);
      allActivities.push(...recentUsers.rows);
    } catch (error) {
      console.log('Could not fetch recent users');
    }

    // Get recent orders - with error handling
    try {
      const recentOrders = await pool.query(`
        SELECT 'order' as type,
               CONCAT('Order #', id, ' ', status) as message,
               created_at as time
        FROM orders 
        ORDER BY created_at DESC 
        LIMIT 3
      `);
      allActivities.push(...recentOrders.rows);
    } catch (error) {
      console.log('Could not fetch recent orders');
    }

    // Get recent products - with error handling
    try {
      const recentProducts = await pool.query(`
        SELECT 'product' as type,
               CONCAT('Product "', name, '" added') as message,
               created_at as time
        FROM products 
        ORDER BY created_at DESC 
        LIMIT 2
      `);
      allActivities.push(...recentProducts.rows);
    } catch (error) {
      console.log('Could not fetch recent products');
    }

    // If no activities found, provide default activity
    if (allActivities.length === 0) {
      allActivities = [{
        type: 'system',
        message: 'Admin dashboard initialized',
        time: new Date()
      }];
    }

    // Sort by time and add relative time formatting
    const sortedActivities = allActivities
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 5)
      .map((activity, index) => ({
        id: index + 1,
        type: activity.type,
        message: activity.message,
        time: formatRelativeTime(activity.time)
      }));

    res.json(sortedActivities);

  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all users (admin management) - Focus on buyers/customers
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('Fetching users for admin dashboard...');
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Fetch only customers/buyers (not admins)
    const result = await pool.query(`
      SELECT id, name, email, role, created_at, 
             CASE WHEN created_at > NOW() - INTERVAL '30 days' THEN true ELSE false END as is_recent
      FROM users 
      WHERE role = 'customer'
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    // Count total customers
    const countResult = await pool.query('SELECT COUNT(*) as total FROM users WHERE role = $1', ['customer']);
    const total = parseInt(countResult.rows[0].total);

    console.log(`Found ${result.rows.length} users out of ${total} total customers`);

    res.json({
      users: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user name (admin can edit customer names)
router.put('/users/:id/name', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: 'Name is required and cannot be empty.' });
    }

    // Only allow updating customer names, not admin names
    const result = await pool.query(
      'UPDATE users SET name = $1 WHERE id = $2 AND role = $3 RETURNING id, name, email, role',
      [name.trim(), id, 'customer']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found or cannot be updated' });
    }

    console.log(`Admin updated customer name: ${result.rows[0].name}`);

    res.json({
      message: 'Customer name updated successfully',
      user: result.rows[0]
    });

  } catch (error) {
    console.error('Error updating user name:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user
router.delete('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Don't allow deleting the current admin user
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING name', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: `User ${result.rows[0].name} deleted successfully` });

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ===== PRODUCT MANAGEMENT ROUTES =====

// Get all products for admin (including inactive ones)
router.get('/products', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('Fetching products for admin...');
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    let query = `
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
    `;
    
    let params = [];
    let paramIndex = 1;

    if (search) {
      query += ` WHERE p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex}`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ` ORDER BY p.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM products p';
    let countParams = [];
    
    if (search) {
      countQuery += ' WHERE p.name ILIKE $1 OR p.description ILIKE $1';
      countParams.push(`%${search}%`);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total);

    console.log(`Found ${result.rows.length} products out of ${total} total`);

    res.json({
      products: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new product
router.post('/products', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discounted_price,
      sku,
      category_id,
      brand,
      unit,
      stock_quantity,
      min_stock_level,
      max_order_quantity,
      image_urls,
      is_featured,
      weight,
      tags
    } = req.body;

    // Validate required fields
    if (!name || !price || !unit || stock_quantity === undefined || !category_id) {
      return res.status(400).json({ 
        message: 'Required fields: name, price, unit, stock_quantity, category_id' 
      });
    }

    const query = `
      INSERT INTO products (
        name, description, price, discounted_price, sku, category_id,
        brand, unit, stock_quantity, min_stock_level, max_order_quantity,
        image_urls, is_featured, weight, tags, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW(), NOW())
      RETURNING *
    `;

    const result = await pool.query(query, [
      name,
      description || null,
      price,
      discounted_price || null,
      sku || null,
      category_id,
      brand || null,
      unit,
      stock_quantity,
      min_stock_level || 5,
      max_order_quantity || 10,
      image_urls || [],
      is_featured || false,
      weight || null,
      tags || []
    ]);

    console.log(`Product created: ${result.rows[0].name}`);

    res.status(201).json({
      message: 'Product created successfully',
      product: result.rows[0]
    });

  } catch (error) {
    console.error('Error creating product:', error);
    if (error.code === '23505') { // Unique constraint violation
      res.status(400).json({ message: 'SKU already exists' });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
});

// Update product
router.put('/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      discounted_price,
      sku,
      category_id,
      brand,
      unit,
      stock_quantity,
      min_stock_level,
      max_order_quantity,
      image_urls,
      is_featured,
      is_active,
      weight,
      tags
    } = req.body;

    // Check if product exists
    const existingProduct = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (existingProduct.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const query = `
      UPDATE products SET
        name = $1,
        description = $2,
        price = $3,
        discounted_price = $4,
        sku = $5,
        category_id = $6,
        brand = $7,
        unit = $8,
        stock_quantity = $9,
        min_stock_level = $10,
        max_order_quantity = $11,
        image_urls = $12,
        is_featured = $13,
        is_active = $14,
        weight = $15,
        tags = $16,
        updated_at = NOW()
      WHERE id = $17
      RETURNING *
    `;

    const result = await pool.query(query, [
      name,
      description,
      price,
      discounted_price,
      sku,
      category_id,
      brand,
      unit,
      stock_quantity,
      min_stock_level,
      max_order_quantity,
      image_urls,
      is_featured,
      is_active,
      weight,
      tags,
      id
    ]);

    console.log(`Product updated: ${result.rows[0].name}`);

    res.json({
      message: 'Product updated successfully',
      product: result.rows[0]
    });

  } catch (error) {
    console.error('Error updating product:', error);
    if (error.code === '23505') {
      res.status(400).json({ message: 'SKU already exists' });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
});

// Delete product
router.delete('/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const existingProduct = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (existingProduct.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Soft delete by setting is_active = false
    const result = await pool.query(
      'UPDATE products SET is_active = false, updated_at = NOW() WHERE id = $1 RETURNING name',
      [id]
    );

    console.log(`Product soft deleted: ${result.rows[0].name}`);

    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get categories for product creation
router.get('/categories', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, description FROM categories WHERE is_active = true ORDER BY name'
    );

    res.json({ categories: result.rows });

  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Helper function to format relative time
function formatRelativeTime(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} mins ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 7) return `${days} days ago`;
  return new Date(date).toLocaleDateString();
}

module.exports = router;
