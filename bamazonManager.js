var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  selectOptions();
  //connection.end();
});

function selectOptions(){
	inquirer.prompt([
		{
			name: "choice",
			message: "Select an option",
			type: "list",
			choices: [
				"View Products For Sale",
				"View Low Inventory",
				"Add To Inventory",
				"Add New Product",
				"Exit"
			]
		}
	]).then(function(answers){
			var choice = answers.choice.split(' ').join('');
			var option = lower(choice);
			//console.log(option);
			switch (option){
				case "viewProductsForSale":
					viewProductsForSale();
					break;
				case "viewLowInventory":
					viewLowInventory();
					break;
				case "addToInventory":
					addToInventory();
					break;
				case "addNewProduct":
					addNewProduct();
					break;
				case "exit":
					console.log("Goodbye");
					connection.end();
					break;
			}
	});
}

function lower(choice){
	return choice.charAt(0).toLowerCase() + choice.slice(1);
}

function viewProductsForSale(){
	console.log("\nDisplaying All Products For Sale\n");
  connection.query("SELECT item_id, product_name, stock_quantity, price FROM products", function(err, res) {
   if (err) throw err;
   console.table(res);
    console.log("-----------------------------\n")
    selectOptions();
  });
}

function viewLowInventory(){
	console.log("\nDisplaying Low Inventory  Quantity < 5\n");
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    if (err) throw err;
    console.table(res);
    console.log("-----------------------------\n")
    selectOptions();
  });
}

function addToInventory(){
	console.log("\n----------------------------\n")
  inquirer.prompt([
	  {
	  	name: "item_id",
	  	message: "Enter the item_id for the product:"
	  },	  
	  {
	  	name: "stock_quantity",
	  	message: "Enter the stock_quantity to add:"
	  }
  ]).then(function(answers) {
	  console.log("\nUpdating quanity for item_id " + answers.item_id + "\n");
	  connection.query(
	  	"UPDATE products SET stock_quantity = (stock_quantity+?) WHERE item_id =?", [answers.stock_quantity,answers.item_id], function(err, res) {			
	    if (err) throw err;
	    // Log results of select statement
			console.log(res.affectedRows + " record(s) updated");
			selectOptions();
	  });
  });  
}

function addNewProduct(){
	console.log("\n----------------------------\n")
  inquirer.prompt([
	  {
	  	name: "product_name",
	  	message: "Enter a product name:"
	  },
	  {
	  	name: "department_id",
	  	message: "Enter the department_id:"
	  },
	  {
	  	name: "price",
	  	message: "Enter the price:"
	  },	  
	  {
	  	name: "stock_quantity",
	  	message: "Enter the stock_quantity:"
	  }
  ]).then(function(answers) {
	  console.log("Inserting new product\n");
	  var query = connection.query(
	    "INSERT INTO products SET ?",
	    {
	      product_name: answers.product_name,
	      department_id: answers.department_id,
	      price: answers.price,
	      stock_quantity: answers.stock_quantity
	    },
	    function(err, res) {
	      console.log(res.affectedRows + " product inserted!\n");
	      console.log(res.insertId);
	      // Call updateProduct AFTER the INSERT completes
	      selectOptions();
	    }
	  );
  });
}