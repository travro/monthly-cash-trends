const router = require('express').Router();
const database = require('./database');


router.route('/')
    .get((req, res) => {
        database.query(`CALL GetAllTransactions()`,(err, results, fields) => {
                if (err) console.log('Query error: ' + err);
                console.log(results[0]);
                res.send(results[0]);
            })
    });

module.exports = router;
