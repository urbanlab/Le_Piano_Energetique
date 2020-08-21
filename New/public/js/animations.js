function runAnimation(fileName) {
  bodymovin.loadAnimation({
    container: document.getElementById(fileName + "Container"),
    renderer: "svg",
    loop: true,
    autoplay: true,

    path: "assets/" + fileName + ".json",
  });
}

function runPlantAnimation(number) {
  bodymovin.loadAnimation({
    container: document.getElementById("plantContainer"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/plant/etat" + number + ".json",
  });
}

function runRiverAnimation(beginState, endState, reverse = false) {
  var anim = bodymovin.loadAnimation({
    container: document.getElementById("riverContainer"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "assets/river/etat" + beginState + "-vers-etat" + endState + ".json",
  });
  anim.setDirection(reverse ? -1 : 1);
  anim.play();
}

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
