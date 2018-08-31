
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "greatbay_db"
});


connection.connect(function(error) {
    if (error) throw error;
    console.log("\nconnection.threadId = " + connection.threadId + "\n");

    inquirer.prompt([
        {
            type: "list",
            name: "choiceOne",
            message: "Select an option",
            choices: ["Post Item", "Bid on Item"]
        }
    ])

    function postIt() {
        inquirer.prompt([
            {
                type: "input",
                name: "postItem",
                message: "Enter the Item and the Value"
            }
        ])
        newEntry();
    };

    function bidIt() {
        inquirer.prompt([
            {
                type: "list",
                name: "bidItem",
                message: "Select the Item",
                choices: ["SELECT * FROM auctions"]
            }
        ])
    };

    inquirer.prompt([
        {
            type: "input",
            name: "bid",
            message: "Your Bid"
        }
    ])
        .then(function(answers) {
            if (answers.choiceOne[0]) {
                console.log("\n");
                postIt();
            }
            else {
                console.log("\n");
                bidIt();
            }
        });


    function newEntry() {
        var itemString = process.argv.slice(2, [process.argv.length - 1]).join(" ");
        console.log("itemString = " + itemString);

        var grabValue = parseInt(process.argv[process.argv.length - 1]);
        console.log("grabValue = " + grabValue);
        // console.log("Creating Item...");

        var query = connection.query(
            "INSERT INTO auctions SET ?",
            {
                item: itemString,
                itemValue: grabValue
            },
            function(error, response) {
                if (error) throw error;
                console.log("error = " + error);
                console.log("response.affectedRows = " + response.affectedRows + " item added.\n")

        });
    };


    // updateEntry();


    function updateEntry() {

        var query = connection.query(
            "UPDATE auctions SET itemValue WHERE item = query.sql",
            [{
                itemValue: query.sql
            }],
            function(error, response) {
                if (error) throw error;
                console.log("error = " + error);
                console.log("response.affectedRows = " 
                    + response.affectedRows 
                    + " updated.\n")

        });
        console.log("Updated bid: " + itemValue);
    };


    // readDB();


    function readDB() {
        console.log("Searching...");

        connection.query(
            "SELECT * FROM auctions", function(error, response) {
            if (error) throw error;
            console.log(response);
            console.log("success!");

            });
    };


    // connection.end();


});

