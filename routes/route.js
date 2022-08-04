const { json } = require('express');
const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const router = express.Router();


const {check, validationResult} = require('express-validator');




router.use(expressLayouts);

//메인page
router.get('/', (req,res) => {
    res.render('main');
});

//그린씽안내 
//그린씽이란page
router.get('/about', (req,res) => {
  res.render('guide_about.ejs');
});
//이용안내page
router.get('/guide1', (req,res) => {
  res.render('guide_useGuide.ejs');
});
//이용방법page
router.get('/guide2', (req,res) => {
  res.render('guide_useHow.ejs');
});
//의무&책임page
router.get('/duty', (req,res) => {
  res.render('guide_duty.ejs');
});

//고객센터
router.get('/notice', (req,res) => {
  res.render('service_notice.ejs');
});





module.exports = router;