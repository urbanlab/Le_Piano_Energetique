let socket = io("192.168.81.27:3000");

let defaultState = {
  inter1: 0,
  inter2: 0,
  inter3: 0,
  inter4: 0,
  inter5: 0,
  pot1: 0,
  pot2: 0,
};
// When data is 'recieved' do something
// socket.on("data", function (val) {
//   console.log(val);
// });

socket.on("inter1", function (val) {
  console.log("inter1 : " + val);
});
socket.on("inter2", function (val) {
  console.log("inter2 : " + val);
});

runPlantAnimation(3);
// runAnimation("rocket")

runRiverAnimation(1, 3, true);

var backgroundElement = document.getElementById("background");
(localImageArray = ["1.png", "2.png", "3.png", "4.png", "5.png"]), (localBase = "/assets/backgrounds/");
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
      backgroundElement.style.background = "url(" + localBase + localImageArray[k] + "no-repeat center center fixed";
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
// runAnimation("rocket");
// runAnimation("tick");
// runAnimation("world");
// // runAnimation("hills");

fadeIn("rocketContainer");
// fadeOut("tickContainer");
// fadeOut("worldContainer");
// fadeIn("unicornContainer");
// fadeOut("hillsContainer");
