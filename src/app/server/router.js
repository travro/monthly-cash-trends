const router = require('express').Router();
const database = require('./database');
const bodyParser = require('body-parser');

router.use(bodyParser.text());

//Node Express routing for MySQL stored procedures

//Get Budget
router
  .route('/budget')
  .get((req, res) => {
    database
      .query('SELECT * FROM budget2019', (err, results, fields) => {
        if (err) console.log('GET all trans error: ' + err);
        res.send(results);
      })
  });

//GET transactions
router
  .route('/transactions')
  .get((req, res) => {
    database.query(`CALL GetAllTransactions()`, (err, results, fields) => {
      if (err) console.log('GET all trans error: ' + err);
      res.send(results[0]);
    })
  });

//GET categories
router
  .route('/categories')
  .get((req, res) => {
    database.query('CALL GetAllCategories()', (err, results) => {
      if (err) console.log('GET_Categories error: ' + err);
      res.send(results[0]);
    })
  });

//POST category : my-sql plugin result does not include row, hence second query to return the category
router
  .route('/categories/insert/:newCat')
  .post((req, res) => {
    database.query(`CALL InsertCategoryWithBudget('${req.body}')`, (err, result) => {
      if (err) console.log('POST_Category error: ' + err);
      if (result.affectedRows) {
        database.query(`select * from categories where category = '${req.body}'`, (err, result) => {
          if (result) res.send(result[0]);
          if (err) console.log(err);
        })
      }
    })
  });

//DELETE category
router
  .route('/categories/delete/:id')
  .delete((req, res) => {
    console.log("This is the body of the delete request: " + JSON.stringify(req.params.id));
    database.query(`CALL DeleteCategoryWithBudget(${req.params.id})`, (err, result) => {
      if (err) console.log('DELETE_Category error: ' + err);
      if (result)res.send(result);
    })
  });

//PUT transaction: Update the category of a single transaction
router
  .route('/transactions/update-one/:transId')
  .put((req, res) => {
    console.log("This is the body of the update/put request: " + req.body);
    database.query(`CALL CategorizeSingleTransaction(${req.params.transId},'${req.body}')`, (err, result) => {
      if (err) console.log('PUT_SingleTransactionCategory error:' + err);
    })
  });

//PUT transaction: Update the category of multiple transactions
router
  .route('/transactions/update-all/:transId')
  .put((req, res) => {
    console.log("This is the body of the update/put request: " + req.body);
    database.query(`CALL CategorizeMultipleTransactions(${req.params.transId},'${req.body}')`, (err, results) => {
      if (err) console.log('PUT_MultipleTransactionCategory error:' + err);
    })
  });

module.exports = router;
