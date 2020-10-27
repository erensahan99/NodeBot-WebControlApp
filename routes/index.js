var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ŞAHAN Company' });
});

router.get('/robotarm',function(req,res,next){
  res.render('robot-arm');
});


module.exports = router;
