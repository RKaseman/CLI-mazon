
var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "climazon_db"
});


connection.connect(function(error) {
    if (error) throw error;
    console.log("\nconnection.threadId = " + connection.threadId + "\n");
    search();
});


function search() {
    inquirer.prompt({
        type: "list",
        name: "choiceOne",
        message: "Select an option",
        choices: [
            "Find a planet",
            "Find a planet name by letters",
            "Buy a planet"
        ]
    })
    .then(function (answers) {
        switch (answers.choiceOne) {
            case "Find a planet":
            console.log("\n");
            findPlanet();
            break;

            case "Find a planet name by letters":
            console.log("\n");
            findPlanetAlpha();
            break;

            case "Buy a planet":
            console.log("\n");
            buyPlanet();
            break;
        }
    });
};


function findPlanet() {
    inquirer.prompt({
        type: "input",
        name: "planet",
        message: "Enter the planet's name"
    })
    .then(function (answers) {
        var planetName = "SELECT fpl_name, fpl_discmethod, fpl_disc FROM planets WHERE ?";
        connection.query(planetName, { fpl_name: answers.fpl_name }, function (error, response) {
            for (var i = 0; i < response.length; i++) {
                console.log("Full name: " + response[i].name 
                + ", Discovery Method: " + response[i].fpl_discmethod 
                + ", Discovery Year: " + response[i].fpl_disc);
            }
            search();
        });
    });
};

//     function bidIt() {
//         inquirer.prompt([
//             {
//                 type: "list",
//                 name: "bidItem",
//                 message: "Select the Item",
//                 choices: ["SELECT * FROM auctions"]
//             }
//         ])
//     };

//     inquirer.prompt([
//         {
//             type: "input",
//             name: "bid",
//             message: "Your Bid"
//         }
//     ])

//     function newEntry() {
//         var itemString = process.argv.slice(2, [process.argv.length - 1]).join(" ");
//         console.log("itemString = " + itemString);

//         var grabValue = parseInt(process.argv[process.argv.length - 1]);
//         console.log("grabValue = " + grabValue);
//         // console.log("Creating Item...");

//         var query = connection.query(
//             "INSERT INTO auctions SET ?",
//             {
//                 item: itemString,
//                 itemValue: grabValue
//             },
//             function(error, response) {
//                 if (error) throw error;
//                 console.log("error = " + error);
//                 console.log("response.affectedRows = " + response.affectedRows + " item added.\n")

//         });
//     };


//     // updateEntry();


//     function updateEntry() {

//         var query = connection.query(
//             "UPDATE auctions SET itemValue WHERE item = query.sql",
//             [{
//                 itemValue: query.sql
//             }],
//             function(error, response) {
//                 if (error) throw error;
//                 console.log("error = " + error);
//                 console.log("response.affectedRows = " 
//                     + response.affectedRows 
//                     + " updated.\n")

//         });
//         console.log("Updated bid: " + itemValue);
//     };


//     // readDB();


//     function readDB() {
//         console.log("Searching...");

//         connection.query(
//             "SELECT * FROM auctions", function(error, response) {
//             if (error) throw error;
//             console.log(response);
//             console.log("success!");

//             });
//     };


    // connection.end();



