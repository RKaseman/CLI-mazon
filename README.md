# EXPA-mazon (Exoplanet Archive Marketplace)

## Node.js & MySQL

## Overview

### The task was to create 
* an Amazon-like storefront
* take in orders from customers and deplete stock from the store's inventory
* provide a summary of the highest-grossing departments in the store

I didn't follow the instructions to the letter. I created my mock store to sell discovered exoplanets -- for the right price. The database is a subset of the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=compositepars).

- - -

I experienced 2 types of errors when importing the `.csv` database file into HeidiSQL:
```
/* Warning (1265): Data truncated for column 'fpl_eqt' at row 1 */
/* Warning (1366): Incorrect integer value: '' for column 'rmk_cust' at row 1 */
```

I couldn't find an answer for eliminating them and they don't seem to affect the performance I wanted from the database. An image of the import settings I used is included with the files.

- - -

For demonstration purposes my searches were --

>Find a planet by name or search any characters
? Search for: br
? Search for: dy
? Search for: ev
? Search for: sa
? Search for: tau
? Search for: sex
* (I know it's juvenile, but it's still amusing. If [National Geographic](https://blog.nationalgeographic.org/2010/08/10/sex-c-new-planet-discovered/) can snicker about it, so can we.
? Search for: trappist
* (demo buy)

>Filter by Discovery Year
? Enter the year to search (1989, 1992, 1994-present): 1994
? Enter the year to search (1989, 1992, 1994-present): 2005

>Filter by Orbital Period
? Enter the length of a year in days (0.09-7300000): 2.75
? Enter the length of a year in days (0.09-7300000): 365
? Enter the length of a year in days (0.09-7300000): 7500
? Enter the length of a year in days (0.09-7300000): 555530

>Filter by Planet Mass (Earth mass)
? Enter mass (1 = earth mass): 0.5
? Enter mass (1 = earth mass): 1
? Enter mass (1 = earth mass): 7000
? Enter mass (1 = earth mass): 9057.77

>Filter by number of Suns
? Enter the number of suns (1-4): 5
? Enter the number of suns (1-4): 4
? Enter the number of suns (1-4): 3

>Filter by Distance (in parsecs)
? Enter the distance in parsecs (1 parsec = 19 trillion miles, 1.29-8,500): 1.29
? Enter the distance in parsecs (1 parsec = 19 trillion miles, 1.29-8,500): 2
? Enter the distance in parsecs (1 parsec = 19 trillion miles, 1.29-8,500): 50
? Enter the distance in parsecs (1 parsec = 19 trillion miles, 1.29-8,500): 6300

>Filter by Stellar Age (in gigayears)
? Enter the star age in gigayears (1 gigayear = 1 billion years, 0.001-13.4): 0.5
? Enter the star age in gigayears (1 gigayear = 1 billion years, 0.001-13.4): 7
? Enter the star age in gigayears (1 gigayear = 1 billion years, 0.001-13.4): 15
? Enter the star age in gigayears (1 gigayear = 1 billion years, 0.001-13.4): 13.4

>Buy a planet
? Confirm the planet you wish to buy: trappist-1 c

<!-- ### Add To Your Portfolio -->

<!-- After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio. -->

