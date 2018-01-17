var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/react', function(req, res, next) {
  res.render('react', { title: 'Express' });
});

module.exports = router;
