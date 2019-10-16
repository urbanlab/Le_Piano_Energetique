var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var adminRouter = require("./routes/admin");
var usersRouter = require('./routes/users');

var ProgressBar = require('progressbar.js')
var app = express();
var server = require('http').Server(app);

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
app.use('/admin', adminRouter);
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
 * DATA HANDLING
 */

var heaterValue = 0.0;
var fridgePerformance = 0;
var isThermostat = false;
var isEcoMousseurs = false;
var isEcoMousseurCuisine = false;
var isFridgeCleaned = false;
var isPotCovered = false;
var isLedBulbs = false;


function getHeaterPercent(){
  // 17 to 23 degrees * 3.7 %
  return heaterValue * 3.7;
}


/**
 * ARDUINO FIRMATA
 * 
 * 
 */

// const Serialport = require("serialport");
// const Firmata = require("firmata");
// const board = new Firmata(new Serialport(path="/dev/cu.usbmodem14201"));

// board.on("ready", () => {
//   console.log("arduino ready");
// })

// var five = require("johnny-five"),
//     board = new five.Board();

// board.on("ready",function(){
//   console.log("johnny ringo!");
  // const strobe = new five.Pin(2);
  
  // ["high", "low"].forEach(function(state) {
  //   strobe.on(state, function() {
  //     if (events.indexOf(state) === -1) {
  //       console.log("Event emitted for:", state, "on", this.addr);
  //       events.push(state);
  //     }
  //   });
  // });

  // strobe.query(function(state) {
  //   console.log(state);
  // });

//   potentiometer = new five.Sensor({
//     pin: "A0",
//     freq: 250
//   });

//   // Inject the `sensor` hardware into
//   // the Repl instance's context;
//   // allows direct command line access
//   board.repl.inject({
//     pot: potentiometer
//   });

//   // "data" get the current reading from the potentiometer
//   potentiometer.on("data", function() {
//     if (parseInt(this.value) != fridgePerformance){
//       fridgePerformance = this.value;
//       console.log(this.value);
//       console.log(typeof value)
//     }
//   });
// });


/**
 * WEB SOCKETS
 * 
 * Real Time communications between server and client
 * 
 * 
 */

// Loading socket.io
var io = require('socket.io')(server);
server.listen(80);

// When a client connects, we note it in the console
io.on('connection', function (socket) {
  console.log('CLIENT CONNECTED!');
  socket.emit('test index', "rien");
  socket.on('admin', function (data) {
    console.log("admin value", data);
    socket.broadcast.emit('display', data);
  });
});

module.exports = app;
