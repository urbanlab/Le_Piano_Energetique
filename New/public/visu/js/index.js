// let socket = io("192.168.81.27:3000");
let socket = io();
let currentState = {
  onOffWater: 0,
  onOffHeater: 0,
  onOffLeds: 0,
  onOffFridge: 0,
  onOffHeater: 0,
  valueHeater: 0,
  valueFridge: 0,
  touchWater: 0,
  touchLid: 0,
};
var arduinoData = [
  { name: "inter1", val: 0 },
  { name: "inter2", val: 0 },
  { name: "inter3", val: 0 },
  { name: "inter4", val: 0 },
  { name: "inter5", val: 0 },
  { name: "sensor1", val: 0 },
  { name: "sensor2", val: 0 },
  { name: "touch1", val: 0 },
  { name: "touch2", val: 0 },
];
// When data is 'recieved' do something
socket.on("data", function (val) {
  console.log(val);
});

// socket.on("inter1", function (val) {
//   console.log("inter1 : " + val);
// });
// socket.on("inter2", function (val) {
//   console.log("inter2 : " + val);
// });
// socket.on("inter3", function (val) {
//   console.log("inter3 : " + val);
// });
// socket.on("inter4", function (val) {
//   console.log("inter4 : " + val);
// });
// socket.on("inter5", function (val) {
//   console.log("inter5 : " + val);
// });
// socket.on("A0", function (val) {
//   console.log("A0 : " + val);
// });
// socket.on("A1", function (val) {
//   console.log("A1 : " + val);
// });

runPlantAnimation(3);
runRiverAnimation(1, 3, true);

var backgroundElement = document.getElementById("background");
(localImageArray = ["1.png", "2.png", "3.png", "4.png", "5.png"]), (localBase = "/visu/assets/backgrounds/");
secs = 5;
localImageArray.forEach(function (img) {
  new Image().src = localBase + img;
  // caches images, avoiding white flash between background replacements
});

function backgroundSequence() {
  window.clearTimeout();
  var k = 0;
  for (i = 0; i < localImageArray.length; i++) {
    setTimeout(function () {
      // document.documentElement.style.background = "url(" + base + bgImageArray[k] + ") no-repeat center center fixed";
      backgroundElement.style.background = "url(" + localBase + localImageArray[k] + " ) no-repeat center center fixed";
      backgroundElement.style.backgroundSize = "contain";
      if (k + 1 === localImageArray.length) {
        setTimeout(function () {
          backgroundSequence();
        }, secs * 1000);
      } else {
        k++;
      }
    }, secs * 1000 * i);
  }
}

var lastBackground = 1;
function changeBackground(index) {
  lastBackground = index;
  window.clearTimeout();
  backgroundElement.style.background = "url(" + localBase + localImageArray[index - 1] + ") no-repeat center center fixed";
  backgroundElement.style.backgroundSize = "cover";
}

backgroundSequence();
