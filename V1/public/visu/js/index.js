// let socket = io("192.168.81.27:3000");
let socket = io();

// Durée pendant laquelle l'affichage des économie est présent
const savingsDisplayTime = 10000;

var waterScore = -1;
var elecScore = -1;
var heatScore = -1;
var globalScore = -1;

let currentState = {
  onOffWater: 0,
  onOffHeater: 0,
  onOffLeds: 0,
  onOffFridge: 0,
  onOffOven: 0,

  valueHeater: 0,
  valueFridge: 0,

  touchWater: 0,
  touchLid: 0,
};

var sampleArduinoData = [
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

socket.on("data", function (arduinoData) {
  const newOnOffWater = Math.round(arduinoData[3].val * 100);
  if (currentState.onOffWater != newOnOffWater) {
    currentState.onOffWater = newOnOffWater;
    updateSavingsDisplay("-50%", "consommation d'eau ");
  }
  const newOnOffHeater = Math.round(arduinoData[2].val * 100);
  if (currentState.onOffHeater != newOnOffHeater) {
    currentState.onOffHeater = newOnOffHeater;
    updateSavingsDisplay("28%", "d'économie d'énérgie ");
  }
  const newOnOffLeds = Math.round(arduinoData[0].val * 100);
  if (currentState.onOffLeds != newOnOffLeds) {
    currentState.onOffLeds = newOnOffLeds;
    updateSavingsDisplay("/7", "votre consommation");
  }
  const newOnOffFridge = Math.round(arduinoData[4].val * 100);
  if (currentState.onOffFridge != newOnOffFridge) {
    currentState.onOffFridge = newOnOffFridge;
    updateSavingsDisplay("-30%", "consommation d'énérgie ");
  }
  const newOnOffOven = Math.round(arduinoData[1].val * 100);
  if (currentState.onOffOven != newOnOffOven) {
    currentState.onOffOven = newOnOffOven;
    updateSavingsDisplay("", "Sauf pour les patisseries ;)");
  }
  const newValueHeater = 100 - Math.round(arduinoData[5].val);
  if (currentState.valueHeater != newValueHeater) {
    currentState.valueHeater = newValueHeater;
    updateSavingsDisplay("7%", "d'économie pour 1° en moins ");
  }
  const newValueFridge = 100 - Math.round(arduinoData[6].val);
  if (currentState.valueFridge != newValueFridge) {
    currentState.valueFridge = newValueFridge;
    updateSavingsDisplay("60%", "d'économie sur la classe A+++");
  }
  currentState.touchWater = Math.round(arduinoData[7].val * 100);
  currentState.touchLid = Math.round(arduinoData[8].val * 100);

  processScores();
});

// TOUCH 1
socket.on("touch1", function (value) {
  if (value == 1) {
    runFishAnimation();
    updateSavingsDisplay("/4", "consommation d'eau durant le réglage de la température");
  }
});

// TOUCH 2
socket.on("touch2", function (value) {
  if (value == 1) {
    runLeavesAnimation();
    updateSavingsDisplay("-70%", "d'énergie utilisée pour les liquides");
  }
});

function processScores() {
  newWaterScore = Math.round(currentState.onOffWater);
  newHeatScore = Math.round(currentState.onOffHeater + currentState.valueHeater + currentState.onOffOven) / 3;
  newElecScore = Math.round((currentState.onOffLeds + currentState.onOffFridge + currentState.valueFridge) / 3);
  newGlobalScore = Math.round((currentState.onOffLeds + currentState.onOffFridge + currentState.valueFridge + currentState.onOffWater + currentState.onOffHeater + currentState.onOffOven + currentState.valueHeater) / 7);

  if (newElecScore != elecScore) {
    elecScore = newElecScore;
    console.log("New Electricity Score : ", elecScore);
    choosePlantAnimation();
  }
  if (newGlobalScore != globalScore) {
    globalScore = newGlobalScore;
    console.log("New Global Score : ", globalScore);
    console.log(currentState);
    chooseBackground();
  }
  if (newWaterScore != waterScore) {
    waterScore = newWaterScore;
    console.log("New Water Score : ", waterScore);
    chooseRiverAnimation();
  }
  if (newHeatScore != heatScore) {
    heatScore = newHeatScore;
    console.log("New Heat Score : ", heatScore);
    choosePipelineAnimation();
  }

  displayDebug();
}

function chooseBackground() {
  if (globalScore.between(0, 20, true)) changeBackground(5);
  else if (globalScore.between(20, 40)) changeBackground(4);
  else if (globalScore.between(40, 60, true)) changeBackground(3);
  else if (globalScore.between(60, 80)) changeBackground(2);
  else if (globalScore.between(80, 100, true)) changeBackground(1);
}

function choosePlantAnimation() {
  if (elecScore.between(0, 32, true)) showPlantAnimation(3);
  else if (elecScore.between(32, 70)) showPlantAnimation(2);
  else if (elecScore.between(70, 100, true)) showPlantAnimation(1);
}

function choosePipelineAnimation() {
  if (heatScore.between(0, 32, true)) showPipelineAnimation(3);
  else if (heatScore.between(32, 70)) showPipelineAnimation(2);
  else if (heatScore.between(70, 100, true)) showPipelineAnimation(1);
}

function chooseRiverAnimation() {
  if (waterScore.between(0, 50, true)) showRiverAnimation(1);
  else if (waterScore.between(51, 100, true)) showRiverAnimation(2);
}

// SAVINGS DISPLAY
let savingsTimeOut;
function updateSavingsDisplay(factNumber, description) {
  showSavingsDisplay();
  document.getElementById("savingsFactNumber").innerHTML = factNumber;
  document.getElementById("savingsDescription").innerHTML = description;
  clearTimeout(savingsTimeOut);
  savingsTimeOut = setTimeout(hideSavingsDisplay, savingsDisplayTime);
}

function showSavingsDisplay() {
  fadeIn("savingsContainer");
}

function hideSavingsDisplay() {
  fadeOut("savingsContainer");
}

// DEBUG
function displayDebug() {
  document.getElementById("globalScore").innerHTML = "Score global : " + globalScore;
  document.getElementById("waterScore").innerHTML = "Score eau : " + waterScore;
  document.getElementById("elecScore").innerHTML = "Score électricité : " + elecScore;
  document.getElementById("onOffLeds").innerHTML = "Inter 1 - Leds: " + currentState.onOffLeds;
  document.getElementById("onOffOven").innerHTML = "Inter 2 - Four : " + currentState.onOffOven;
  document.getElementById("onOffHeater").innerHTML = "Inter 3 - Radiateur: " + currentState.onOffHeater;
  document.getElementById("onOffWater").innerHTML = "Inter 4 - Ecomousseur : " + currentState.onOffWater;
  document.getElementById("onOffFridge").innerHTML = "Inter 5 - Frigo dégivrage : " + currentState.onOffFridge;
  document.getElementById("valueHeater").innerHTML = "Pot 1 - Valeur chauffage : " + currentState.valueHeater;
  document.getElementById("valueFridge").innerHTML = "Pot 2 - Valeur frigo : " + currentState.valueFridge;
  document.getElementById("touchWater").innerHTML = "Touch 1 - robinet : " + currentState.touchWater;
  document.getElementById("touchLid").innerHTML = "Touch 2 - couvercle : " + currentState.touchLid;
}

function toggleDebug() {
  if (document.getElementById("debugContainer").classList.contains("hide")) {
    fadeIn("debugContainer");
  } else {
    fadeOut("debugContainer");
  }
}
