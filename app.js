const express = require('express');
const app = express();
const port = 3000;
var expressLayouts = require('express-ejs-layouts');

var path = require('path');



const homes = require('./routes/route.js');
//헤더푸터 고정을 위한 ejs layout
app.use(expressLayouts); 
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
//미들웨어
app.use('/', homes); 

app.set('views' , __dirname + "/views");
app.set('view engine', 'ejs');
app.set('layout','layout');
app.set('layout extractScripts',true);



app.use(express.static(__dirname + "/public"));
app.set('views', path.join(__dirname, 'views'));

module.exports = app;









