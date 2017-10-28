var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "Mras*9969",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId + "\n");
  readAllProducts();
});

function readAllProducts() {
  console.log("\nDisplaying all Bamazon products...\n");
  connection.query("SELECT item_id, product_name, price FROM products ORDER BY department_id, product_name", function(err, res) {
    if (err) throw err;
    console.table(res);
    // Log results of select statement
    //console.log(JSON.stringify(res));
    //connection.end();
    processOrder();
  });
}

function checkQuantity(id, quantity) {
  //console.log("\nChecking quantity for item_id " + id + "\n");
  connection.query("SELECT stock_quantity FROM products WHERE item_id =?", [id], function(err, res) {
    if (err) throw err;
    // Log results of select statement
    if(res[0].stock_quantity > quantity){    	
    	//console.log("There is enough quantity")
    	fillOrder(id, quantity);
    }else{
    	console.log("There's not enough product to fulfill that order");
    	processOrder();
    }
    //connection.end();
  });
}

function fillOrder(id, quantity) {
  //console.log("\nUpdating quanity for item_id " + id + "\n");
  connection.query(
  	"UPDATE products SET stock_quantity = (stock_quantity-?), product_sales = (price*?) WHERE item_id =?", [quantity,quantity,id], function(err, res) {
		//"UPDATE products SET stock_quantity = 30 WHERE item_id =?", [id], function(err, res) {  		
    if (err) throw err;
    // Log results of select statement
		//console.log(res.affectedRows + " record(s) updated");
		confirmOrder(id, quantity);
    //connection.end();
  });
}

function confirmOrder(id, quantity) {
  //console.log("\nGetting products for item_id " + id + "\n");
  connection.query("SELECT item_id, product_name, (price *?) AS total FROM products WHERE item_id =?", [quantity, id], function(err, res) {
    if (err) throw err;
    // Log results of select statement
    console.log("Your order has been confirmed. You ordered\n");
    console.table(res);
    checkExit();
  });
}

function processOrder() {
  console.log("\n----------------------------\n")
  inquirer.prompt([
	  {
	  	name: "id",
	  	message: "What product ID would you like to buy?",
      validate: function(string) {        
        if (string) {
          return true;
        } else {
          return false;
          console.log("Please enter numbers only");
        }
      }
	  },
	  {
	  	name: "quantity",
	  	message: "How many units would you like to buy?",
      validate: function(string) {        
        if (string) {
          return true;
        } else {
          return false;
          console.log("Please enter numbers only");
        }
      }
	  }
  ]).then(function(answers) {
  	var item_id = answers.id;  	
  	var quantity = answers.quantity;
  	console.log("\nYou requested ID: " + item_id +  " |  Quantity: " + quantity);
  	checkQuantity(item_id, quantity);
  });
}

function checkExit() {
  console.log("\n----------------------------\n")
  inquirer.prompt([
	  {
	  	name: "info",
	  	message: "Do you want to order another product?",
	  	type: "list",
	  	choices: [
				"yes",
				"no"
			]
	  }
  ]).then(function(answers) {
  	var response = answers.info;
  	if(response == "yes"){
  		processOrder();
  	}else{
  		console.log("Ok, thank you, Goodbye!");
  		connection.end();
  	}
  });
}