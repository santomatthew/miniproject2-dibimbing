var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "ecommerce"
  });

db.connect(function(err){
    if(err){
        throw err;
    }
    else{
        console.log("Db Connect");
    }
})

module.exports={
    db
}
