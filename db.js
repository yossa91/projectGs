const mysql = require('mysql');

const connection = mysql.createConnection({
    host : "us-cdbr-east-06.cleardb.net",
    user : "be7342d389b5aa",
    password : "62704406",
    port : "3306",
    database : "heroku_5a4ff79311f0094",
    dateStrings : 'date'
})

//페이지 리스트
exports.getAllList = function(callback){
    connection.query('SELECT * FROM notice ORDER BY no DESC;',(err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}
 //리딩
 exports.page = function(no, callback){
    connection.query(`SELECT * FROM notice WHERE no=?`,[no],(err, result) => {
        if(err) {
            throw err;}
        callback(result);
    });
 }


