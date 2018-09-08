
// requires
var mysql = require("mysql");
var inquirer = require("inquirer");

// node stringDecoder for the degree sign in temp conversions
var StringDecoder = require("string_decoder").StringDecoder;
var decoder = new StringDecoder("utf8");
var deg = Buffer([0xC2, 0xB0]);


// database connection parameters
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "expamazon_db"
});


// connection message or error
connection.connect(function (error) {
    if (error) throw error;
    console.log("\n--------------------------------");
    console.log("-|   Connected to God Node    |-");
    console.log("-|   The Ultimate Get Away    |-");
    console.log("--------------------------------\n");
    search();
});


// options on program start
function search() {
    inquirer.prompt({
        type: "list",
        name: "choiceOne",
        message: "Browse exoplanets for sale (WARNING: some search results can be lengthy!)",
        choices: [
            "Find a planet by name or search any characters",
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
        // search cases
        switch (answers.choiceOne) {
            case "Find a planet by name or search any characters":
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


// for case "Find a planet by name or search any characters"
function nameFind() {
    inquirer.prompt({
        type: "input",
        name: "planet",
        message: "Search for: "
    }).then(function (answers) {
        // LIKE % * % used for more search flexibility
        var planetName = "SELECT * FROM planets WHERE fpl_name LIKE '%" + answers.planet + "%'";
        // query planets table for search string
        connection.query(planetName, function (error, response) {
            if (error) throw error;
            if (response == 0) {
                // each search query function has the potential of generating this message and rerunning
                console.log("--------------------------------");
                console.log("     No results. Try again.     ");
                console.log("--------------------------------");
                nameFind();
            } else {
                // returns a small subset of the planetary data available at
                // https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=compositepars
                // a smaller subset of these results is used for arbitrary cost calculation
                console.log("------------------------------------------------");
                console.log(" Planetary Data Results for '" + answers.planet + "'");
                console.log("------------------------------------------------");
                // loop through the query response and show matches
                for (var i = 0; i < response.length; i++) {
                    console.log("                 Planet name: " + response[i].fpl_name
                        + "\n            Discovery Method: " + response[i].fpl_discmethod
                        + "\n              Discovery Year: " + response[i].fpl_disc
                        + "\n       Orbital Period [days]: " + response[i].fpl_orbper
                        + "\n                Eccentricity: " + response[i].fpl_eccen
                        + "\n    Planet Mass [Earth mass]: " + response[i].fpl_bmasse
                        + "\n  Planet Mass [Jupiter mass]: " + response[i].fpl_bmassj
                        + "\n Planet Radius [Earth radii]: " + response[i].fpl_rade
                        // converted temperature from Kelvin to Fahrenheit
                        + "\n Equilibrium Temperature [K]: " + response[i].fpl_eqt
                        + " (" + ((((parseFloat(response[i].fpl_eqt) * 9 / 5) * 10000) - (459.67 * 10000)) / 10000) + decoder.write(deg) + "F)"
                        + "\n   Number of Stars in System: " + response[i].fpl_snum
                        + "\n      Distance [pc (parsec)]: " + response[i].fst_dist
                        + "\nStellar Age [Gyr (gigayear)]: " + response[i].fst_age
                        + "\n     Purchased (0=no, 1=yes): " + response[i].rmk_cust);
                    console.log("------------------------------------------------");
                }
                // after each search the buyNow function runs
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
        // valid years to search given
        message: "Enter the year to search (1989, 1992, 1994-present):"
    }).then(function (answers) {
        var planetDisc = "SELECT * FROM planets WHERE ?";
        connection.query(planetDisc, { fpl_disc: answers.discovered }, function (error, response) {
            if (error) throw error;
            if (response == 0) {
                console.log("--------------------------------");
                console.log("     No results. Try again.     ");
                console.log("--------------------------------");
                discFilter();
            } else {
                console.log("------------------------------------------------");
                console.log(" Planets discovered in " + answers.discovered + ":");
                console.log("------------------------------------------------");
                for (var i = 0; i < response.length; i++) {
                    console.log("              Archive number: " + response[i].loc_rowid
                        + "\n                 Planet Name: " + response[i].fpl_name
                        + "\n            Discovery Method: " + response[i].fpl_discmethod
                        + "\n    Planet Mass [Earth mass]: " + response[i].fpl_bmasse
                        + "\n Planet Radius [Earth radii]: " + response[i].fpl_rade
                        + "\n      Distance [pc (parsec)]: " + response[i].fst_dist
                        + "\n     Purchased (0=no, 1=yes): " + response[i].rmk_cust);
                    console.log("------------------------------------------------");
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
        // search range given
        message: "Enter the length of a year in days (0.09-7300000):"
    }).then(function (answers) {
        var orbPerLow = parseFloat(answers.orbitalPeriod) - 2;
        var orbPerHigh = parseFloat(answers.orbitalPeriod) + 2;
        // user input plus or minus 2 years used as search range to limit results
        var planetOrbPer = "SELECT * FROM planets WHERE fpl_orbper BETWEEN " + orbPerLow + " AND " + orbPerHigh;
        connection.query(planetOrbPer, function (error, response) {
            if (error) throw error;
            if (response == 0) {
                console.log("--------------------------------");
                console.log("     No results. Try again.     ");
                console.log("--------------------------------");
                orbperFilter();
            } else {
                console.log("------------------------------------------------");
                console.log(" Orbital Period " + answers.orbitalPeriod + " days (+/- 2)");
                console.log("------------------------------------------------");
                for (var i = 0; i < response.length; i++) {
                    console.log("                   Full name: " + response[i].fpl_name
                        + "\n       Orbital Period [days]: " + response[i].fpl_orbper
                        + "\n    Planet Mass [Earth mass]: " + response[i].fpl_bmasse
                        + "\n Planet Radius [Earth radii]: " + response[i].fpl_rade
                        + "\n      Distance [pc (parsec)]: " + response[i].fst_dist
                        + "\n     Purchased (0=no, 1=yes): " + response[i].rmk_cust);
                    console.log("------------------------------------------------");
                }
                buyNow();
            }
        });
    });
};


// for case "Filter by Planet Mass (Earth mass)"
function bmasseFilter() {
    inquirer.prompt({
        type: "input",
        name: "earthMass",
        // mass reference given
        message: "Enter mass (1 = earth mass):"
    }).then(function (answers) {
        var earthMassLow = parseFloat(answers.earthMass) - 0.1;
        var earthMassHigh = parseFloat(answers.earthMass) + 0.1;
        // user input plus or minus 0.1 earth masses used as search range to limit results
        var planetMass = "SELECT * FROM planets WHERE fpl_bmasse BETWEEN " + earthMassLow + " AND " + earthMassHigh;
        connection.query(planetMass, function (error, response) {
            if (error) throw error;
            if (response == 0) {
                console.log("--------------------------------");
                console.log("     No results. Try again.     ");
                console.log("--------------------------------");
                bmasseFilter();
            } else {
                console.log("------------------------------------------------");
                console.log(" Planet Mass +/- 0.1 of earth mass: " + answers.earthMass);
                console.log("------------------------------------------------");
                for (var i = 0; i < response.length; i++) {
                    console.log("                   Full name: " + response[i].fpl_name
                        + "\n    Planet Mass [Earth mass]: " + response[i].fpl_bmasse
                        + "\n  Planet Mass [Jupiter mass]: " + response[i].fpl_bmassj
                        + "\n Planet Radius [Earth radii]: " + response[i].fpl_rade
                        + "\n     Purchased (0=no, 1=yes): " + response[i].rmk_cust);
                    console.log("------------------------------------------------");
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
        // search range given
        message: "Enter the number of suns (1-4):"
    }).then(function (answers) {
        var sunNumber = "SELECT * FROM planets WHERE ?";
        connection.query(sunNumber, { fpl_snum: answers.sunCount }, function (error, response) {
            if (error) throw error;
            if (response == 0) {
                console.log("--------------------------------");
                console.log("     No results. Try again.     ");
                console.log("--------------------------------");
                snumFilter();
            } else {
                console.log("------------------------------------------------");
                console.log(" Number of suns: " + answers.sunCount);
                console.log("------------------------------------------------");
                for (var i = 0; i < response.length; i++) {
                    console.log("                   Full name: " + response[i].fpl_name
                        + "\n            Discovery Method: " + response[i].fpl_discmethod
                        + "\n                Eccentricity: " + response[i].fpl_eccen
                        + "\n    Planet Mass [Earth mass]: " + response[i].fpl_bmasse
                        + "\n Planet Radius [Earth radii]: " + response[i].fpl_rade
                        + "\n Equilibrium Temperature [K]: " + response[i].fpl_eqt
                        + " (" + ((((parseFloat(response[i].fpl_eqt) * 9 / 5) * 10000) - (459.67 * 10000)) / 10000) + decoder.write(deg) + "F)"
                        + "\n   Number of Stars in System: " + response[i].fpl_snum
                        + "\n     Purchased (0=no, 1=yes): " + response[i].rmk_cust);
                    console.log("------------------------------------------------");
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
        // reference distance and search range given
        message: "Enter the distance in parsecs (1 parsec = 19 trillion miles, 1.29-8,500):"
    }).then(function (answers) {
        var distLow = parseFloat(answers.distance) - 0.5;
        var distHigh = parseFloat(answers.distance) + 0.5;
        // user input plus or minus 0.5 parsecs used as search range to increase odds of results
        var planetDist = "SELECT * FROM planets WHERE fst_dist BETWEEN " + distLow + " AND " + distHigh;
        connection.query(planetDist, function (error, response) {
            if (error) throw error;
            if (response == 0) {
                console.log("--------------------------------");
                console.log("     No results. Try again.     ");
                console.log("--------------------------------");
                distFilter();
            } else {
                console.log("------------------------------------------------");
                console.log(" Distance in parsecs +/- 0.5: " + answers.distance);
                console.log("------------------------------------------------");
                for (var i = 0; i < response.length; i++) {
                    console.log("                   Full name: " + response[i].fpl_name
                        + "\n    Planet Mass [Earth mass]: " + response[i].fpl_bmasse
                        + "\n Planet Radius [Earth radii]: " + response[i].fpl_rade
                        + "\n      Distance [pc (parsec)]: " + response[i].fst_dist
                        + "\nStellar Age [Gyr (gigayear)]: " + response[i].fst_age
                        + "\n     Purchased (0=no, 1=yes): " + response[i].rmk_cust);
                    console.log("------------------------------------------------");
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
        // reference age and search range given
        message: "Enter the star age in gigayears (1 gigayear = 1 billion years, 0.001-13.4):"
    }).then(function (answers) {
        var stellarAgeLow = parseFloat(answers.stellarAge) - 0.02;
        var stellarAgeHigh = parseFloat(answers.stellarAge) + 0.02;
        // user input plus or minus 0.02 parsecs used as search range to limit results
        var starAge = "SELECT * FROM planets WHERE fst_age BETWEEN " + stellarAgeLow + " AND " + stellarAgeHigh;
        connection.query(starAge, function (error, response) {
            if (error) throw error;
            if (response == 0) {
                console.log("--------------------------------");
                console.log("     No results. Try again.     ");
                console.log("--------------------------------");
                starAgeFilter();
            } else {
                console.log("------------------------------------------------");
                console.log(" Stellar Age " + answers.stellarAge + " gigayears +/- 0.02");
                console.log("------------------------------------------------");
                for (var i = 0; i < response.length; i++) {
                    console.log("                   Full name: " + response[i].fpl_name
                        + "\n            Discovery Method: " + response[i].fpl_discmethod
                        + "\n Equilibrium Temperature [K]: " + response[i].fpl_eqt
                        + " (" + ((((parseFloat(response[i].fpl_eqt) * 9 / 5) * 10000) - (459.67 * 10000)) / 10000) + decoder.write(deg) + "F)"
                        + "\n   Number of Stars in System: " + response[i].fpl_snum
                        + "\n      Distance [pc (parsec)]: " + response[i].fst_dist
                        + "\nStellar Age [Gyr (gigayear)]: " + response[i].fst_age
                        + "\n     Purchased (0=no, 1=yes): " + response[i].rmk_cust);
                    console.log("------------------------------------------------");
                }
                buyNow();
            }
        });
    });
};


// option to buy offered after each search
function buyNow() {
    inquirer.prompt({
        type: "confirm",
        name: "buyPlanetNow",
        message: "Buy a planet?",
        default: true
    }).then(function (yesNo) {
        // if the answer to message is yes
        if (yesNo.buyPlanetNow === true) {
            buyPlanet();
        }
        else {
            // otherwise rerun initial options list
            search();
        }
    });
};


// for case "Buy a planet"
function buyPlanet() {
    inquirer.prompt({
        type: "input",
        name: "whichPlanet",
        // program needs an accurate but case-insensitive single response result to do cost calculation
        message: "Confirm the planet you wish to buy:"
    }).then(function (answers) {
        connection.query("SELECT * FROM planets WHERE fpl_name ='" + answers.whichPlanet + "'", function (error, response) {
            if (error) throw error;
            if (response == 0) {
                console.log("--------------------------------");
                console.log("     No results. Try again.     ");
                console.log("--------------------------------");
                search();
            } else {
                // loop to gather values, stored in variables for cost calculation
                // zero values were stored via schema_planets_db.sql when the table
                // field values weren't given
                for (var i = 0; i < response.length; i++) {
                    var orbper = response[i].fpl_orbper * 2;
                    var eccen = response[i].fpl_eccen;
                    var rade = response[i].fpl_rade;
                    var eqt = response[i].fpl_eqt * 1.5;
                    var snum = response[i].fpl_snum;
                    var dist = response[i].fst_dist * 5;
                    var age = response[i].fst_age * 2;
                    // an arbitrary calculation of cost. Roughly based on extremity of
                    // variation from earth values.
                    purchasePrice = Math.round(parseFloat(dist + orbper - eccen - rade + eqt + snum - age) * Math.pow(10, 4)) / Math.pow(10, 4);
                    console.log("------------------------------------------------");
                    console.log("Purchase price for\n " + response[i].fpl_name + "\nis $" + purchasePrice + " billion");
                    console.log("------------------------------------------------");
                    var condition = response[i].rmk_cust;
                    var updateData = response[i].loc_rowid;
                    var buyName = response[i].fpl_name;
                    inquirer.prompt({
                        type: "confirm",
                        name: "yesToBuy",
                        message: "Buy the planet",
                        default: true
                    }).then(function (yesBuy) {
                        // if user changes their mind about buying
                        if (yesBuy.yesToBuy === false) {
                            search();
                        }
                        else if (yesBuy.yesToBuy === true && condition === 0) {
                            // if choice to buy is yes and planet is not marked as purchased
                            // mark planet as purchased in the custom table column: rmk_custom
                            connection.query("UPDATE planets SET rmk_cust = 1 WHERE ?",
                                [{ loc_rowid: updateData }], function (error, response) {
                                    if (error) throw error;
                                    console.log("--------------------------------");
                                    console.log(" " + buyName + " purchased");
                                    console.log("--------------------------------");
                                    search();
                                })
                        } else {
                            // otherwise give this message and show order history
                            console.log("--------------------------------");
                            console.log("-|     Already purchased      |-");
                            console.log("--------------------------------");
                            orderHistory();
                        }
                    })
                }
            }
        });
    });
};



// for case "Order history"
function orderHistory() {
    // array to store each purchase price, calculated on the fly
    var costs = [];
    console.log("\n--------------------------------");
    console.log("-|     Planets purchased      |-");
    console.log("--------------------------------\n");
    // find planets marked as purchased
    connection.query("SELECT * FROM planets WHERE rmk_cust = 1", function (error, response) {
        if (error) throw error;
        if (response == 0) {
            console.log("--------------------------------");
            console.log("     No results. Try again.     ");
            console.log("--------------------------------");
            search();
        } else {
            for (var i = 0; i < response.length; i++) {
                // same cost calculation as above
                var orbper = response[i].fpl_orbper * 2;
                var eccen = response[i].fpl_eccen;
                var rade = response[i].fpl_rade;
                var eqt = response[i].fpl_eqt * 1.5;
                var snum = response[i].fpl_snum;
                var dist = response[i].fst_dist * 5;
                var age = response[i].fst_age * 2;
                // initial variable for total purchases
                var sum = 0;
                purchasePrice = Math.round(parseFloat(dist + orbper - eccen - rade + eqt + snum - age) * Math.pow(10, 4)) / Math.pow(10, 4);
                // adds each purchase price to the var costs array
                costs.push(purchasePrice);
                // list of purchases and cost
                console.log(response[i].loc_rowid + ". " + response[i].fpl_name + " $" + purchasePrice);
                // loop to get purchase prices for display
                for (j = 0; j < costs.length; j++) {
                    sum += costs[j];
                }
            }
            console.log("\n- - - - - - - - - - - - - - - - ");
            // total cost of all purchases
            console.log("Total: $" + sum.toFixed(4) + " billion");
            console.log("--------------------------------\n");
            search();
        }
    });
};


// for case "Quit"
function quitCLI() {
    connection.end();
};

