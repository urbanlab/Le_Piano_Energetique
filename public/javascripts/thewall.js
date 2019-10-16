var circle;
var bar;

window.onload = function WindowLoad(event) {
    //document.getElementById("container").innerHTML+= "new content";
    circle = new ProgressBar.Circle('#circleContainer', {
        color: '#FCB03C',
        strokeWidth: 3,
        trailWidth: 1,
        text: {
            value: '0'
        }
    });
    circle.animate(1, {
        // Duration for animation in milliseconds
        // Default: 800
        duration: 1200,

        // Easing for animation. See #easing section.
        // Default: 'linear'
        easing: 'easeInOut',

        // See #custom-animations section
        // Built-in shape passes reference to itself and a custom attachment
        // object to step function
        from: { color: '#FF0000' },
        to: { color: '#FFFF00' },
        step: function(state, circle, attachment) {
            circle.path.setAttribute('stroke', state.color);
            circle.value = (state.value);
        }
    });
    circle.setText("50 %");
    //circle.set(0.5);

    bar = new ProgressBar.Path('#line-path', {
        easing: 'easeInOut',
        duration: 1400
    });
        
        bar.set(0);
        bar.animate(-0.5);
}

var bgImageArray = ["lonely.jpg", "uluwatu.jpg", "carezza-lake.jpg", "batu-bolong-temple.jpg"],
localImageArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg","5.jpg"],
base = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/full-",
localBase = "../images/"
secs = 5;
bgImageArray.forEach(function(img){
    new Image().src = base + img; 
    // caches images, avoiding white flash between background replacements
});

function backgroundSequence() {
	window.clearTimeout();
	var k = 0;
	for (i = 0; i < localImageArray.length; i++) {
		setTimeout(function(){ 
			// document.documentElement.style.background = "url(" + base + bgImageArray[k] + ") no-repeat center center fixed";
			document.documentElement.style.background = "url(" + localBase + localImageArray[k] + ") no-repeat center center fixed";
            document.documentElement.style.backgroundSize ="cover";
		if ((k + 1) === localImageArray.length) { 
            setTimeout(function() { backgroundSequence() }, (secs * 1000))} else { k++; }			
		}, (secs * 1000) * i)	
	}
}

var lastBackground = 1;
function changeBackground(index){
    lastBackground = index;
    window.clearTimeout();
    document.documentElement.style.background = "url(" + localBase + localImageArray[index-1] + ") no-repeat center center fixed";
    document.documentElement.style.backgroundSize ="cover";
}
//backgroundSequence();


/**
 * WEB SOCKETS
 * 
 */

console.log("connection to server...");

var socket = io.connect('http://192.168.81.11/');
    socket.on('display', function (data) {
      var intValue = parseInt(data);
      circle.set(intValue/100);
      circle.setText(data + " %");
      bar.set(-intValue/100);
      
      if (intValue < 20){
          if (lastBackground != 5)
            changeBackground(5);
      }else if (intValue <40){
        if (lastBackground != 4)
            changeBackground(4);
      }else if (intValue < 60){
        if (lastBackground != 3)
            changeBackground(3);
      }else if (intValue < 80){
        if (lastBackground != 2)
            changeBackground(2);
      } else {
        if (lastBackground != 1)
            changeBackground(1);
      }
    });