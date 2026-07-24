// config/mysql.js
// ── MySQL connection pool (legacy / hybrid migration support) ──────────
'use strict';

const mysql = require('mysql2/promise');

let _pool = null;

function getPool() {
  if (!_pool) {
    _pool = mysql.createPool({
      host:               process.env.MYSQL_HOST     || 'localhost',
      port:     parseInt(process.env.MYSQL_PORT      || '3306', 10),
      user:               process.env.MYSQL_USER     || 'root',
      password:           process.env.MYSQL_PASSWORD || '',
      database:           process.env.MYSQL_DATABASE || 'kwcommon',
      waitForConnections: true,
      connectionLimit:    10,
      queueLimit:         0,
      decimalNumbers:     true,
    });
  }
  return _pool;
}

module.exports = { getPool };
