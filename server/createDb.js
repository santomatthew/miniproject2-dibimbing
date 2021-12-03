var mysql = require('mysql');

var testdb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678"
  });


testdb.connect(function(err){
    testdb.query(`CREATE DATABASE ecommerce`, function (err, result) {
      if (err) throw err;
      console.log(`Database ecommerce created`);
    });
  })