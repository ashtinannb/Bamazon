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

