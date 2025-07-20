const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dailygrocer',
  password: 'swastika',
  port: 5432,
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL DB'))
  .catch((err) => console.error('❌ DB connection error:', err));

module.exports = pool;