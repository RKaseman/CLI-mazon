# EXPA-mazon (Exoplanet Archive Marketplace)

## Node.js & MySQL

## Overview

### The task was to create 
* an Amazon-like storefront
* take in orders from customers and deplete stock from the store's inventory
* provide a summary of the highest-grossing departments in the store

I didn't follow the instructions to the letter. I created my mock store to sell discovered exoplanets -- for the right price. The database is a subset of the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=compositepars).

What would you want in a planet? Distance away? How many suns in your sky? How long until the host star goes supernova? Most similarity to earth? Take your pick, search, and buy.

- - -

I experienced 2 types of errors when importing the `.csv` database file into HeidiSQL:
```
/* Warning (1265): Data truncated for column 'fpl_eqt' at row 1 */
/* Warning (1366): Incorrect integer value: '' for column 'rmk_cust' at row 1 */
```

I couldn't find an answer for eliminating them and they don't seem to affect the performance I wanted from the database. An image of the import settings I used is included with the files.

- - -

_Some of the following examples will necessarily fail to return results as proof the app doesn't crash (except one case that's noted)._

**Demonstration video 1 rundown --** [click](https://drive.google.com/file/d/1qiw4EjHrnYqTaQ6rTI0sbGAN8bSv1W6o/view)

* There's an empty order history until a mock purchase is confirmed

* Find a planet by name or search any characters
  * ? Search for: br ```// no results```
  * ? Search for: dy ```// no results```
  * ? Search for: ev ```// no results```
  * ? Search for: sa ```// demo buy```
  * ? Search for: sex (I know it's juvenile, but it's still amusing. If [National Geographic](https://blog.nationalgeographic.org/2010/08/10/sex-c-new-planet-discovered/) can snicker about it, so can we.) ```// demo buy```
  * ? Search for: trap ```// don't buy after entering buy option```

* Filter by Discovery Year
  * ? Enter the year to search (1989, 1992, 1994-present): 1990 ```// no results```
  * ? Enter the year to search (1989, 1992, 1994-present): 1995 ```// demo buy```

* Filter by Orbital Period
  * ? Enter the length of a year in days (0.09-7300000): 365 ```// demo buy```
  * ? Enter the length of a year in days (0.09-7300000): 7500 ```// no results```
  * ? Enter the length of a year in days (0.09-7300000): 555530 ```// don't buy```

* Filter by Planet Mass (Earth mass)
  * ? Enter mass (1 = earth mass): 1 ```// demo buy```
  * ? Enter mass (1 = earth mass): 7000 ```// no results```
  * ? Enter mass (1 = earth mass): 9057.77 ```// don't buy```

* Filter by number of Suns
  * ? Enter the number of suns (1-4): 5 ```// no results```
  * ? Enter the number of suns (1-4): 4 ```// don't buy```
  * ? Enter the number of suns (1-4): 3 ```// demo buy```

* Filter by Distance (in parsecs)
  * ? Enter the distance in parsecs (1 parsec = 19 trillion miles, 1.29-8,500): 2 ```// demo buy```
  * ? Enter the distance in parsecs (1 parsec = 19 trillion miles, 1.29-8,500): 50 ```// no results```
  * ? Enter the distance in parsecs (1 parsec = 19 trillion miles, 1.29-8,500): 6300 ```// don't buy```

* Filter by Stellar Age (in gigayears)
  * ? Enter the star age in gigayears (1 gigayear = 1 billion years, 0.001-13.4): 5.2 ```// demo buy```
  * ? Enter the star age in gigayears (1 gigayear = 1 billion years, 0.001-13.4): 15 ```// no results```
  * ? Enter the star age in gigayears (1 gigayear = 1 billion years, 0.001-13.4): 13.4 ```// don't buy```

* Buy a planet
  * ? Confirm the planet you wish to buy: trappist-1 c

* Order History
  * Lists all and displays total value of purchased planets

**Demonstration video 2 rundown --** [click](https://drive.google.com/file/d/1rBtT78yYTvuXnH5q9llq6sAE0q76EsGK/view)

* Spelling errors are handled well, except in the case of non-letter or non-number characters not included in archive names, like ' (apostrophe)

* Order History from previous session is intact and the app won't let the user buy a planet twice
<!-- ### Add To Your Portfolio -->

<!-- After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio. -->

