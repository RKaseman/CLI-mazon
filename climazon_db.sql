
DROP DATABASE IF EXISTS climazon_db;
CREATE DATABASE climazon_db;
USE climazon_db;

CREATE TABLE inventory (
  id INTEGER NOT NULL AUTO_INCREMENT,
  item VARCHAR(45) NULL,
  itemValue INTEGER(UNSIGNED) NULL,
  PRIMARY KEY (id)
);

INSERT INTO auctions (item, itemValue)
VALUES
("Renewable Energy", 1001),
("Better Education", 1002),
("Rational Healthcare", 1003),
("Trip to Mars", 1004);

