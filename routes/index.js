var express = require('express');
var router = express.Router();

// obtener la pagina principal
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
