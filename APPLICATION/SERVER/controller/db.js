const mysql = require("mysql2");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'telefoncu_stok',
  password: ''
});

// ... later
pool.query('select 1 + 1', (err, rows) => { /* */ });

module.exports = pool;