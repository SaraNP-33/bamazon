var mysql= require("mysql");

var inquirer= require("inquirer");

var connection= mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"Zolula30%",
    database:"bamazon_db"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected as id", connection.threadId);
    connection.end();
});