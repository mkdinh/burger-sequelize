// 2. Create a `connection.js` file inside `config` directory.

//    * Inside the `connection.js` file, setup the code to connect Node to MySQL.

//    * Export the connection.

var mysql  = require('mysql');
var connection;

if(process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'dinh0824',
        database: 'burgers_db'
    });
};

connection.connect(function(err){
    if(err) throw err;
    console.log('Connect to database with id:',connection.threadId)
});

module.exports = connection;