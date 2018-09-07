
var mysql = require("mysql");
var inquirer = require("inquirer");

var StringDecoder = require("string_decoder").StringDecoder;
var decoder = new StringDecoder("utf8");
var deg = Buffer([0xC2, 0xB0]);

var format32 = "--------------------------------";
var format48 = "------------------------------------------------";


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "climazon_db"
});


connection.connect(function (error) {
    if (error) throw error;
    console.log("\n" + format32 + "\n-|   Connected to God Node    |-\n" + format32 + "\n");
    search();
});


// options on program start
function search() {
    inquirer.prompt({
        type: "list",
        name: "choiceOne",
        message: "Browse exoplanets for sale (WARNING: some search results can be lengthy!)\n ",
        choices: [
            "Find a planet by name or search a combination of characters",
            "Filter by Discovery Year",
            "Filter by Orbital Period",
            "Filter by Planet Mass (Earth mass)",
            "Filter by number of Suns",
            "Filter by Distance (in parsecs)",
            "Filter by Stellar Age (in gigayears)",
            "Buy a planet",
            "Order history",
            "Quit"
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

            case "Order history":
                orderHistory();
                break;

            case "Quit":
                quitCLI();
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
            if (response == 0) {
                console.log(format32 + "\nNo results. Try again.\n" + format32);
                nameFind();
            } else {
                console.log("\n" + format48
                    + "\n Planetary Data Results for '" + answers.planet + "'\n"
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
                        + "\n Equilibrium Temperature [K]: " + response[i].fpl_eqt
                        + " (" + ((((parseFloat(response[i].fpl_eqt) * 9 / 5) * 10000) - (459.67 * 10000)) / 10000) + decoder.write(deg) + "F)"
                        + "\n   Number of Stars in System: " + response[i].fpl_snum
                        + "\n      Distance [pc (parsec)]: " + response[i].fst_dist
                        + "\nStellar Age [Gyr (gigayear)]: " + response[i].fst_age
                        + "\n                   Purchased: " + response[i].rmk_cust
                        + "\n" + format48);
                }
                buyNow();
            }
        });
    });
};


// for case "Filter by Discovery Year"
function discFilter() {
    inquirer.prompt({
        type: "input",
        name: "discovered",
        message: "Enter the year to search (1989, 1992, 1994-present)."
    }).then(function (answers) {
        var planetDisc = "SELECT * FROM planets WHERE ?";
        connection.query(planetDisc, { fpl_disc: answers.discovered }, function (error, response) {
            if (error) throw error;
            if (response == 0) {
                console.log(format32 + "\nNo results. Try again.\n" + format32);
                discFilter();
            } else {
                console.log("\n" + format48
                    + "\n Planets discovered in " + answers.discovered + ":"
                    + "\n" + format48);
                for (var i = 0; i < response.length; i++) {
                    console.log(response[i].loc_rowid + ". " + response[i].fpl_name);
                }
                buyNow();
            }
        });
    });
};


// for case "Filter by Orbital Period"
function orbperFilter() {
    inquirer.prompt({
        type: "input",
        name: "orbitalPeriod",
        message: "Enter the length of a year in days (0.09-7300000)"
    }).then(function (answers) {
        var orbPerLow = parseFloat(answers.orbitalPeriod) - 5;
        var orbPerHigh = parseFloat(answers.orbitalPeriod) + 5;
        var planetOrbPer = "SELECT * FROM planets WHERE fpl_orbper BETWEEN " + orbPerLow + " AND " + orbPerHigh;
        connection.query(planetOrbPer, function (error, response) {
            if (error) throw error;
            if (response == 0) {
                console.log(format32 + "\nNo results. Try again.\n" + format32);
                orbperFilter();
            } else {
                console.log("\n" + format48
                    + "\n Orbital Period " + answers.orbitalPeriod + " days (+/- 5)"
                    + "\n" + format48);
                for (var i = 0; i < response.length; i++) {
                    console.log("                   Full name: " + response[i].fpl_name
                        + "\n       Orbital Period [days]: " + response[i].fpl_orbper
                        + "\n" + format48);
                }
                buyNow();
            }
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
            if (response == 0) {
                console.log("No results. Try again.");
                bmasseFilter();
            } else {
                console.log("\n" + format48
                    + "\n Planet Mass +/- 0.5 of earth mass: " + answers.earthMass
                    + "\n" + format48);
                for (var i = 0; i < response.length; i++) {
                    console.log("                   Full name: " + response[i].fpl_name
                        + "\n    Planet Mass [Earth mass]: " + response[i].fpl_bmasse
                        + "\n  Planet Mass [Jupiter mass]: " + response[i].fpl_bmassj
                        + "\n" + format48);
                }
                buyNow();
            }
        });
    });
};


