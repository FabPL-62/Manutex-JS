var express = require('express');
var router = express.Router();

// se obtiene la conexion
var connect = require('../connection');

// obtener la pagina principal
router.get('/', function(req, res, next) {

  // se realiza la query
  connect.query(
    
   `select rut_socia as Rut, 
    concat(nom_socia,' ',apP_socia,' ',apM_socia) as Nombre 
    from socia`,

  function(error, rows){

    if (error) res.send(error);
    res.send(rows);

  });

});

module.exports = router;