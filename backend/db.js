const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3307, 
  user: 'root',
  password: 'Arshlankhan@786',
  database: 'auth_demo'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

module.exports = db;
