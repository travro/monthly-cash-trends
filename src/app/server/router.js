const router = require('express').Router();
const database = require('./database');


router.route('/')
    .get((req, res) => {
        database.query('CALL GetAllTransactions();',(err, results, fields) => {
                if (err) console.log('Query error: ' + err);
                res.send(results);
            })
    });

module.exports = router;
