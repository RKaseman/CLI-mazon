
var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "climazon_db"
});


connection.connect(function (error) {
    if (error) throw error;
    // console.log("\nconnection.threadId = " + connection.threadId + "\n");
    search();
});


// options on program start
function search() {
    inquirer.prompt({
        type: "list",
        name: "choiceOne",
        message: "Browse exoplanets for sale",
        choices: [
            "Find a planet by name",
            "Find a planet name by letter(s)",
            "Filter by Discovery Year",
            "Filter by Orbital Period",
            "Filter by Planet Mass [Earth mass]",
            "Filter by number of Suns",
            "Filter by Distance [parsecs]",
            "Filter by Stellar Age [gigayears]",
            "Buy a planet"
        ]
    }).then(function (answers) {
        switch (answers.choiceOne) {
            case "Find a planet by name":
                nameFind();
                break;

            case "Find a planet name by letter(s)":
                partNameFilter();
                break;

            case "Filter by Discovery Year":
                discFilter();
                break;

            case "Filter by Orbital Period":
                orbperFilter();
                break;

            case "Filter by Planet Mass [Earth mass]":
                bmasseFilter();
                break;

            case "Filter by number of Suns":
                snumFilter();
                break;

            case "Filter by Distance [parsecs]":
                distFilter();
                break;

            case "Filter by Stellar Age [gigayears]":
                starAgeFilter();
                break;

            case "Buy a planet":
                buyPlanet();
                break;
        }
    });
};


