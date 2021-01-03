var express = require('express');
var router = express.Router();

var index = require('../controllers/index');
var robotControl = require('../controllers/index');

/* GET home page. */
router.get('/', index.index);

router.get('/robot-control', index.robotControl);

module.exports = router;
