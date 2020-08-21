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
    path: "assets/usine/etat" + number + ".json",
  });
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