// for case "Find a planet by name"
function nameFind() {
    inquirer.prompt({
        type: "input",
        name: "planet",
        message: "Enter the planet's name"
    }).then(function (answers) {
        var planetName = "SELECT * FROM planets WHERE ?";
        connection.query(planetName, { fpl_name: answers.planet }, function (error, response) {
            if (error) throw error;
                console.log(""
                    + "\n-----------------------------"
                    + "\n          Planet Name Results"
                    + "\n-----------------------------");
            for (var i = 0; i < response.length; i++) {
                console.log(""
                    + "\n                   Full name: " + response[i].fpl_name
                    + "\n            Discovery Method: " + response[i].fpl_discmethod
                    + "\n              Discovery Year: " + response[i].fpl_disc
                    + "\n       Orbital Period [days]: " + response[i].fpl_orbper
                    + "\n                Eccentricity: " + response[i].fpl_eccen
                    + "\n    Planet Mass [Earth mass]: " + response[i].fpl_bmasse
                    + "\n  Planet Mass [Jupiter mass]: " + response[i].fpl_bmassj
                    + "\n Equilibrium Temperature [K]: " + response[i].fpl_eqt
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


// for case "Find a planet name by letter(s)"
function partNameFilter() {
    inquirer.prompt({
        type: "input",
        name: "planetLetter",
        message: "Select letter to search"
    }).then(function (answers) {
        var searchChar = answers.planetLetter + "%";
        var letterSearch = "SELECT * FROM planets WHERE fpl_name LIKE '" + searchChar + "%'";
        connection.query(letterSearch, function (error, response) {
            if (error) throw error;
            console.log("Partial Name Results: ");
            for (var j = 0; j < response.length; j++) {
                console.log(""
                    + "\n"
                    + response[j].fpl_name);
            }
            buyNow();
        });
    });
};


// for case "Filter by Discovery Year"
function discFilter() {
    inquirer.prompt({
        type: "input",
        name: "discovered",
        message: "Enter the year to search"
    }).then(function (answers) {
        var planetDisc = "SELECT * FROM planets WHERE ?";
        connection.query(planetDisc, { fpl_disc: answers.discovered }, function (error, response) {
            if (error) throw error;
            for (var i = 0; i < response.length; i++) {
                // console.log(response);
                console.log(""
                    + "\n-----------------------------"
                    + "\n       Discovery Year Results"
                    + "\n-----------------------------"
                    + "\n                   Full name: " + response[i].fpl_name
                    + "\n            Discovery Method: " + response[i].fpl_discmethod
                    + "\n              Discovery Year: " + response[i].fpl_disc
                    + "\n       Orbital Period [days]: " + response[i].fpl_orbper
                    + "\n                Eccentricity: " + response[i].fpl_eccen
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


// for case "Filter by Orbital Period"
function orbperFilter() {
    inquirer.prompt({
        type: "input",
        name: "orbitalPeriod",
        message: "Enter the desired length of a year"
    }).then(function (answers) {
        var orbPerLow = parseFloat(answers.orbitalPeriod) - 1;
        var orbPerHigh = parseFloat(answers.orbitalPeriod) + 1;
        console.log("orbital period range = " + orbPerLow + " to " + orbPerHigh);
        var planetOrbPer = "SELECT * FROM planets WHERE fpl_orbper BETWEEN " + orbPerLow + " AND " + orbPerHigh;
        connection.query(planetOrbPer, function (error, response) {
            if (error) throw error;
            for (var i = 0; i < response.length; i++) {
                // console.log(response);
                console.log(""
                    + "\n-----------------------------"
                    + "\n       Orbital Period Results"
                    + "\n-----------------------------"
                    + "\n                   Full name: " + response[i].fpl_name
                    + "\n            Discovery Method: " + response[i].fpl_discmethod
                    + "\n              Discovery Year: " + response[i].fpl_disc
                    + "\n       Orbital Period [days]: " + response[i].fpl_orbper
                    + "\n                Eccentricity: " + response[i].fpl_eccen
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


// for case "Filter by Planet Mass [Earth mass]"
function bmasseFilter() {
    inquirer.prompt({
        type: "input",
        name: "earthMass",
        message: "Enter the desired size"
    }).then(function (answers) {
        var earthMassLow = parseFloat(answers.earthMass) - 0.5;
        var earthMassHigh = parseFloat(answers.earthMass) + 0.5;
        console.log("mass range = " + earthMassLow + " to " + earthMassHigh);
        var planetMass = "SELECT * FROM planets WHERE fpl_bmasse BETWEEN " + earthMassLow + " AND " + earthMassHigh;
        connection.query(planetMass, function (error, response) {
            if (error) throw error;
            for (var i = 0; i < response.length; i++) {
                // console.log(response);
                console.log(""
                    + "\n-----------------------------"
                    + "\n          Planet Mass Results"
                    + "\n-----------------------------"
                    + "\n                   Full name: " + response[i].fpl_name
                    + "\n            Discovery Method: " + response[i].fpl_discmethod
                    + "\n              Discovery Year: " + response[i].fpl_disc
                    + "\n       Orbital Period [days]: " + response[i].fpl_orbper
                    + "\n                Eccentricity: " + response[i].fpl_eccen
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


// for case "Filter by number of Suns"
function snumFilter() {
    inquirer.prompt({
        type: "input",
        name: "sunCount",
        message: "Enter the number of suns"
    }).then(function (answers) {
        var sunNumber = "SELECT * FROM planets WHERE ?";
        connection.query(sunNumber, { fpl_snum: answers.sunCount }, function (error, response) {
            if (error) throw error;
            for (var i = 0; i < response.length; i++) {
                // console.log(response);
                console.log(""
                    + "\n-----------------------------"
                    + "\n       Number of Suns Results"
                    + "\n-----------------------------"
                    + "\n                   Full name: " + response[i].fpl_name
                    + "\n            Discovery Method: " + response[i].fpl_discmethod
                    + "\n              Discovery Year: " + response[i].fpl_disc
                    + "\n       Orbital Period [days]: " + response[i].fpl_orbper
                    + "\n                Eccentricity: " + response[i].fpl_eccen
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


// for case "Filter by Distance [parsecs]"
function distFilter() {
    inquirer.prompt({
        type: "input",
        name: "distance",
        message: "Enter the distance in parsecs (1 parsec = 19 trillion miles)"
    }).then(function (answers) {
        var distLow = parseFloat(answers.distance) - 0.6;
        var distHigh = parseFloat(answers.distance) + 0.6;
        console.log("distance range = " + distLow + " to " + distHigh);
        var planetDist = "SELECT * FROM planets WHERE fst_dist BETWEEN " + distLow + " AND " + distHigh;
        connection.query(planetDist, function (error, response) {
            if (error) throw error;
            for (var i = 0; i < response.length; i++) {
                // console.log(response);
                console.log(""
                    + "\n-----------------------------"
                    + "\n             Distance Results"
                    + "\n-----------------------------"
                    + "\n                   Full name: " + response[i].fpl_name
                    + "\n            Discovery Method: " + response[i].fpl_discmethod
                    + "\n              Discovery Year: " + response[i].fpl_disc
                    + "\n       Orbital Period [days]: " + response[i].fpl_orbper
                    + "\n                Eccentricity: " + response[i].fpl_eccen
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


// for case "Filter by Stellar Age [gigayears]"
function starAgeFilter() {
    inquirer.prompt({
        type: "input",
        name: "stellarAge",
        message: "Enter the star age in gigayears (1 gigayear = 1 billion years)"
    }).then(function (answers) {
        var stellarAgeLow = parseFloat(answers.stellarAge) - 1.1;
        var stellarAgeHigh = parseFloat(answers.stellarAge) + 1.1;
        console.log("distance range = " + stellarAgeLow + " to " + stellarAgeHigh);
        var starAge = "SELECT * FROM planets WHERE fst_age BETWEEN " + stellarAgeLow + " AND " + stellarAgeHigh;
        connection.query(starAge, function (error, response) {
            if (error) throw error;
            for (var i = 0; i < response.length; i++) {
                // console.log(response);
                console.log(""
                    + "\n-----------------------------"
                    + "\n          Stellar Age Results"
                    + "\n-----------------------------"
                    + "\n                   Full name: " + response[i].fpl_name
                    + "\n            Discovery Method: " + response[i].fpl_discmethod
                    + "\n              Discovery Year: " + response[i].fpl_disc
                    + "\n       Orbital Period [days]: " + response[i].fpl_orbper
                    + "\n                Eccentricity: " + response[i].fpl_eccen
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


// for case "Buy a planet"
function buyNow() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "buyPlanetNow",
            message: "Buy a planet?",
            default: true
        }
    ]).then(function (yesNo) {
        if (yesNo.buyPlanetNow === true) {
            console.log("\n");
            nameFind();
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
        message: "Purchase options:",
        choices: [
            "Buy whole planet",
            "Buy a hemisphere",
            "Buy a quarter",
        ]
    }).then(function (answers) {
        switch (answers.choiceTwo) {
            case "Buy whole planet":
                buyWhole();
                break;

            case "Buy a hemisphere":
                buyHalf();
                break;

            case "Buy a quarter":
                buyQuarter();
                break;

        }
    });
};

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

