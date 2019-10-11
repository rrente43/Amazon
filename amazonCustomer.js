var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table3");

var connection =mysql.createConnection({
    host:"localhost",
    user:"127.0.0.1",
    password:"rubi123",
    database:"amazon_db",
    port:3306

})
connection.connect();

var display = function (){
    connection.query("SELECT * FROM products1",function(err,data){
        if(err) throw err;
        console.log("-----------------------")
        console.log("Welcome to Amazon")
        console.log("-----------------------")
        console.log("Find your Product Below-")
        console.log("-----------------------")
    });
    var table = new Table({
        head: ['Product Id', 'Product Description','Cost']
      , colWidths: [12, 50, 8],
      colAligns: ["Center","left","right"],
    });
}