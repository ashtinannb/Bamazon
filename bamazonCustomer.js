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


// connect to mysql 
connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    // creates table in terminal, so freaking cool 
    console.table(res);

    // asking customer what they would like 
    promptCustomer(res);
});

