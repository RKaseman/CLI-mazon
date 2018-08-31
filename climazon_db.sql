
DROP DATABASE IF EXISTS climazon_db;
CREATE DATABASE climazon_db;
USE climazon_db;

CREATE TABLE inventory (
  id INTEGER NOT NULL AUTO_INCREMENT,
  item VARCHAR(40) NULL,
  department VARCHAR(40),
  price MONEY NOT NULL,
  stock INTEGER NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO inventory (item, department, price, stock)
VALUES
("Renewable Energy", "Utopian Dreams", 1000, 10000),
("Better Education", "Utopian Dreams", 1500, 5000),
("Rational Healthcare", "Utopian Dreams", 1750, 750),
("Critical Thinking Skills", "Utopian Dreams", 2000, 500),
("Vacation in Orbit", "Science Fiction Dreams", 1000000, 100),
("Vacation on Luna", "Science Fiction Dreams", 4500000, 10),
("Trip to Mars", "Science Fiction Dreams", 1250000, 5),
("Trip to Saturn", "Science Fiction Dreams", 2000000, 4),
("Trip to Andromeda", "Science Fiction Dreams", 5000000, 2),
("One-way to the Galactic Core's Black Hole", "Science Fiction Dreams", 10000000, 1);

