// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  // host: '127.0.0.1',
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'miniproject01',
  dateStrings: true // Wed Dec 04 2024 18:19:44 GMT+0900 (대한민국 표준시) > 2024-12-04 18:19:44
});

module.exports = connection