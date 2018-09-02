
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
    // console.log("\nconnection.threadId = " + connection.threadId + "\n");
    search();
});


// options on program start
function search() {
    inquirer.prompt({
        type: "list",
        name: "choiceOne",
        message: "Select an option",
        choices: [
            "Find a planet",
            "Find a planet name by letter",
            "Buy a planet"
        ]
    })
    .then(function (answers) {
        switch (answers.choiceOne) {
            case "Find a planet":
            findPlanet();
            break;

            case "Find a planet name by letter":
            findPlanetLetter();
            break;

            case "Buy a planet":
            buyPlanet();
            break;
        }
    });
};


// for case "Find a planet"
function findPlanet() {
    inquirer.prompt({
        type: "input",
        name: "planet",
        message: "Enter the planet's name"
    }).then(function (answers) {
        var planetName = "SELECT fpl_name, fpl_discmethod, fpl_disc, fpl_orbper, fpl_bmasse, fpl_bmassj, fpl_snum, fst_dist, fst_age FROM planets WHERE ?";
        connection.query(planetName, { fpl_name: answers.planet }, function (error, response) {
            if (error) throw error;
            for (var i = 0; i < response.length; i++) {
                console.log(""
                + "\n-----------------------------"
                + "\n                      Results"
                + "\n-----------------------------"
                + "\n                   Full name: " + response[i].fpl_name
                + "\n            Discovery Method: " + response[i].fpl_discmethod
                + "\n              Discovery Year: " + response[i].fpl_disc
                + "\n       Orbital Period [days]: " + response[i].fpl_orbper
                + "\n    Planet Mass [Earth mass]: " + response[i].fpl_bmasse
                + "\n  Planet Mass [Jupiter mass]: " + response[i].fpl_bmassj
                + "\n   Number of Stars in System: " + response[i].fpl_snum
                + "\n      Distance [pc (parsec)]: " + response[i].fst_dist
                + "\nStellar Age [Gyr (gigayear)]: " + response[i].fst_age
                + "\n-----------------------------"
                + "\n");
            }
            search();
        });
    });
};


// for case "Find a planet name by letter"
function findPlanetLetter() {
    inquirer.prompt({
        type: "input",
        name: "planetLetter",
        message: "Select letter to search"
    }).then(function (answers) {
        var searchChar = answers.planetLetter + "%";
        var letterSearch = "SELECT * FROM planets WHERE fpl_name LIKE '" + searchChar + "%'";
        connection.query(letterSearch, function (error, response) {
            if (error) throw error;
            for (var j = 0; j < response.length; j++) {
                console.log(""
                + "\n"
                + "Planet names: " + response[j].fpl_name
                + "\n");
            }
            buyNow();
        });
    });
};


// automatic purchase offer
function buyNow() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "buyPlanetNow",
            message: "Buy this planet?",
            default: true
        }
    ]).then(function (yesNo) {
        if (yesNo.buyPlanetNow === true) {
            console.log("\n");
            console.log("test")
        }
        else {
            search();
        }
    });
};


// for case "Buy a planet"
function buyPlanet() {
    inquirer.prompt({
        type: "list",
        name: "choiceTwo",
        message: "Select a filter",
        choices: [
            "Filter by name",
            "Filter by letter",
            "Filter by number of suns",
            "Filter by distance",
            "Filter by age"
        ]
    }).then(function (answers) {
        switch (answers.choiceTwo) {
            case "Filter by name":
            nameFilter();
            break;

            case "Filter by letter":
            letterFilter();
            break;

            case "Filter by number of suns":
            sunsFilter();
            break;

            case "Filter by distance":
            distFilter();
            break;

            case "Filter by age":
            ageFilter();
            break;
        }
    });
};

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

