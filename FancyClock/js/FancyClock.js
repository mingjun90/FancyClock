//html5 canvas clock
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = '#28f1da'; //little tricky here
ctx.lineWidth = 17;
ctx.lineCap = 'round';
ctx.shadowBlur = 15;
ctx.shadowColor = '#28f1da';

	
/* cookie part, local web doesn't work*/
function setCookie(name, value, expires) {
	exdate = new Date();
	exdate.setDate(exdate.getDate() + expires);
	document.cookie = name + "=" + value + "; expires=" + exdate.toGMTString() + "; path=/";
}
	
function getCookie(name) {
  var c_start = document.cookie.indexOf(name+'=');
  if (c_start != -1) {
	c_start = c_start + name.length+1;
	c_end = document.cookie.indexOf(";", c_start);
	if(c_end == -1) {
		c_end = document.cookie.length;
	}
	return document.cookie.substring(c_start, c_end);
  }
}

function checkCookie(username) {
	var cookieChoice = getCookie(username);
	//if undefined
	if (typeof cookieChoice === 'undefined') {
		return 1;
	} else {
		return cookieChoice;
	}
}

var choice = checkCookie("userClock");
	
$('button').on('click', function() {
	if ((this).name == "mode1") choice = 1;
	else if ((this).name == "mode2") choice = 2;
	setCookie("userClock", choice, 5); //5 days in the future
});


/* main clock part, there are two modes*/
function degToRad(degree) {
	var factor = Math.PI/180;
	return degree*factor;
}

function renderTime(){
	var now = new Date();
	var today = now.toDateString();
	var time = now.toLocaleTimeString();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	var milliseconds = now.getMilliseconds();
	var newSeconds = seconds + (milliseconds/1000); //smooth
	
	//background - normal
		// ctx.fillStyle = '#303030';
		// ctx.fillRect(0,0,500,500);
	//background - gradient
	gradient = ctx.createRadialGradient(350,350,5,350,350,350);
	gradient.addColorStop(0, '#09303a');
	gradient.addColorStop(1, '#202020');
	ctx.fillStyle = gradient;
	ctx.fillRect(0,0,700,700);
	
	//different modes
	if(choice==1) { //mode1
		//hours
		ctx.beginPath();
		//context.arc(x,y,r,sAngle,eAngle,counterclockwise);
		ctx.arc(350, 350, 200, degToRad((hours%12*30)-105), degToRad((hours%12*30)-75) );
		ctx.stroke();
		
		//minutes
		ctx.beginPath();
		ctx.arc(350, 350, 250, degToRad((minutes*6)-97.5), degToRad((minutes*6)-82.5) );
		ctx.stroke();
		
		//seconds
		ctx.beginPath();
		ctx.arc(350, 350, 300, degToRad((newSeconds*6)-92), degToRad((newSeconds*6)-82.5));
		ctx.stroke();
	}
	else if (choice==2) { //mode2
		//hours
		ctx.beginPath();
		//context.arc(x,y,r,sAngle,eAngle,counterclockwise);
		ctx.arc(350, 350, 200, degToRad(270), degToRad((hours%12*30)-90)); //24h: degToRad((hours*15)-90)
		ctx.stroke();
	  
		//minutes
		ctx.beginPath();
		ctx.arc(350, 350, 250, degToRad(270), degToRad((minutes*6)-90));
		ctx.stroke();
		
		//seconds
		ctx.beginPath();
		ctx.arc(350, 350, 300, degToRad(270), degToRad((newSeconds*6)-90));
		ctx.stroke();
	}
	
	//Date
	ctx.font = "bold 35px Arial";
	ctx.fillStyle = '#28f1da';
	ctx.fillText(today, 210, 350); //context.fillText(text,x,y,maxWidth);
	
	//Time
	ctx.font = "bold 20px Arial";
	ctx.fillStyle = '#28f1da';
	ctx.fillText(time, 305, 380);
	
	//save Image
	// var dataURL = canvas.toDataURL();
	// document.getElementById('myImage').src = dataURL;
}


/* keep updateing the web page */
setInterval(renderTime, 40);// setInterval(function, delay);




