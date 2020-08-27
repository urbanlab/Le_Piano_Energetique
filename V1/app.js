// Global variables
let http = require("http");
let express = require("express");
let io = require("socket.io");
let five = require("johnny-five");
const open = require("open");
const getos = require("getos");

// Receives data from an arduino and send it to its clients via socket.io
// Arduino board must be connected and have the code 'standardFirmata' uploaded into it

// Create board instance
let board = new five.Board();
// Create app instance
let app = new express();

// Set the port number
let port = 3000;

var arduinoData = [
  { name: "inter1", val: 0 },
  { name: "inter2", val: 0 },
  { name: "inter3", val: 0 },
  { name: "inter4", val: 0 },
  { name: "inter5", val: 0 },
  { name: "pot1", val: 0 },
  { name: "pot2", val: 0 },
  { name: "touch1", val: 0 },
  { name: "touch2", val: 0 }
];
var telecoData = [];
var telecoConnected = false;

// Set the app instance to read the public directory
// Will find index.html
// app.use(express.static(__dirname + "/public"));

app.use("/player", express.static(__dirname + "/public/player"));
app.use("/teleco", express.static(__dirname + "/public/teleco"));
app.use("/visu", express.static(__dirname + "/public/visu"));

// board.on
board.on("ready", function () {
  // Connection message in the console
  console.log("ARDUINO BOARD READY STATE: TRUE");

  var inter1 = new five.Pin(3);
  inter1.read(function (error, value) {
    arduinoData[0].val = value;
  });

  var inter2 = new five.Pin(4);
  inter2.read(function (error, value) {
    arduinoData[1].val = value;
  });

  var inter3 = new five.Pin(5);
  inter3.read(function (error, value) {
    arduinoData[2].val = value;
  });

  var inter4 = new five.Pin(6);
  inter4.read(function (error, value) {
    arduinoData[3].val = value;
  });

  var inter5 = new five.Pin(7);
  inter5.read(function (error, value) {
    arduinoData[4].val = value;
  });

  var pot1 = new five.Sensor("A0");
  pot1.on("change", function () {
    arduinoData[5].val = this.scaleTo(0, 100);
  });

  var pot2 = new five.Sensor("A8");
  pot2.on("change", function () {
    arduinoData[6].val = this.scaleTo(0, 100);
  });

  var touch1 = new five.Pin(8);
  touch1.read(function (error, value) {
    arduinoData[7].val = value;
  });
  touch1.on("high", function () {
    io.emit("touch1", 1);
  });
  touch1.on("low", function () {
    io.emit("touch1", 0);
  });

  var touch2 = new five.Pin(9);
  touch2.read(function (error, value) {
    arduinoData[8].val = value;
  });
  touch2.on("high", function () {
    io.emit("touch2", 1);
  });
  touch2.on("low", function () {
    io.emit("touch2", 0);
  });
});

setInterval(() => {
  if (telecoConnected == true) {
    io.emit("data", telecoData);
  } else {
    io.emit("data", arduinoData);
  }
}, 50);

// Begin 'listening' on the pre defined port number (3000)
const server = http.createServer(app).listen(port, function (req, res) {
  console.log("LISTENING ON PORT " + port);

  getos(async function (e, os) {
    if (e) return console.log(e);
    const osName = os.os;
    console.log("YOUR OS : " + osName);
    // darwin = mac os
    if (osName == "darwin") {
      await open("http://localhost:3000/teleco", { app: ["google chrome", "--autoplay-policy=no-user-gesture-required", "--start-fullscreen"] });
      await open("http://localhost:3000/player", { app: ["google chrome", "--autoplay-policy=no-user-gesture-required", "--start-fullscreen"] });
      await open("http://localhost:3000/visu", { app: ["google chrome", "--autoplay-policy=no-user-gesture-required", "--start-fullscreen"] });
    } else {
      open("http://localhost:3000/player", {
        app: ["google-chrome", "--kiosk", "--autoplay-policy=no-user-gesture-required", "--start-fullscreen", "--password-store=basic", "http://localhost:3000/visu"],
      });
      // .then(() => {
      //   open("http://localhost:3000/visu", { app: ["google-chrome", "--kiosk", "--autoplay-policy=no-user-gesture-required", "--start-fullscreen", "--password-store=basic"] });
      // });
    }
  });
});

// Set up socket.io to 'listen'
io = io.listen(server);

// Display a conection message
io.on("connection", function (socket) {
  console.log("SOCKET.IO CONNECTED");

  // Display a disconnection message
  socket.on("disconnect", function () {
    console.log("SOCKET.IO DISCONNECTED");
  });

  // TELECO
  socket.on("dataTeleco", function (data) {
    telecoConnected = true;
    telecoData = data;
  });

  socket.on("touch1", function (data) {
    io.emit("touch1", data);
  });
  socket.on("touch2", function (data) {
    io.emit("touch2", data);
  });
});
