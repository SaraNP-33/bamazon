//connect dependicies in package JSON to the file via require
var mysql= require("mysql");

var inquirer= require("inquirer");

var Table = require("cli-table3");
var colors =require("colors");

// establish mysql connection to bamazon database

var connection= mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"Zolula30%",
    database:"bamazon_db"
});
// connecting to mySQL
connection.connect(function(err){
    if(err) throw err;
    //console.log("Connected as id", connection.threadId);
   options();
});

// function that brings up the options menu

function options(){
    //give the options to the user
    inquirer
    .prompt([{
        type:"list",
        name:"option",
        message:"What would you like to do?",
        choices:["View Products", "Buy a Product", "Exit"]
    }
    

])
    .then(function(answer){

   //depending on what the user choses the switch case will deploy the right action
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
    //CLI-table3 language to create a custom table
    var table = new Table({
        head:[colors.green("ID"), colors.brightBlue("Product"),colors.magenta("Price"), colors.cyan("Department"),colors.yellow("Stock Quantity")],
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
    // ask SQL to send the info from the table    
 connection.query("SELECT * FROM bamazon_db.products", function(err,res){
    if(err) throw(err)
    // console.log(res);
    //create a loop to eiterate through the result from the query
   for(var i=0; i<res.length;i++){
//       //assign a variable to hold the result from the query 
    var items= res[i];
    //transform the object sent from mySQL table into an array
     items=Object.values(items)
    //turn that array into a table that can be displayed in the terminal
    table.push(items);
    
  }
  console.log(table.toString());
    //give the user the options to do othr things. 
    leave();
})
};

//function that allows user to buy a product
function buyProd(){
    inquirer
    .prompt([{
        type:"input",
        name:"product",
        message:"What's the ID of the product you want to purchase?"
    },
    {
        type:"input",
        name:"quantity",
        message:"How many items would you like to purchase?"
    },
    {
        type:"confirm",
        name:"complete",
        message:"Complete Purchase?",
        default:true
    }
  
])
  .then(function(ans){

    var prod=ans.product;
    var qty=ans.quantity;

    connection.query("SELECT * FROM products WHERE id= "+ prod, function(err,res){
        if(err) throw(err)
        //console.log(res);

        if(qty<=res[0].stock_quantity){
            var updateQuery= "UPDATE products SET stock_quantity= stock_quantity -" + qty + " WHERE id=" + prod
            //console.log(updateQuery)

            connection.query(updateQuery, function(err,result){
                if(err)throw(err)
                console.log("Thank you for your purchase. Your total price is:", (res[0].price * qty).toFixed(2));  
                leave();
            })
            
        }else{
            console.log("Sorry, insufficient quantity");
            leave();
        }
        
    })
  })
    };

function leave(){
    inquirer
    .prompt({
    type:"list",
    name:"leave",
    message:"Are you done?",
    choices:["Back to main menu", "Exit"]
})

.then(function(choice){
    switch(choice.leave){
        case "Back to main menu":
            options();
            break;
        case "Exit":
            exit();
          break;  
    }
})
}; 

//function that ends the connection
function exit(){
    connection.end();
    console.log("Thank you for your visit!")
};