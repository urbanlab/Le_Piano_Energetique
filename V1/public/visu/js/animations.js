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

// PIPELINE
function runPipelineAnimation(number) {
  bodymovin.loadAnimation({
    container: document.getElementById("pipelineContainer" + number),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/pipeline/etat" + number + ".json",
  });
}
runPipelineAnimation(1);
runPipelineAnimation(2);
runPipelineAnimation(3);

function showPipelineAnimation(index) {
  let indexes = [1, 2, 3];
  indexes.remove(index);
  indexes.forEach((id) => fadeOut("pipelineContainer" + id));
  fadeIn("pipelineContainer" + index);
}

// RIVER

function runRiverAnimation() {
  bodymovin.loadAnimation({
    container: document.getElementById("riverContainer1"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/river/riviere-mi-pleine.json",
  });
}

function runRiverAnimation2() {
  bodymovin.loadAnimation({
    container: document.getElementById("riverContainer2"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/river/riviere-pleine.json",
  });
}

runRiverAnimation();
runRiverAnimation2();

function showRiverAnimation(index) {
  let indexes = [1, 2];
  indexes.remove(index);
  indexes.forEach((id) => fadeOut("riverContainer" + id));
  fadeIn("riverContainer" + index);
}

var fishAnim;
function initFishAnimation() {
  fishAnim = bodymovin.loadAnimation({
    container: document.getElementById("fishContainer"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "assets/poissons.json",
  });
}
initFishAnimation();

function runFishAnimation() {
  fishAnim.stop();
  fishAnim.play();
}

var leavesAnim;
function initLeavesAnimation() {
  leavesAnim = bodymovin.loadAnimation({
    container: document.getElementById("leavesContainer"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "assets/feuilles.json",
  });
}
initLeavesAnimation();

function runLeavesAnimation() {
  leavesAnim.stop();
  leavesAnim.play();
}
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
  var el = document.getElementById(id);
  el.classList.add("show");
  el.classList.remove("hide");
}

function fadeOut(id) {
  var el = document.getElementById(id);
  el.classList.add("hide");
  el.classList.remove("show");
}
