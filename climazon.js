
var mysql = require("mysql");
var inquirer = require("inquirer");

var StringDecoder = require("string_decoder").StringDecoder;
var decoder = new StringDecoder("utf8");
var deg = Buffer([0xC2, 0xB0]);

var format32 = "\n--------------------------------\n";
var format48 = "\n------------------------------------------------";

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "climazon_db"
});


connection.connect(function (error) {
    if (error) throw error;
    console.log(format32 + "-|   Connected to God Node    |-" + format32);
    search();
});


// options on program start
function search() {
    inquirer.prompt({
        type: "list",
        name: "choiceOne",
        message: "Browse exoplanets for sale",
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
                console.log(format48
                    + "\n Planetary Data Results for '" + answers.planet + "'"
                    + format48);
            for (var i = 0; i < response.length; i++) {
                console.log("                 Planet name: " + response[i].fpl_name
                    + "\n            Discovery Method: " + response[i].fpl_discmethod
                    + "\n              Discovery Year: " + response[i].fpl_disc
                    + "\n       Orbital Period [days]: " + response[i].fpl_orbper
                    + "\n                Eccentricity: " + response[i].fpl_eccen
                    + "\n    Planet Mass [Earth mass]: " + response[i].fpl_bmasse
                    + "\n  Planet Mass [Jupiter mass]: " + response[i].fpl_bmassj
                    + "\n Planet Radius [Earth radii]: " + response[i].fpl_rade
                    + "\n Equilibrium Temperature [K]: " + response[i].fpl_eqt + " (" + ((((parseFloat(response[i].fpl_eqt) * 9 / 5) * 10000) - (459.67 * 10000)) / 10000) + decoder.write(deg) + "F)"
                    + "\n   Number of Stars in System: " + response[i].fpl_snum
                    + "\n      Distance [pc (parsec)]: " + response[i].fst_dist
                    + "\nStellar Age [Gyr (gigayear)]: " + response[i].fst_age
                    + "\n                   Purchased: " + response[i].rmk_cust
                    + format48);
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
            console.log("\n------------------------------------------------"
                + "\n Planets discovered in " + answers.discovered + ":"
                + "\n------------------------------------------------");
            for (var i = 0; i < response.length; i++) {
                console.log(" -| " + response[i].fpl_name);
            }
            buyNow();
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
        var orbPerLow = parseFloat(answers.orbitalPeriod) - 5;
        var orbPerHigh = parseFloat(answers.orbitalPeriod) + 5;
        var planetOrbPer = "SELECT * FROM planets WHERE fpl_orbper BETWEEN " + orbPerLow + " AND " + orbPerHigh;
        connection.query(planetOrbPer, function (error, response) {
            if (error) throw error;
            console.log("\n------------------------------------------------"
                + "\n Orbital Period +/- 5 days: " + answers.orbitalPeriod
                + "\n------------------------------------------------");
            for (var i = 0; i < response.length; i++) {
                console.log("                   Full name: " + response[i].fpl_name
                    + "\n       Orbital Period [days]: " + response[i].fpl_orbper
                    + "\n------------------------------------------------");
            }
            buyNow();
        });
    });
};


// for case "Filter by Planet Mass [Earth mass]"
function bmasseFilter() {
    inquirer.prompt({
        type: "input",
        name: "earthMass",
        message: "Enter size (1 = earth mass)"
    }).then(function (answers) {
        var earthMassLow = parseFloat(answers.earthMass) - 0.5;
        var earthMassHigh = parseFloat(answers.earthMass) + 0.5;
        var planetMass = "SELECT * FROM planets WHERE fpl_bmasse BETWEEN " + earthMassLow + " AND " + earthMassHigh;
        connection.query(planetMass, function (error, response) {
            if (error) throw error;
            console.log("\n------------------------------------------------"
                + "\n Planet Mass +/- 0.5 of earth mass: " + answers.earthMass
                + "\n------------------------------------------------");
            for (var i = 0; i < response.length; i++) {
                console.log("                   Full name: " + response[i].fpl_name
                    + "\n    Planet Mass [Earth mass]: " + response[i].fpl_bmasse
                    + "\n  Planet Mass [Jupiter mass]: " + response[i].fpl_bmassj
                    + "\n------------------------------------------------");
            }
            buyNow();
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
            console.log("\n------------------------------------------------"
                + "\n Number of suns: " + answers.sunCount
                + "\n------------------------------------------------");
            for (var i = 0; i < response.length; i++) {
                console.log("                   Full name: " + response[i].fpl_name
                    + "\n            Discovery Method: " + response[i].fpl_discmethod
                    + "\n                Eccentricity: " + response[i].fpl_eccen
                    + "\n Equilibrium Temperature [K]: " + response[i].fpl_eqt + " (" + ((((parseFloat(response[i].fpl_eqt) * 9 / 5) * 10000) - (459.67 * 10000)) / 10000) + decoder.write(deg) + "F)"
                    + "\n   Number of Stars in System: " + response[i].fpl_snum
                    + "\n------------------------------------------------");
            }
            buyNow();
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
        var distLow = parseFloat(answers.distance) - 0.5;
        var distHigh = parseFloat(answers.distance) + 0.5;
        console.log("distance range = " + distLow + " to " + distHigh);
        var planetDist = "SELECT * FROM planets WHERE fst_dist BETWEEN " + distLow + " AND " + distHigh;
        connection.query(planetDist, function (error, response) {
            if (error) throw error;
            console.log("\n------------------------------------------------"
                + "\n Distance in parsecs +/- 0.5: " + answers.distance
                + "\n------------------------------------------------");
            for (var i = 0; i < response.length; i++) {
                console.log("                   Full name: " + response[i].fpl_name
                    + "\n      Distance [pc (parsec)]: " + response[i].fst_dist
                    + "\nStellar Age [Gyr (gigayear)]: " + response[i].fst_age
                    + "\n------------------------------------------------");
            }
            buyNow();
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
        var stellarAgeLow = parseFloat(answers.stellarAge) - 0.4;
        var stellarAgeHigh = parseFloat(answers.stellarAge) + 0.4;
        console.log("distance range = " + stellarAgeLow + " to " + stellarAgeHigh);
        var starAge = "SELECT * FROM planets WHERE fst_age BETWEEN " + stellarAgeLow + " AND " + stellarAgeHigh;
        connection.query(starAge, function (error, response) {
            if (error) throw error;
            console.log("\n------------------------------------------------"
                + "\n Stellar Age in gigayears +/- 0.4: " + answers.stellarAge
                + "\n------------------------------------------------");
            for (var i = 0; i < response.length; i++) {
                console.log("                   Full name: " + response[i].fpl_name
                    + "\n            Discovery Method: " + response[i].fpl_discmethod
                    + "\n Equilibrium Temperature [K]: " + response[i].fpl_eqt + " (" + ((((parseFloat(response[i].fpl_eqt) * 9 / 5) * 10000) - (459.67 * 10000)) / 10000) + decoder.write(deg) + "F)"
                    + "\n   Number of Stars in System: " + response[i].fpl_snum
                    + "\n      Distance [pc (parsec)]: " + response[i].fst_dist
                    + "\nStellar Age [Gyr (gigayear)]: " + response[i].fst_age
                    + "\n------------------------------------------------");
            }
            buyNow();
        });
    });
};


// for case "Buy a planet"
function buyNow() {
    inquirer.prompt({
            type: "confirm",
            name: "buyPlanetNow",
            message: "Buy a planet?",
            default: true
        }).then(function (yesNo) {
        if (yesNo.buyPlanetNow === true) {
            buyPlanet();
        }
        else {
            search();
        }
    });
};


// for case "Buy a planet"
function buyPlanet() {
    inquirer.prompt({
        type: "input",
        name: "whichPlanet",
        message: "Enter the planet you wish to buy:"
    }).then(function (answers) {
        connection.query("SELECT * FROM planets WHERE fpl_name ='" + answers.whichPlanet + "'", function (error, response) {
            if (error) throw error;
            for (var i = 0; i < response.length; i++) {
                var orbper = parseFloat(response[i].fpl_orbper) / 10;
                var eccen = parseFloat(response[i].fpl_eccen) * 2;
                var rade = parseFloat(response[i].fpl_rade) * 1.5;
                var eqt = parseFloat(response[i].fpl_eqt) * 3.5;
                var snum = parseFloat(response[i].fpl_snum) * 5;
                var dist = parseFloat(response[i].fst_dist) * 2.75;
                var age = parseFloat(response[i].fst_age) * 0.5;
                var purchasePrice = dist - orbper - eccen - rade + eqt + snum - age;

                console.log(" rowid: " 
                    + response[i].rowid 
                    + ", " + response[i].fpl_name 
                    + ", " + orbper 
                    + ", " + eccen 
                    + ", " + rade 
                    + ", " + eqt 
                    + ", " + snum 
                    + ", " + dist 
                    + ", " + age);

                console.log("Purchase price for \n" + response[i].fpl_name + "\n is $" + purchasePrice + " billion");
                var updateData = response[i].rowid;
                inquirer.prompt({
                    type: "confirm",
                    name: "yesToBuy",
                    message: "Buy the planet",
                    default: true
                }).then(function (yesBuy) {
                    if (yesBuy.yesToBuy === true) {
                        connection.query("UPDATE planets SET ? WHERE ?",
                        [{rmk_cust: true},{rowid: updateData}], function (error, response) {
                            if (error) throw error;
                            console.log(response.affectedRows + " purchased");
                        }
                    )}
                nameFind();
                })
            }
        });
        // inquirer.prompt({
        //     type: "list",
        //     name: "quantity",
        //     message: "Purchase options:",
        //     choices: [
        //         "Buy whole planet",
        //         "Buy a hemisphere",
        //         "Buy a quarter",
        //     ]
        // }).then(function (answers) {
        //     switch (answers.quantity) {
        //         case "Buy whole planet":
        //             buyWhole();
        //             break;

        //         case "Buy a hemisphere":
        //             buyHalf();
        //             break;

        //         case "Buy a quarter":
        //             buyQuarter();
        //             break;

        //     }
        // });
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
//             "SELECT * FROM planets", function(error, response) {
//             if (error) throw error;
//             console.log(response);
//             console.log("success!");

//             });
//     };


    // connection.end();

