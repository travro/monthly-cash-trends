CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `mct`.`budget2019` AS
    SELECT 
        `mct`.`categories`.`id` AS `id`,
        `mct`.`categories`.`category` AS `Category`,
        (SELECT 
                SUM(`mct`.`transactions`.`amount`)
            FROM DUAL WHERE
                ((MONTH(`mct`.`transactions`.`dt`) = 1)
                    AND (YEAR(`mct`.`transactions`.`dt`) = 2019))) AS `January`,
        (SELECT 
                SUM(`mct`.`transactions`.`amount`)
            FROM DUAL WHERE
                ((MONTH(`mct`.`transactions`.`dt`) = 2)
                    AND (YEAR(`mct`.`transactions`.`dt`) = 2019))) AS `February`,
        (SELECT 
                SUM(`mct`.`transactions`.`amount`)
            FROM DUAL WHERE
                ((MONTH(`mct`.`transactions`.`dt`) = 3)
                    AND (YEAR(`mct`.`transactions`.`dt`) = 2019))) AS `March`,
        (SELECT 
                SUM(`mct`.`transactions`.`amount`)
            FROM DUAL WHERE
                ((MONTH(`mct`.`transactions`.`dt`) = 4)
                    AND (YEAR(`mct`.`transactions`.`dt`) = 2019))) AS `April`,
        (SELECT 
                SUM(`mct`.`transactions`.`amount`)
            FROM DUAL WHERE
                ((MONTH(`mct`.`transactions`.`dt`) = 5)
                    AND (YEAR(`mct`.`transactions`.`dt`) = 2019))) AS `May`,
        (SELECT 
                SUM(`mct`.`transactions`.`amount`)
            FROM DUAL WHERE
                ((MONTH(`mct`.`transactions`.`dt`) = 6)
                    AND (YEAR(`mct`.`transactions`.`dt`) = 2019))) AS `June`,
        (SELECT 
                SUM(`mct`.`transactions`.`amount`)
            FROM DUAL WHERE
                ((MONTH(`mct`.`transactions`.`dt`) = 7)
                    AND (YEAR(`mct`.`transactions`.`dt`) = 2019))) AS `July`,
        (SELECT 
                SUM(`mct`.`transactions`.`amount`)
            FROM DUAL WHERE
                ((MONTH(`mct`.`transactions`.`dt`) = 8)
                    AND (YEAR(`mct`.`transactions`.`dt`) = 2019))) AS `August`,
        (SELECT 
                SUM(`mct`.`transactions`.`amount`)
            FROM DUAL WHERE
                ((MONTH(`mct`.`transactions`.`dt`) = 9)
                    AND (YEAR(`mct`.`transactions`.`dt`) = 2019))) AS `September`,
        (SELECT 
                SUM(`mct`.`transactions`.`amount`)
            FROM DUAL WHERE
                ((MONTH(`mct`.`transactions`.`dt`) = 10)
                    AND (YEAR(`mct`.`transactions`.`dt`) = 2019))) AS `October`,
        (SELECT 
                SUM(`mct`.`transactions`.`amount`)
            FROM DUAL WHERE
                ((MONTH(`mct`.`transactions`.`dt`) = 11)
                    AND (YEAR(`mct`.`transactions`.`dt`) = 2019))) AS `November`,
        (SELECT 
                SUM(`mct`.`transactions`.`amount`)
            FROM DUAL WHERE
                ((MONTH(`mct`.`transactions`.`dt`) = 12)
                    AND (YEAR(`mct`.`transactions`.`dt`) = 2019))) AS `December`
    FROM
        (`mct`.`categories`
        LEFT JOIN `mct`.`transactions` ON ((`mct`.`transactions`.`cat_id` = `mct`.`categories`.`id`)))
    GROUP BY `mct`.`categories`.`category`