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

    console.log("\nWelcome to bamazon! Find our product catalog below: \n");

    // Return the entire products table 
    connection.query('SELECT * FROM products', function(err, results){
        if (err) throw err; 
        var choices = ''; 
        results.map(function(x){
            choices += (`Item Id: ${x.itemID}; Product Name: ${x.productName}; Price: ${x.price}; Units left: ${x.stockQuantity} \n`)
        }) 
        console.log(choices); 
        whatProduct(); 
    })
}

function whatProduct() {
    inquirer.prompt([
        {
            name: 'whatProduct', 
            type: 'input', 
            message: 'What is the id of the product you would like to purchase?'
        },
        {
            name: 'howMuch',
            type: 'input',
            message: 'How many units would you like to purchase?'
        }
    ]).then((res) => {
        connection.query('SELECT * FROM products', (err, results) => {
            if (err) throw err; 
            results.forEach(element => {
                if (parseInt(res.whatProduct) === element.itemID) {
                    if (parseInt(res.howMuch) > element.stockQuantity) {
                        console.log('Insufficient quantity!')
                    } else {
                        updateAndLog(element.stockQuantity, res.howMuch, element.itemID, element.price); 
                    }
                }
            });
        })
    })   
}

function updateAndLog(w, x, y, z) {
    connection.query(
        'UPDATE products SET ? WHERE ?', 
        [{stockQuantity: w - x}, {itemID: y}],
        err => {
            if (err) throw err; 
            let total = x * z
            console.log("Your order total is " + total.toFixed(2)); 
        }
    )
    connection.end(); 
}

  


  

