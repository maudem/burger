//this might not be right, please check
var connection = require('./connection.js');


//building mySQL syntax for queries
function printQuestionMarks(num){
    var arr = [];

    for (var i=0; i<num; i++){
        arr.push('?')
        };
    return arr.toString();
};

function objToSql(ob){
    var arr = [];
    
    for (var key in ob) {
        if (ob.hasOwnProperty(key)) {

            arr.push(key + '=' + ob[key]);
            }
        }    

        return arr.toString();
    };

//build orm to perform queries
var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = 'SELECT * FROM ' + tableInput;

        connection.query(queryString, function(err, result){
            if (err) throw err;
            console.log(result)
            cb(result);
        });
     },

     updateOne: function(table, objColVals, condition, cb){
        var queryString = 'UPDATE ' + table;

        queryString += ' SET ';
		queryString += objToSql(objColVals);
		queryString += ' WHERE ';
		queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result){
            if(err) throw err;
            cb(result);
        });
     },

     insertOne: function(table, col, vals, cb){
         var queryString = 'INSERT INTO ' + table;
        queryString += ' (';
		queryString += col.toString(); 
		queryString += ') ';
		queryString += 'VALUES (';
		queryString += printQuestionMarks(vals.length);
		queryString += ') ';

        connection.query(queryString, vals, function(err, result){
            if (err) {
                throw err;
            }

            cb(result);
            
        });
   }
 };

module.exports = orm;