var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('start', {});
});

router.get('/play', function(req, res, next) { 
  res.render('play', {});
});


router.get('/info', function(req, res, next) { 
  res.render('info', {});
});

router.get('/check', function(req, res, next) { 
  res.render('check', {});
});

router.get('/thankyou', function(req, res, next) {
  res.render('thankyou', {});
});



router.get('/react', function(req, res, next) {
  res.render('react', );
});

module.exports = router;
