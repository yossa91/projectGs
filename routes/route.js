const { json } = require('express');
const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const router = express.Router();


const {check, validationResult} = require('express-validator');
const db = require("./../db.js");



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
//공지사항 list page
router.get('/notice', (req,res) => {
  db.getAllList((rows) => {
      res.render('service_notice', { rows : rows });
    }
  );
});
//공지사항 list description page
router.get('/notice/:no', (req,res) => {
  var no = req.params.no;
  db.page(no, (result) => {
      res.render('service_notice_desc', { result : result });
    }
  );
});



module.exports = router;