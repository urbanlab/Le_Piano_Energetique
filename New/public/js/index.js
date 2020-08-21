let socket = io("192.168.81.27:3000");

// When data is 'recieved' do something
// socket.on("data", function (val) {
//   console.log(val);
// });

socket.on("inter1", function (val) {
  console.log(val);
});

runAnimation("unicorn");
runAnimation("rocket");
runAnimation("tick");
runAnimation("world");
// runAnimation("hills");

fadeIn("rocketContainer");
fadeOut("tickContainer");
fadeOut("worldContainer");
fadeIn("unicornContainer");
// fadeOut("hillsContainer");
