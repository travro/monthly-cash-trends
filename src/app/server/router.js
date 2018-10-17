const router = require('express').Router();
const database = require('./database');


router.route('/')
    .get((req, res) => {
        database.query(`
        select 
    transactions.id, 
    transactions.date, 
    transactions.amount,
    vendors.vendor,
    category.category
    from transactions
    inner join vendors 
    	on transactions.vendors_id = vendors.id
    inner join vendors_has_category 
    	on vendors.id = vendors_has_category.vendors_id
    inner join category
    	on vendors_has_category.category_id = category.id
        `, (err, results, fields) => {
                if (err) console.log('Query error: ' + err);
                res.send(results);
            })
    });

module.exports = router;
