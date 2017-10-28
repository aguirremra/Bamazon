# Bramazon

* Description: Basic app demonstrating Node.js and MySQL. The app is an Amazon-like storefront that will will take in orders from customers and deplete stock from the store's inventory. It allows managers check inventory, add new stock, and add new products. Supervisors can track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

Live Demos:
Customer: https://github.com/aguirremra/Bamazon/blob/master/video%20demos/bamazonCustomer.mp4
Manager - https://github.com/aguirremra/Bamazon/blob/master/video%20demos/bamazonManager.mp4
Supervisor - https://github.com/aguirremra/Bamazon/blob/master/video%20demos/bamazonSupervisor.mp4

## Database Requirements
* Create a MySQL database called `bamazonDB`
* Create two tables, `products` and `departments`
* Populate the tables with mockdata
* Reference the schema and seeds files
	* https://github.com/aguirremra/Bamazon/blob/master/bamazonSchema.sql
	* https://github.com/aguirremra/Bamazon/blob/master/bamazonSeeds.sql

## To Install

* Git Clone the repository
* Navigate to the folder where the repository exists using Git Bash or Terminal
* Run the command `npm install` to download the required dependencies
* Run the command line for the views explained below

## Running the app views

Customer View
---------------------------------------------------------------------------
* Run the command `node bamazonCustomer.js`
* The application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
* The app should then prompt users with two messages:
	1) The ID of the product they would like to buy
	2) How many units of the product they would like to buy
* Once the customer has placed the order, the application should check if your store has enough of the product to meet the customer's request. If there is enough quantity, the order will be fulfilled, otherwise, a message will be displayed.
* After the order is fullfulled the customer prompted to order another product

Manager View
----------------------------------------------------------------------------
* Run the commmand `node bamazonManager`
* The application will provide a list of menu options

	View Products for Sale - lists every available item: item_id, product_name, price, quantity
	View Low Inventory - lists all items with an inventory count lower than five
	Add to Inventory - add more of any item currently in the store
	Add New Product - add a completely new product to the store
	Exit - quit the application

Supervisor View
---------------------------------------------------------------------------
* Run the command `node bamazonSupervisor`
* The application will provide a list of menu options
	View Product Sales by Department - display a summarized table in their terminal/bash window

	department_id	department_name		over_head_costs		product_sales	total_profit
	01				Electronics			10000				20000			10000
	02				Clothing			60000				100000			40000

	* Create New Department - add a completely new department
	* Exit - quit the application
