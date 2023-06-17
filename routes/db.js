var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database : 'mydb'
});
module.exports = connection;
