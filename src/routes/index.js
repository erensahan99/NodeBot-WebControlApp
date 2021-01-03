var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ŞAHAN Company' });
});

router.get('/spot-nano',function(req,res,next){
  res.render('spot-nano');
});

router.get('/spot-kontrol',function(req,res,next){
  res.render('spot-kontrol');
});

router.get('/robot-arm',function(req,res,next){
  res.render('robot-arm');
});

router.get('/rc-arac',function(req,res,next){
  res.render('rc-arac');
});

module.exports = router;
