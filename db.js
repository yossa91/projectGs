const mysql = require('mysql');

const connection = mysql.createConnection({
    host : "us-cdbr-east-06.cleardb.net",
    user : "be7342d389b5aa",
    password : "62704406",
    port : "3306",
    database : "heroku_5a4ff79311f0094",
    dateStrings : 'date'
})

//검색
exports.search_process = function(seachbox, searchText, callback){
    if(seachbox == 'noticeSub'){
        connection.query(`SELECT * FROM notice WHERE description LIKE "%${searchText}%" ORDER BY no DESC;`,(err, rows, fields) => {
            if(err) throw err;
            callback(rows);
        });
    }else if(seachbox == 'noticeTitle'){
        connection.query(`SELECT * FROM notice WHERE title LIKE "%${searchText}%" ORDER BY no DESC;`,(err, rows, fields) => {
            if(err) throw err;
            callback(rows);
        });
    }else if(seachbox == '' || seachbox == undefined || seachbox == null){
        connection.query(`SELECT * FROM notice WHERE title || description LIKE "%${searchText}%" ORDER BY no DESC;`,(err, rows, fields) => {
            if(err) throw err;
            callback(rows);
        }); 
    }
}

//페이지 리스트
exports.getAllList = function(callback){
    connection.query('SELECT * FROM notice ORDER BY no DESC;',(err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}
//새글작성
exports.create = function(title, description, callback){
    connection.query(`INSERT INTO notice(title,description,day,hit) VALUES('${title}','${description}',now(),0)`, (err, result) => {
        if(err) throw err;
        callback();
    });
 }
 //리딩
 exports.page = function(no, callback){
    connection.query(`UPDATE notice set hit=hit+1 WHERE no = ${no}`,(err, result) => {
        connection.query(`SELECT * FROM notice WHERE no=?`,[no],(err, result) => {
            if(err) {
                throw err;}
            callback(result);
        });
    });
 }
 //수정
 exports.update = function(no, callback){
    connection.query(`SELECT * FROM notice WHERE no=?`,[no],(err, row, fields) => {
        if(err) {
            throw err;}
        callback(row);
    });
 }
 //수정후 저장(sql update)
 exports.update_process = function(no, title, description, callback){
    connection.query(`UPDATE notice set title = "${title}", description = "${description}" WHERE no = ${no}`, (err, result) => {
        if(err) throw err;
        callback();
    });
 }
 //글삭제
 exports.remove = function(no, callback){
    connection.query(`DELETE FROM notice WHERE no = ${no}`,(err) => {
        if(err) throw err;
        callback();
    });
 };



