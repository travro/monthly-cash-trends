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
      if (err) console.log('GET_Categories error: ' + err);
      console.log(results);
      res.send(results[0]);
    })
  });

router.route('/categories/:newCat')
  .post((req, res) => {
    database.query(`CALL InsertCategory('${req.body}')`, (err) => {
      if (err) console.log('POST_Category error: ' + err);
    })
  });

router.route('/categories/:id')
  .delete((req, res) => {
    //console.log("This is the body" + JSON.stringify(req.body));
    database.query(`CALL DeleteCategory(${req.body})`, (err) => {
      if (err) console.log('DELETE_Category error: ' + err);
    })
  });

module.exports = router;
