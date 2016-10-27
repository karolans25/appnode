function hideEditor(){
	document.getElementById("diviEditor").style.display = "none";
	console.log("ocultar editor");
}
function hideBlockly(){
	document.getElementById("diviBlockly").style.display = "none";
	console.log("ocultar blockly");
}
function hideControl(){
	document.getElementById("diviControl").style.display = "none";
	console.log("ocultar control");
}
function hideConfig(){
	document.getElementById("diviConfig").style.display = "none";
	console.log("ocultar config");
}
function hideCard(){
	document.getElementById("diviCard").style.display = "none";
	console.log("ocultar tarjeta");
}
function hideGuides(){
	document.getElementById("diviGuides").style.display = "none";
	console.log("ocultar guías");
}

function iframeViewEditor() {
	document.getElementById("diviBlockly").style.display = "none";
	document.getElementById("diviEditor").style.display = "block";
	document.getElementById("diviConfig").style.display = "none";
	document.getElementById("diviControl").style.display = "none";
	document.getElementById("diviCard").style.display = "none";
	document.getElementById("diviGuides").style.display = "none";
}
function iframeViewBlockly() {
	document.getElementById("diviBlockly").style.display = "block";
	document.getElementById("diviEditor").style.display = "none";
	document.getElementById("diviConfig").style.display = "none";
	document.getElementById("diviControl").style.display = "none";
	document.getElementById("diviCard").style.display = "none";
	document.getElementById("diviGuides").style.display = "none";
}
function iframeViewControl() {
	document.getElementById("diviBlockly").style.display = "none";
	document.getElementById("diviEditor").style.display = "none";
	document.getElementById("diviConfig").style.display = "none";
	document.getElementById("diviControl").style.display = "block";
	document.getElementById("diviCard").style.display = "none";
	document.getElementById("diviGuides").style.display = "none";
}
function iframeViewConfig() {
	document.getElementById("diviBlockly").style.display = "none";
	document.getElementById("diviEditor").style.display = "none";
	document.getElementById("diviConfig").style.display = "block";
	document.getElementById("diviControl").style.display = "none";
	document.getElementById("diviCard").style.display = "none";
	document.getElementById("diviGuides").style.display = "none";
}
function iframeViewCard() {
	document.getElementById("diviBlockly").style.display = "none";
	document.getElementById("diviEditor").style.display = "none";
	document.getElementById("diviConfig").style.display = "none";
	document.getElementById("diviControl").style.display = "none";
	document.getElementById("diviCard").style.display = "block";
	document.getElementById("diviGuides").style.display = "none";
}
function iframeViewGuides() {
	document.getElementById("diviBlockly").style.display = "none";
	document.getElementById("diviEditor").style.display = "none";
	document.getElementById("diviConfig").style.display = "none";
	document.getElementById("diviControl").style.display = "none";
	document.getElementById("diviCard").style.display = "none";
	document.getElementById("diviGuides").style.display = "none";
}

