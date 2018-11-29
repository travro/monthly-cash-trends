const router = require('express').Router();
const database = require('./database');
const bodyParser = require('body-parser');


//Using body parser to parse strings
router.use(bodyParser.text());

/*
*Node Express routing for MySQL called Procedures
*/

//GET all transactions
router.route('/transactions')
  .get((req, res) => {
    database.query(`CALL GetAllTransactions()`, (err, results, fields) => {
      if (err) console.log('GET all trans error: ' + err);
      console.log(results[0]);
      res.send(results[0]);
    })
  });

//GET all categories
router.route('/categories')
  .get((req, res) => {
    database.query('CALL GetAllCategories()', (err, results) => {
      if (err) console.log('GET_Categories error: ' + err);
      console.log(results);
      res.send(results[0]);
    })
  });

//POST new category
router.route('/categories/insert/:newCat')
  .post((req, res) => {
    database.query(`CALL InsertCategory('${req.body}')`, (err, results) => {
      if (err) console.log('POST_Category error: ' + err);
      if (results) console.log('POST_CATEGORY complete');
    })
  });

//DELETE category
router.route('/categories/delete/:id')
  .delete((req, res) => {
    console.log("This is the body of the delete request: " + JSON.stringify(req.params.id));
    database.query(`CALL DeleteCategory(${req.params.id})`, (err, results) => {
      if (err) console.log('DELETE_Category error: ' + err);
      if (results) console.log('DELETE_CATEGORY complete');
    })
  });

//PUT category (Update the category of a single transaction)
router.route('/transactions/update/:transId')
  .put((req, res) => {
    console.log("This is the body of the update/put request: " + req.body);
    database.query(`CALL CategorizeSingleTransaction(${req.params.transId},'${req.body}')`, (err, results) => {
      if (err) console.log('PUT_TransactionCategory error:' + err);
      if (results) console.log('PUT_TransactionCategory complete');
    })
  });

module.exports = router;
