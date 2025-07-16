const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

console.log('🔍 Loading admin routes...');
const adminRoutes = require('./routes/adminRoutes');
console.log('✅ Admin routes loaded:', typeof adminRoutes);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS and JSON middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static files middleware for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

console.log('🔍 Registering admin routes...');
app.use('/api/admin', adminRoutes);
console.log('✅ Admin routes registered at /api/admin');

console.log('✅ All routes registered successfully');

app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to DailyGrocer API!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories',
      cart: '/api/cart',
      orders: '/api/orders',
      admin: '/api/admin'
    }
  });
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

pool.connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL DB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
  });