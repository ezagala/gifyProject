var mysql = require('mysql'); 
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start(); 
  });

  function start(){
    // Return the entire products table 
      connection.query('SELECT * FROM products', function(err, results){
          if (err) throw err; 
            // Loop through the results and build a list of available products. Build a choices array that the user will use inquirer to select from 
            inquirer.prompt([
                {
                    name: 'productList', 
                    type: 'list', 
                    choices: function () {
                        var choiceArry = [];
                        results.map(function(x){
                            choiceArry.push(`Item Id: ${x.itemID}; Product Name: ${x.productName}; Price: ${x.price}; Units left: ${x.stockQuantity}`)
                        })
                        return choiceArry; 
                    },
                    message: 'What product are you intersted in?'
                },
                {
                    name: 'howMuch',
                    type: 'input',
                    message: 'How many units would you like to purchase?'
                }
            ]).then(function(res){
                console.log(res);
                if (results.stockQuantity === 0) {
                    console.log('Insufficient quantity!')
                    start(); 
                } else {
                    fulfull(res.howMuch); 
                }
            })
      })
  }

  function fulfull() {
    // Update the products table to reflect the customers order 

    // Calculate and log the customers total 
  }

  

