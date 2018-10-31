const router = require('express').Router();
const database = require('./database');
const bodyParser = require('body-parser');


//Using body parser to parse strings
router.use(bodyParser.text());


router.route('/')
  .get((req, res) => {
    database.query(`CALL GetAllTransactions()`, (err, results, fields) => {
      if (err) console.log('GET all trans error: ' + err);
      console.log(results[0]);
      res.send(results[0]);
    })
  });

router.route('/categories')
  .get((req, res) => {
      database.query('CALL GetAllCategories()', (err, results, fields) => {
        if(err) console.log('GET categories error: ' + err);
        console.log(results);
        res.send(results[0]);
      })
  });

  /**
   *Does not work!!
   *
   */
router.route('/categories/:newCat')
  .post((req, res) =>{
    database.query(`CALL InsertCategory('${req.body}')`, (err)=>{
      if(err) console.log('POST category error: ' + err);
    })
  }


);

module.exports = router;
