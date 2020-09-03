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
    if (newOnOffWater == 100) updateSavingsDisplay(data.inter4.positive, true);
    else updateSavingsDisplay(data.inter4.negative, false);
  }
  const newOnOffHeater = Math.round(arduinoData[2].val * 100);
  if (currentState.onOffHeater != newOnOffHeater) {
    currentState.onOffHeater = newOnOffHeater;
    if (newOnOffHeater == 100) updateSavingsDisplay(data.inter3.positive, true);
    else updateSavingsDisplay(data.inter3.negative, false);
  }
  const newOnOffLeds = Math.round(arduinoData[0].val * 100);
  if (currentState.onOffLeds != newOnOffLeds) {
    currentState.onOffLeds = newOnOffLeds;
    if (newOnOffLeds == 100) updateSavingsDisplay(data.inter1.positive, true);
    else updateSavingsDisplay(data.inter1.negative, false);
  }
  const newOnOffFridge = Math.round(arduinoData[4].val * 100);
  if (currentState.onOffFridge != newOnOffFridge) {
    currentState.onOffFridge = newOnOffFridge;
    if (newOnOffFridge == 100) updateSavingsDisplay(data.inter5.positive, true);
    else updateSavingsDisplay(data.inter5.negative, false);
  }
  const newOnOffOven = Math.round(arduinoData[1].val * 100);
  if (currentState.onOffOven != newOnOffOven) {
    currentState.onOffOven = newOnOffOven;
    if (newOnOffOven == 100) updateSavingsDisplay(data.inter2.positive, true);
    else updateSavingsDisplay(data.inter2.negative, false);
  }
  const newValueHeater = 100 - Math.round(arduinoData[5].val);
  if (Math.abs(currentState.valueHeater - newValueHeater) > 5) {
    if (newValueHeater - currentState.valueHeater > 0) updateSavingsDisplay(data.sensor1.positive, true);
    else updateSavingsDisplay(data.sensor1.negative, false);
    currentState.valueHeater = newValueHeater;
  }
  const newValueFridge = 100 - Math.round(arduinoData[6].val);
  if (Math.abs(currentState.valueFridge - newValueFridge) > 5) {
    if (newValueFridge - currentState.valueFridge > 0) updateSavingsDisplay(data.sensor2.positive, true);
    else updateSavingsDisplay(data.sensor2.negative, false);
    currentState.valueFridge = newValueFridge;
  }
  currentState.touchWater = Math.round(arduinoData[7].val * 100);
  currentState.touchLid = Math.round(arduinoData[8].val * 100);

  processScores();
});

// TOUCH 1
socket.on("touch1", function (value) {
  if (value == 1) {
    runFishAnimation();
    updateSavingsDisplay(data.touch1, true);
  }
});

// TOUCH 2
socket.on("touch2", function (value) {
  if (value == 1) {
    runLeavesAnimation();
    updateSavingsDisplay(data.touch2, true);
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
function updateSavingsDisplay(data, isPositiveAction) {
  showSavingsDisplay();
  document.getElementById("savingsTitle").innerHTML = data.title;
  document.getElementById("savingsFactNumber").innerHTML = data.number;
  document.getElementById("savingsDescription").innerHTML = data.description;

  isPositiveAction ? (document.getElementById("savingsContainer").style.backgroundColor = "#006837CC") : (document.getElementById("savingsContainer").style.backgroundColor = "#ed1c24CC");

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
