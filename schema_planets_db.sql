
DROP DATABASE IF EXISTS climazon_db;
CREATE DATABASE climazon_db;
USE climazon_db;

CREATE TABLE planets (
    rowid INTEGER(4) NOT NULL,
    fpl_hostname VARCHAR(255),
    fpl_letter VARCHAR(1),
    fpl_name VARCHAR(255),
    fpl_discmethod VARCHAR(255),
    fpl_disc YEAR,
    fpl_orbper DECIMAL(20,10),
    fpl_eccen DECIMAL(20,10),
    fpl_bmasse DECIMAL(20,10),
    fpl_bmassj DECIMAL(20,10),
    fpl_rade DECIMAL(20,10),
    fpl_radj DECIMAL(20,10),
    fpl_rads DECIMAL(20,10),
    fpl_dens DECIMAL(20,10),
    fpl_eqt DECIMAL(20,10),
    fpl_snum DECIMAL(20,10),
    fst_dist DECIMAL(20,10),
    fst_optmag DECIMAL(20,10),
    fst_spt VARCHAR(255),
    fst_teff DECIMAL(20,10),
    fst_lum DECIMAL(20,10),
    fst_mass DECIMAL(20,10),
    fst_rad DECIMAL(20,10),
    fst_age DECIMAL(20,10),
    PRIMARY KEY (rowid)
);

