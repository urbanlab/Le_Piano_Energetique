// Global variables
let http = require('http');
let express = require('express');
let io = require('socket.io');
let five = require("johnny-five");

// Create board instance
let board = new five.Board();
// Create app instance
let app = new express();

// Set the port number
let port = 3000;


var arduinoData = [
  { name: 'inter1', val:0  },
  { name: 'inter2', val:0  },
  { name: 'inter3', val:0  },
  { name: 'inter4', val:0  },
  { name: 'inter5', val:0  },
  { name: 'sensor1', val:0  },
  { name: 'sensor2', val:0  }
];


// Set the app instance to read the public directory
// Will find index.html
app.use(express.static(__dirname + '/player'));

// board.on
board.on("ready", function() {
  // Connection message in the console
  console.log('ARDUINO BOARD READY STATE: TRUE');

  const led = new five.Led(13);
  led.blink(1000);

  // // Create a sensor instance
  // var sensor = new five.Sensor("A0");
  //
  // //On change
  // sensor.on("change", function() {
  //   io.emit('data', this.value);
  // });

  var inter1 = new five.Pin(3);
  inter1.read(function(error, value) { arduinoData[0].val = value; });
  var inter2 = new five.Pin(4);
  inter2.read(function(error, value) { arduinoData[1].val = value; });
  var inter3 = new five.Pin(5);
  inter3.read(function(error, value) { arduinoData[2].val = value; });
  var inter4 = new five.Pin(6);
  inter4.read(function(error, value) { arduinoData[3].val = value; });
  var inter5 = new five.Pin(7);
  inter5.read(function(error, value) { arduinoData[4].val = value; });

  var pot1 = new five.Sensor("A0");
  pot1.on("change", function() { arduinoData[5].val = this.value; });
  var pot2 = new five.Sensor("A1");
  pot2.on("change", function() { arduinoData[6].val = this.value; });

  setInterval(() => {
    console.log(arduinoData);
    io.emit('data', arduinoData);
  }, 500);

});


// Begin 'listening' on the pre defined port number (3000)
const server = http.createServer(app).listen(port, function(req, res){
  console.log('LISTENING ON PORT ' + port);
});

// Set up socket.io to 'listen'
io = io.listen(server);

// Display a conection message
io.on('connection', function(socket){
  console.log('SOCKET.IO CONNECTED');

  // Display a disconnection message
  socket.on('disconnect', function(){
    console.log('SOCKET.IO DISCONNECTED');
  })
});
