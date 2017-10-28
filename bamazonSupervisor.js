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
				"View Product Sales By Department",
				"Create New Department",
				"Exit"
			]
		}
	]).then(function(answers){
			var choice = answers.choice.split(' ').join('');
			var option = lower(choice);
			//console.log(option);
			switch (option){
				case "viewProductSalesByDepartment":
					viewProductSalesByDepartment();
					break;
				case "createNewDepartment":
					createNewDepartment();
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

function viewProductSalesByDepartment(){
	console.log("\nDisplaying All Products For Sale\n");
  connection.query("SELECT d.department_id, d.department_name, d.over_head_costs," + 
  								 "sum(p.product_sales) AS total_sales, sum(p.product_sales)-d.over_head_costs AS total_profit FROM departments d " +
  								 "LEFT JOIN products p ON d.department_id = p.department_id " + 
  								 "GROUP BY d.department_id, d.department_name" , function(err, res) {
    if (err) throw err;
    console.table(res);
    console.log("-----------------------------\n")
    selectOptions();
  });
}

function createNewDepartment(){
	console.log("\n----------------------------\n")
  inquirer.prompt([
	  {
	  	name: "department_name",
	  	message: "Enter the department name:"
	  },
	  {
	  	name: "over_head_costs",
	  	message: "Enter the over head costs:"
	  }
  ]).then(function(answers) {
	  console.log("Inserting new department\n");
	  var query = connection.query(
	    "INSERT INTO departments SET ?",
	    {
	      department_name: answers.department_name,
	      over_head_costs: answers.over_head_costs
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