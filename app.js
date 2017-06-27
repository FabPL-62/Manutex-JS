// se obtienen todas las librerias para el funcionamiento de la aplicacion
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');

// se cargan los controladores
var index = require('./routes/index');
var socia = require('./routes/socia');
var evento = require('./routes/evento');
var maquina = require('./routes/maquina');
var notificacion = require('./routes/notificacion');
var transaccion = require('./routes/transaccion');

// se inicia la aplicacion
var app = express();

// se obtienen las vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// configuracion de la sesión
app.use(session({
  secret: 'uc8u2b17dn2innim183n',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true
  }
}));

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public','less'),{
	dest: path.join(__dirname, 'public'),
  preprocess: {
    path: function(pathname, req) {
      return pathname.replace(path.sep + 'stylesheets' + path.sep, path.sep);
    }
  },
	force: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// referencia al archivo de controladores
app.use('/', index);
app.use('/socia', socia);
app.use('/evento', evento);
app.use('/maquina', maquina);
app.use('/notificacion', notificacion);
app.use('/transaccion', transaccion);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
