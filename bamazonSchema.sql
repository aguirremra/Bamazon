DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50),
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(50),
  over_head_costs INT NULL,  
  PRIMARY KEY (department_id)
);

ALTER TABLE products ADD COLUMN product_sales DECIMAL(10,2) NULL;

/*due to requirement in Challenge #3: Supervisor View (Final Level)
to join tables based on department, I changed the department_name to 
department_id in the products table*/
ALTER TABLE products CHANGE department_name department_id INT;