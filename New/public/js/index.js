let socket = io("192.168.81.27:3000");

// When data is 'recieved' do something
socket.on("data", function (val) {
  console.log(val);
});
