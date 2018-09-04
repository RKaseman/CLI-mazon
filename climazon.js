
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
    console.log("\n  --------------------------------\n  -|   Connected to God Node    |-\n  --------------------------------\n");
    search();
});


// options on program start
function search() {
    inquirer.prompt({
        type: "list",
        name: "choiceOne",
        message: "-| Browse exoplanets for sale |-",
        choices: [
            "Find a planet by name or search a combination of characters",
            "Filter by Discovery Year",
            "Filter by Orbital Period",
            "Filter by Planet Mass (Earth mass)",
            "Filter by number of Suns",
            "Filter by Distance (in parsecs)",
            "Filter by Stellar Age (in gigayears)",
            "Buy a planet"
        ]
    }).then(function (answers) {
        switch (answers.choiceOne) {
            case "Find a planet by name or search a combination of characters":
                nameFind();
                break;

            case "Filter by Discovery Year":
                discFilter();
                break;

            case "Filter by Orbital Period":
                orbperFilter();
                break;

            case "Filter by Planet Mass (Earth mass)":
                bmasseFilter();
                break;

            case "Filter by number of Suns":
                snumFilter();
                break;

            case "Filter by Distance (in parsecs)":
                distFilter();
                break;

            case "Filter by Stellar Age (in gigayears)":
                starAgeFilter();
                break;

            case "Buy a planet":
                buyPlanet();
                break;
        }
    });
};


