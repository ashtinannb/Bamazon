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


////// all my functions 

/// function for loading products 
function loadProducts() {
  // grabs data from my database
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // creates table in terminal, so freaking cool 
    console.table(res);
    // asking customer what they would like
    promptCustomer(res);
  });
}


/// function for asking customer 
function promptCustomer(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Hello! What would you like to purchase today? [Quit with Q]",
        validate: function (val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function (val) {
      Exit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      if (product) {
        promptQuantity(product);
      }
      else {
        console.log("\nI'm sorry, we are out of that item.");
        // re-run load products 
        loadProducts();
      }
    });
}


// function for product quantity 
function promptQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Quit with Q]",
        validate: function (val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function (val) {
      Exit(val.quantity);
      var quantity = parseInt(val.quantity);

      // not enough product??
      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        loadProducts();
      }
      else {
        //run buy, give it the product info and quantity 
        buy(product, quantity);
      }
    });
}


// function for buying 
function buy(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function (err, res) {
      // success is sweet
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      loadProducts();
    }
  );
}


// function for checking inventory
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // or return null
  return null;
}


// function for exit
function Exit(choice) {
  if (choice.toLowerCase() === "q") {
    // Log a message and exit the current node process
    console.log("Have a nice day!");
    process.exit(0);
  }
}



