//connect dependicies in package JSON to the file via require
var mysql= require("mysql");

var inquirer= require("inquirer");

// establish mysql connection to bamazon database

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
   options();
});

// function that brings up the options menu

function options(){
    inquirer
    .prompt({
        type:"list",
        name:"option",
        message:"What would you like to do?",
        choices:["View Products", "Buy a Product", "Exit"]
    })
    .then(function(answer){

   
    switch(answer.option){
        case "View Products": 
        displayTable();
        break;
        case "Buy a Product": 
        buyProd();
        break;
        case "Exit":
            exit();
        break;
    }
})
 
};

function displayTable(){
    
connection.query("SELECT * FROM products", function(err,res){
    if(err) throw(err)
   console.log(res);
    
    options();
})
}




//function that ends the connection
function exit(){
    connection.end();
    console.log("Thank you for your visit!")
}