// for case "Find a planet by name or search a combination of characters"
function nameFind() {
    inquirer.prompt({
        type: "input",
        name: "planet",
        message: "Enter a planet name (full or partial)"
    }).then(function (answers) {
        var planetName = "SELECT * FROM planets WHERE fpl_name LIKE '%" + answers.planet + "%'";
        connection.query(planetName, function (error, response) {
            if (error) throw error;
                console.log("\n--------------------------------"
                    + "\n Planetary Data Results for '" + answers.planet + "'"
                    + "\n--------------------------------");
            for (var i = 0; i < response.length; i++) {
                console.log("                 Planet name: " + response[i].fpl_name
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
                    + "\n--------------------------------");
            }
            search();
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
            console.log("\n--------------------------------"
                + "\n Planets discovered in " + answers.discovered + ":"
                + "\n--------------------------------");
            for (var i = 0; i < response.length; i++) {
                console.log(response[i].fpl_name);
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
        message: "Enter the length of a year in days"
    }).then(function (answers) {
        var orbPerLow = parseFloat(answers.orbitalPeriod) - 0.5;
        var orbPerHigh = parseFloat(answers.orbitalPeriod) + 0.5;
        console.log("orbital period range = " + orbPerLow + " to " + orbPerHigh);
        var planetOrbPer = "SELECT * FROM planets WHERE fpl_orbper BETWEEN " + orbPerLow + " AND " + orbPerHigh;
        connection.query(planetOrbPer, function (error, response) {
            if (error) throw error;
            console.log(""
                + "\n--------------------------------"
                + "\n Orbital Period +/- 0.5 days: " + answers.orbitalPeriod
                + "\n--------------------------------");
            for (var l = 0; l < response.length; l++) {
                // console.log(response);
                console.log(""
                    + "                   Full name: " + response[l].fpl_name
                    + "\n            Discovery Method: " + response[l].fpl_discmethod
                    + "\n              Discovery Year: " + response[l].fpl_disc
                    + "\n       Orbital Period [days]: " + response[l].fpl_orbper
                    + "\n                Eccentricity: " + response[l].fpl_eccen
                    + "\n    Planet Mass [Earth mass]: " + response[l].fpl_bmasse
                    + "\n  Planet Mass [Jupiter mass]: " + response[l].fpl_bmassj
                    + "\n Equilibrium Temperature [K]: " + response[l].fpl_eqt
                    + "\n   Number of Stars in System: " + response[l].fpl_snum
                    + "\n      Distance [pc (parsec)]: " + response[l].fst_dist
                    + "\nStellar Age [Gyr (gigayear)]: " + response[l].fst_age
                    + "\n-----------------------------");
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
            console.log(""
                + "\n-----------------------------"
                + "\n Planet Mass +/- 0.5 of earth mass: " + answers.earthMass
                + "\n-----------------------------");
            for (var m = 0; m < response.length; m++) {
                // console.log(response);
                console.log(""
                    + "                   Full name: " + response[m].fpl_name
                    + "\n            Discovery Method: " + response[m].fpl_discmethod
                    + "\n              Discovery Year: " + response[m].fpl_disc
                    + "\n       Orbital Period [days]: " + response[m].fpl_orbper
                    + "\n                Eccentricity: " + response[m].fpl_eccen
                    + "\n    Planet Mass [Earth mass]: " + response[m].fpl_bmasse
                    + "\n  Planet Mass [Jupiter mass]: " + response[m].fpl_bmassj
                    + "\n Equilibrium Temperature [K]: " + response[m].fpl_eqt
                    + "\n   Number of Stars in System: " + response[m].fpl_snum
                    + "\n      Distance [pc (parsec)]: " + response[m].fst_dist
                    + "\nStellar Age [Gyr (gigayear)]: " + response[m].fst_age
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
            console.log(""
                + "\n-----------------------------"
                + "\n Number of suns: " + answers.sunCount
                + "\n-----------------------------");
            for (var n = 0; n < response.length; n++) {
                // console.log(response);
                console.log(""
                    + "                   Full name: " + response[n].fpl_name
                    + "\n            Discovery Method: " + response[n].fpl_discmethod
                    + "\n              Discovery Year: " + response[n].fpl_disc
                    + "\n       Orbital Period [days]: " + response[n].fpl_orbper
                    + "\n                Eccentricity: " + response[n].fpl_eccen
                    + "\n    Planet Mass [Earth mass]: " + response[n].fpl_bmasse
                    + "\n  Planet Mass [Jupiter mass]: " + response[n].fpl_bmassj
                    + "\n Equilibrium Temperature [K]: " + response[n].fpl_eqt
                    + "\n   Number of Stars in System: " + response[n].fpl_snum
                    + "\n      Distance [pc (parsec)]: " + response[n].fst_dist
                    + "\nStellar Age [Gyr (gigayear)]: " + response[n].fst_age
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
        var distLow = parseFloat(answers.distance) - 0.4;
        var distHigh = parseFloat(answers.distance) + 0.4;
        console.log("distance range = " + distLow + " to " + distHigh);
        var planetDist = "SELECT * FROM planets WHERE fst_dist BETWEEN " + distLow + " AND " + distHigh;
        connection.query(planetDist, function (error, response) {
            if (error) throw error;
            console.log(""
                + "\n-----------------------------"
                + "\n Distance in parsecs: " + answers.distance
                + "\n-----------------------------");
            for (var o = 0; o < response.length; o++) {
                // console.log(response);
                console.log(""
                    + "                   Full name: " + response[o].fpl_name
                    + "\n            Discovery Method: " + response[o].fpl_discmethod
                    + "\n              Discovery Year: " + response[o].fpl_disc
                    + "\n       Orbital Period [days]: " + response[o].fpl_orbper
                    + "\n                Eccentricity: " + response[o].fpl_eccen
                    + "\n    Planet Mass [Earth mass]: " + response[o].fpl_bmasse
                    + "\n  Planet Mass [Jupiter mass]: " + response[o].fpl_bmassj
                    + "\n Equilibrium Temperature [K]: " + response[o].fpl_eqt
                    + "\n   Number of Stars in System: " + response[o].fpl_snum
                    + "\n      Distance [pc (parsec)]: " + response[o].fst_dist
                    + "\nStellar Age [Gyr (gigayear)]: " + response[o].fst_age
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
            console.log(""
                + "\n-----------------------------"
                + "\n Stellar Age in gigayears: " + answers.stellarAge
                + "\n-----------------------------");
            for (var p = 0; p < response.length; p++) {
                // console.log(response);
                console.log(""
                    + "\n                   Full name: " + response[p].fpl_name
                    + "\n            Discovery Method: " + response[p].fpl_discmethod
                    + "\n              Discovery Year: " + response[p].fpl_disc
                    + "\n       Orbital Period [days]: " + response[p].fpl_orbper
                    + "\n                Eccentricity: " + response[p].fpl_eccen
                    + "\n    Planet Mass [Earth mass]: " + response[p].fpl_bmasse
                    + "\n  Planet Mass [Jupiter mass]: " + response[p].fpl_bmassj
                    + "\n Equilibrium Temperature [K]: " + response[p].fpl_eqt
                    + "\n   Number of Stars in System: " + response[p].fpl_snum
                    + "\n      Distance [pc (parsec)]: " + response[p].fst_dist
                    + "\nStellar Age [Gyr (gigayear)]: " + response[p].fst_age
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

