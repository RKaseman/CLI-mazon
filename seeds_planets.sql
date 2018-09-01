
USE climazon_db;

INSERT INTO planets
(
    rowid, fpl_hostname, fpl_letter, fpl_name, fpl_discmethod, fpl_disc, fpl_orbper, fpl_orbperreflink, fpl_smax, fpl_smaxreflink, fpl_eccen, fpl_eccenreflink, fpl_bmasse, fpl_bmassj, fpl_bmassprov ,fpl_bmassreflink, fpl_rade, fpl_radj, fpl_rads, fpl_radreflink
)

    -- , fpl_dens, fpl_densreflink, fpl_eqt, fpl_eqtreflink, fpl_insol, fpl_insolreflink, fpl_tranflag, fpl_cbflag, fpl_snum, ra_str, ra, dec_str, dec ,fst_posreflink, fst_dist, fst_distreflink, fst_optmag, fst_optmagband, fst_optmagreflink, fst_nirmag, fst_nirmagband, fst_nirmagreflink, fst_spt, fst_sptreflink, fst_teff, fst_teffreflink, fst_logg ,fst_loggreflink, fst_lum, fst_lumreflink, fst_mass, fst_massreflink, fst_rad, fst_radreflink, fst_met, fst_metratio, fst_metreflink, fst_age, fst_agereflink
-- )
VALUES
(
    3778,
    "xi Aql",
    "b",
    "xi Aql b",
    "Radial Velocity",
    2007,
    136.75,
    "http://adsabs.harvard.edu/cgi-bin/nph-bib_query?bibcode=2008PASJ...60..539S -- Sato et al. 2008",
    0.68,
    "href=http://adsabs.harvard.edu/cgi-bin/nph-bib_query?bibcode=2008PASJ...60..539S -- Sato et al. 2008",
    0,
    "href=http://adsabs.harvard.edu/cgi-bin/nph-bib_query?bibcode=2008PASJ...60..539S -- Sato et al. 2008",
    890,
    2.8,
    "Msini",
    "href=http://adsabs.harvard.edu/cgi-bin/nph-bib_query?bibcode=2008PASJ...60..539S -- Sato et al. 2008",
    13.2,
    1.18,
    0.121,
    "href=""/docs/composite_calc.html -- Calculated Value"
);

