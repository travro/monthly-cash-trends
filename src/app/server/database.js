const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password:'Colebrook8488',
    database: 'transactions'
});


connection.connect((err) => {
    if(err) {
        console.log('Error at connection: \n' + err.stack);
        return;
    }
    console.log('Connection at : ' + connection.threadId + ' successful');
});


module.exports = connection;