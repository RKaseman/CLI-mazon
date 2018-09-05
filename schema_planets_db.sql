
DROP DATABASE IF EXISTS climazon_db;
CREATE DATABASE climazon_db;
USE climazon_db;

CREATE TABLE planets (
    rowid INTEGER(4) NOT NULL,
    fpl_hostname VARCHAR(200) NULL,
    fpl_letter VARCHAR(1) NULL,
    fpl_name VARCHAR(200) NULL,
    fpl_discmethod VARCHAR(200) NULL,
    fpl_disc YEAR NULL,
    fpl_orbper FLOAT NULL,
    fpl_eccen FLOAT NULL,
    fpl_bmasse FLOAT NULL,
    fpl_bmassj FLOAT NULL,
    fpl_rade FLOAT NULL,
    fpl_radj FLOAT NULL,
    fpl_rads FLOAT NULL,
    fpl_dens FLOAT NULL,
    fpl_eqt FLOAT NULL,
    fpl_snum FLOAT NULL,
    fst_dist FLOAT NULL,
    fst_lum FLOAT NULL,
    fst_mass FLOAT NULL,
    fst_rad FLOAT NULL,
    fst_age FLOAT NULL,
    rmk_cust BOOLEAN DEFAULT false,
    PRIMARY KEY (rowid)
);