// for case "Filter by number of Suns"
function snumFilter() {
    inquirer.prompt({
        type: "input",
        name: "sunCount",
        message: "Enter the number of suns (1-4)"
    }).then(function (answers) {
        var sunNumber = "SELECT * FROM planets WHERE ?";
        connection.query(sunNumber, { fpl_snum: answers.sunCount }, function (error, response) {
            if (error) throw error;
            if (response == 0) {
                console.log("No results. Try again.");
                snumFilter();
            } else {
                console.log("\n" + format48
                    + "\n Number of suns: " + answers.sunCount
                    + "\n" + format48);
                for (var i = 0; i < response.length; i++) {
                    console.log("                   Full name: " + response[i].fpl_name
                        + "\n            Discovery Method: " + response[i].fpl_discmethod
                        + "\n                Eccentricity: " + response[i].fpl_eccen
                        + "\n Equilibrium Temperature [K]: " + response[i].fpl_eqt
                        + " (" + ((((parseFloat(response[i].fpl_eqt) * 9 / 5) * 10000) - (459.67 * 10000)) / 10000) + decoder.write(deg) + "F)"
                        + "\n   Number of Stars in System: " + response[i].fpl_snum
                        + "\n" + format48);
                }
                buyNow();
            }
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
        var planetDist = "SELECT * FROM planets WHERE fst_dist BETWEEN " + distLow + " AND " + distHigh;
        connection.query(planetDist, function (error, response) {
            if (error) throw error;
            if (response == 0) {
                console.log("No results. Try again.");
                distFilter();
            } else {
                console.log("\n" + format48
                    + "\n Distance in parsecs +/- 0.5: " + answers.distance
                    + "\n" + format48);
                for (var i = 0; i < response.length; i++) {
                    console.log("                   Full name: " + response[i].fpl_name
                        + "\n      Distance [pc (parsec)]: " + response[i].fst_dist
                        + "\nStellar Age [Gyr (gigayear)]: " + response[i].fst_age
                        + "\n" + format48);
                }
                buyNow();
            }
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
        var starAge = "SELECT * FROM planets WHERE fst_age BETWEEN " + stellarAgeLow + " AND " + stellarAgeHigh;
        connection.query(starAge, function (error, response) {
            if (error) throw error;
            if (response == 0) {
                console.log("No results. Try again.");
                starAgeFilter();
            } else {
                console.log("\n" + format48
                    + "\n Stellar Age " + answers.stellarAge + " gigayears +/- 0.4\n" + format48);
                for (var i = 0; i < response.length; i++) {
                    console.log("                   Full name: " + response[i].fpl_name
                        + "\n            Discovery Method: " + response[i].fpl_discmethod
                        + "\n Equilibrium Temperature [K]: " + response[i].fpl_eqt
                        + " (" + ((((parseFloat(response[i].fpl_eqt) * 9 / 5) * 10000) - (459.67 * 10000)) / 10000) + decoder.write(deg) + "F)"
                        + "\n   Number of Stars in System: " + response[i].fpl_snum
                        + "\n      Distance [pc (parsec)]: " + response[i].fst_dist
                        + "\nStellar Age [Gyr (gigayear)]: " + response[i].fst_age
                        + "\n" + format48);
                }
                buyNow();
            }
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


var purchasePrice;


// for case "Buy a planet"
function buyPlanet() {
    inquirer.prompt({
        type: "input",
        name: "whichPlanet",
        message: "Confirm the planet you wish to buy:"
    }).then(function (answers) {
        connection.query("SELECT * FROM planets WHERE fpl_name ='" + answers.whichPlanet + "'", function (error, response) {
            if (error) throw error;
            for (var i = 0; i < response.length; i++) {
                var orbper = parseFloat(response[i].fpl_orbper);
                var eccen = parseFloat(response[i].fpl_eccen);
                var rade = parseFloat(response[i].fpl_rade);
                var eqt = parseFloat(response[i].fpl_eqt);
                var snum = parseFloat(response[i].fpl_snum);
                var dist = parseFloat(response[i].fst_dist);
                var age = parseFloat(response[i].fst_age);
                purchasePrice = dist - orbper - eccen - rade + eqt + snum - age;
                console.log(" loc_rowid: "
                    + response[i].loc_rowid
                    + ", " + response[i].fpl_name
                    + ", " + orbper
                    + ", " + eccen
                    + ", " + rade
                    + ", " + eqt
                    + ", " + snum
                    + ", " + dist
                    + ", " + age);

                console.log("Purchase price for \n " + response[i].fpl_name + "\nis $" + purchasePrice + " billion");
                var condition = response[i].rmk_cust;
                var updateData = response[i].loc_rowid;
                var buyName = response[i].fpl_name;
                inquirer.prompt({
                    type: "confirm",
                    name: "yesToBuy",
                    message: "Buy the planet",
                    default: true
                }).then(function (yesBuy) {
                    if (yesBuy.yesToBuy === true && condition === 0) {
                        connection.query("UPDATE planets SET rmk_cust = 1 WHERE ?",
                            [{ loc_rowid: updateData }], function (error, response) {
                                if (error) throw error;
                                console.log("\n" + format32 + "\n " + buyName + " purchased");
                                orderHistory();
                            }
                        )
                    } else {
                        console.log("\n" + format32 + "\n-|     Already purchased      |-");
                        orderHistory();
                    }
                })
            }
        });
    });
};


function orderHistory() {
    console.log("\n" + format32 + "\n-|     Planets purchased      |-\n" + format32 + "\n");
    connection.query("SELECT * FROM planets WHERE rmk_cust = 1", function (error, response) {
        if (error) throw error;
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].loc_rowid + ". " + response[i].fpl_name);
        }
        console.log("\n" + format32 + "\n");
        search();
    });
};


function quitCLI() {
    connection.end();
};


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


