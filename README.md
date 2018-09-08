# EXPA-mazon (Exoplanet Archive Marketplace)

- - -

## Node.js & MySQL

## Overview

The task was to create 
* an Amazon-like storefront
* take in orders from customers and deplete stock from the store's inventory
* provide a summary of the highest-grossing departments in the store

I didn't follow the instructions to the letter. I created my mock store to sell discovered exoplanets -- for the right price. The database is a subset of the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=compositepars).

- - -

I experienced the following types of errors when importing the database file into HeidiSQL:
```
/* Warning (1265): Data truncated for column 'fpl_eqt' at row 1 */
/* Warning (1366): Incorrect integer value: '' for column 'rmk_cust' at row 1 */
```

I couldn't find an answer for eliminating them and they don't seem to affect the performance I wanted from the database.

<!-- ### Add To Your Portfolio -->

<!-- After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio. -->

