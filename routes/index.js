// var ip = req.connection.localAddress.split(":").pop().toString();
// var port = req.connection.localPort.toString();

var express = require('express');
var router = express.Router();

// se obtiene la conexion
var connect = require('../connection');

// obtener la pagina principal
router.get('/', function(req,res,next) {

  // se verifica que la sesion exista
  if (req.session.rut) {

  } else {
    res.render('index',{
      title: "Inicio de Sesión"
    });
  }

});

router.post('/login', function(req,res,next) {
  // se realiza la query
  connect.query([
    
   `select rut_socia, nom_socia from socia
    where rut_socia like ":filter%"`,{

    filter: 1

  }],function(error, rows){

    if (error) res.send(error);
    res.send(rows);

  });
});

router.post('/logout', function(req,res,next){
  req.session.destroy(function(error){
    if(error) {
      console.log(error);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
