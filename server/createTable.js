var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "ecommerce"
});

db.connect(function(err) {

      // Create Table
    var sql = "CREATE TABLE merchant (id INT PRIMARY KEY,password VARCHAR (20),name VARCHAR(255), address VARCHAR(255),join_date DATETIME DEFAULT NOW(), phone_number INT(15) )";
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table merchant created");
    });

    var sql2 = "CREATE TABLE products (id INT PRIMARY KEY,name VARCHAR(255),quantity INT(100), price INT(15) )";
    db.query(sql2, function (err, result) {
      if (err) throw err;
      console.log("Table products created");
    });

  });