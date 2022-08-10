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
//공지사항 검색
router.post('/search',(req, res) =>{
  let errs = validationResult(req);
  let param = JSON.parse(JSON.stringify(req.body));
  var seachbox = param['searchOp'];
  let searchText = param['searchTx'];
    if(errs['errors'].length > 0){
    db.update_process(no, (row) => {
      res.render('service_notice.ejs', {row : row[0], errs : errs['errors']} );
    });
  }else{
    db.search_process(seachbox, searchText, (rows) => {
      res.render('service_notice.ejs', { rows : rows });
    });
  }
});
//공지사항 list page
router.get('/notice', (req,res) => {
  db.getAllList((rows) => {
      res.render('service_notice.ejs', { rows : rows });
    }
  );
});
//공지사항 create page
router.get('/create', (req,res) => {
  res.render('service_notice_create.ejs');
});
router.post('/new', check('title').isLength({min:1 , max:100}),
  function(req,res, next){
    let errs = validationResult(req);
    console.log(errs);
    if(errs['errors'].length > 0){
      res.render('Seomun_notice',{errs : errs['errors']});
    }else{
      let param = JSON.parse(JSON.stringify(req.body));
      let title = param['title'];
      let description = param['content'];
      db.create(title, description, function(){
        res.redirect('/notice');
      });
    }
  });

//공지사항 list description page
router.get('/notice/:no', (req,res) => {
  var no = req.params.no;
  db.page(no, (result) => {
      res.render('service_notice_desc.ejs', { result : result });
    }
  );
});
//공지사항 list update page
router.get('/update/:no', (req,res) =>{
  var no = req.params.no;
  db.update(no, (row) => {
    if(typeof no === 'undefined' || row.length <= 0){
      res.status(404).json({error : 'undefined memo'});
    }else{
      res.render('service_notice_udate.ejs',{row});
    }
  });
});
//공지사항 글수정 저장
router.post('/update/:no', [check('title').isByteLength({min:1 , max:300})],(req, res) =>{
  let errs = validationResult(req);
  let param = JSON.parse(JSON.stringify(req.body));
  var no = req.params.no;
  let title = param['title'];
  let description = param['content'];
  if(errs['errors'].length > 0){
    db.update_process(no, (row) => {
      res.render('service_notice_udate.ejs', {row : row[0], errs : errs['errors']} );
    });
  }else{
    db.update_process(no, title, description, () => {
      res.redirect('/notice');
    });
  }
});
//공지사항 글삭제
router.get('/delete/:no', (req, res) => {
  var no = req.params.no;
  db.remove(no, () => {
    res.redirect('/notice');
  });
});

//Qna page
router.get('/qna', (req,res) => {
  res.render('service_qna.ejs');
});






module.exports = router;