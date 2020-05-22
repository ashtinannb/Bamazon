// initialize npms
var mysql = require("mysql");
var inquirer = require("inquirer");







// initialize connection variable
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "1755",
  database: "bamazon"
});




// variable connects with the server, and then in turn loads the products 
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});





// load products function
function loadProducts() {
  // Selects all of the data from the MySQL products table
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // creates table in terminal, so freaking cool 
    console.table(res);
    // asking customer what they would like
    promptCustomer(res);
  });
}







