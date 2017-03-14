var mysql      = require('mysql');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : 'agreement'
});

module.exports = db;
