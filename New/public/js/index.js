let socket = io("192.168.81.27:3000");

let defaultState = {
  "inter1": 0,
  "inter2": 0,
  "inter3": 0,
  "inter4": 0,
  "inter5": 0,
  "pot1": 0,
  "pot2": 0,

}
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

runAnimation("plantbubbles");
// runAnimation("rocket");
// runAnimation("tick");
// runAnimation("world");
// // runAnimation("hills");

// fadeIn("rocketContainer");
// fadeOut("tickContainer");
// fadeOut("worldContainer");
// fadeIn("unicornContainer");
// fadeOut("hillsContainer");
