var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table3");

var connection =mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"rubi123",
    database:"amazon_db",
    port:3306

})
connection.connect();

var display = function (){
    connection.query("SELECT * FROM products1",function(err, data){
        if(err) throw err;
        console.log("-----------------------");
        console.log("Welcome to Amazon");
        console.log("-----------------------");
        console.log("Find your Product Below-");
        console.log("-----------------------");
    
    var table = new Table({
        head: ['Product Id', 'Product Description','Cost'],
        colWidths: [12, 50, 8],
        colAligns: ["center","left","right"],
      style: {
          head:["blue"],
          compact: true,
          border: ["green"], 
      }
    });

    for(var i = 0; i< data.length; i++){
        table.push([data[i].id,data[i].product_name,data[i].price]);
    }
    console.log(table.toString());
    console.log("");
});

};

var shopping = function(){
    inquirer
    .prompt({
        name:"buyProduct",
        type:"input",
        message: "Enter the product Id of the item you wish to purchase."
    })
    
    .then(function(answer1) {
        var selection = answer1.buyProduct;
        connection.query("SELECT * FROM products1 WHERE id=?", selection,function(err,data){
            if(err) throw err;
            if (data.length === 0){
                console.log("We don't sell this item, please enter a Product id from the list above");
               
                shopping();
            }else {
                inquirer.prompt({
                    name: "quantity",
                    type: "input",
                    message:" How many items would you like to purchase?"
                })
            }
            
        });
    });
};



display();