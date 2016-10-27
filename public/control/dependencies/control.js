function hideCtrlConf(){
	document.getElementById("diviCtrlConf").style.display = "none";
	console.log("ocultar config");
}
function hideCtrlJoy(){
	document.getElementById("diviCtrlJoy").style.display = "none";
	console.log("ocultar joystick");
}
function iframeViewCtrlConf() {
	document.getElementById("diviCtrlConf").style.display = "block";
	document.getElementById("diviCtrlJoy").style.display = "none";
}
function iframeViewCtrlJoy() {
	document.getElementById("diviCtrlConf").style.display = "none";
	document.getElementById("diviCtrlJoy").style.display = "block";
}

function tunelSendFunctionToPyb(data){
	console.log(data);
	parent.iframeConfig.runOnTelnet(data);
}
