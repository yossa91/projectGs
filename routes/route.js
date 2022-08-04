const { json } = require('express');
const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const router = express.Router();


const {check, validationResult} = require('express-validator');




router.use(expressLayouts);

//메인page
router.get('/', (req,res) => {
    res.render('main.ejs');
});
//그린씽안내 _ 그린씽이란page
router.get('/about', (req,res) => {
  res.render('about.ejs');
});
//그린씽안내 _ 이용안내page
router.get('/guide1', (req,res) => {
  res.render('useGuide.ejs');
});





module.exports = router;