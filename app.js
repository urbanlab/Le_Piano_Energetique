var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var ProgressBar = require('progressbar.js')
// const Firmata = require("firmata");
// const board = new Firmata("systemName");

var app = express();
var server = require('http').Server(app);
// var server = require('http').createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

/**
 * WEB SOCKETS
 * 
 * Real Time communications between server and client
 * 
 */

// Loading socket.io
var io = require('socket.io')(server);
server.listen(80);

// When a client connects, we note it in the console
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  console.log('CLIENT CONNECTED!');
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

module.exports = app;

// server.listen(8080);
