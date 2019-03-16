const express = require('express');
//const chalk = require('chalk');
//const debug = require('debug')('app');
const router = require('./router');
//everything works through app
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", ["DELETE", "PUT"]);

  next();
});
app.use('/', router);
app.listen(3500, () => console.log("listening on 3500"));

