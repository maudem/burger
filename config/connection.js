//mySQL connection
var mysql = require('mysql');
var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: 'Poofey01!',
        database: 'burgers_db'
    });
};

//make a connection
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connect as id " + connection.threadId);
});

//Export connection 
module.exports = connection;