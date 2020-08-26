// let socket = io("192.168.81.27:3000");
let socket = io();

var waterScore = -1;
var elecScore = -1;
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

// processScores();
socket.on("data", function (arduinoData) {
  currentState.onOffWater = Math.round(arduinoData[0].val * 100);
  currentState.onOffHeater = Math.round(arduinoData[1].val * 100);
  currentState.onOffLeds = Math.round(arduinoData[2].val * 100);
  currentState.onOffFridge = Math.round(arduinoData[3].val * 100);
  currentState.onOffOven = Math.round(arduinoData[4].val * 100);
  currentState.valueHeater = 100 - Math.round(arduinoData[5].val);
  currentState.valueFridge = 100 - Math.round(arduinoData[6].val);
  currentState.touchWater = Math.round(arduinoData[7].val * 100);
  currentState.touchLid = Math.round(arduinoData[8].val * 100);

  processScores();
});

function processScores() {
  // newWaterScore = Math.round((currentState.onOffWater + currentState.touchWater) / 2);
  newWaterScore = Math.round(currentState.onOffWater);

  newElecScore = Math.round((currentState.onOffLeds + currentState.onOffFridge + currentState.valueFridge) / 3);
  newGlobalScore = Math.round((currentState.onOffLeds + currentState.onOffFridge + currentState.valueFridge + currentState.onOffWater + currentState.touchWater + currentState.onOffHeater + currentState.onOffOven + currentState.valueHeater + currentState.touchLid) / 8);

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
}

function chooseBackground() {
  if (globalScore.between(0, 20, true)) changeBackground(4);
  else if (globalScore.between(20, 40)) changeBackground(3);
  else if (globalScore.between(40, 60, true)) changeBackground(2);
  else if (globalScore.between(60, 80)) changeBackground(1);
  else if (globalScore.between(80, 100, true)) changeBackground(0);
}

function choosePlantAnimation() {
  if (elecScore.between(0, 32, true)) showPlantAnimation(3);
  else if (elecScore.between(32, 70)) showPlantAnimation(2);
  else if (elecScore.between(70, 100, true)) showPlantAnimation(1);
}

// function chooseRiverAnimation() {
//   if (waterScore.between(0, 32, true)) showRiverAnimation(1);
//   else if (waterScore.between(32, 70)) showRiverAnimation(2);
//   else if (waterScore.between(70, 100, true)) showRiverAnimation(3);
// }

function chooseRiverAnimation() {
  // runRiverAnimation(1, 2);
  if (waterScore.between(0, 50, true)) runRiverAnimation(1, 2);
  else if (waterScore.between(51, 100, true)) runRiverAnimation2(1, 2);
}