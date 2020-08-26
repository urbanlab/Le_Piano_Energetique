function runAnimation(fileName) {
  bodymovin.loadAnimation({
    container: document.getElementById(fileName + "Container"),
    renderer: "svg",
    loop: true,
    autoplay: true,

    path: "assets/" + fileName + ".json",
  });
}

// PLANT

function runPlantAnimation(number) {
  bodymovin.loadAnimation({
    container: document.getElementById("plantContainer" + number),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/plant/etat" + number + ".json",
  });
}
runPlantAnimation(1);
runPlantAnimation(2);
runPlantAnimation(3);

function showPlantAnimation(index) {
  let indexes = [1, 2, 3];
  indexes.remove(index);
  indexes.forEach((id) => fadeOut("plantContainer" + id));
  fadeIn("plantContainer" + index);
}

// RIVER
var riverAnimation;
var lastState = 1;

// function initRiverAnimation() {
//   riverAnimation = bodymovin.loadAnimation({
//     container: document.getElementById("riverContainer"),
//     renderer: "svg",
//     loop: false,
//     autoplay: false,
//     path: "assets/river/etat" + 1 + "-vers-etat" + 3 + ".json",
//   });
// }
// initRiverAnimation();

function runRiverAnimation(beginState, endState, reverse = false) {
  if (riverAnimation !== undefined) {
    riverAnimation.destroy();
  }
  console.log("running river anim : ", beginState, "vers", endState);
  riverAnimation = bodymovin.loadAnimation({
    container: document.getElementById("riverContainer"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "assets/river/etat" + beginState + "-vers-etat" + endState + ".json",
  });
  riverAnimation.path = "assets/river/etat" + beginState + "-vers-etat" + endState + ".json";
  riverAnimation.setDirection(reverse ? -1 : 1);
  riverAnimation.play();
  lastState = endState;
}

// function showRiverAnimation(state) {
//   runRiverAnimation(lastState, state, lastState < state);
// }

// BACKGROUND

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

var lastBackground = -1;
function changeBackground(index) {
  if (lastBackground != index) {
    console.log("showing background : ", index + 1);
    lastBackground = index;
    window.clearTimeout();
    backgroundElement.style.background = "url(" + localBase + localImageArray[index] + " ) no-repeat center center fixed";
    backgroundElement.style.backgroundSize = "contain";
  }
}

// TRANSITIONS

function fadeIn(id) {
  console.log("fade in : ", id);
  var el = document.getElementById(id);
  el.classList.add("show");
  el.classList.remove("hide");
}

function fadeOut(id) {
  console.log("fade out : ", id);
  var el = document.getElementById(id);
  el.classList.add("hide");
  el.classList.remove("show");
}
