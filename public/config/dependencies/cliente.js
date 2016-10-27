var hostname = '192.168.2.1';
//var hostname = '192.168.1.62';

var socket = io.connect(`http://${hostname}:1522`, {'forceNew': true});

socket.on('connected', function(data){
	console.log(data);
});

socket.on('scanList', function(data){
	scanningList(data);
	window.alert("Lista de tarjetas actualizada.");
});

//---------------------------------------------------------
//		FUTCION IMPORT EXPORT
//---------------------------------------------------------

function importCode(){
	var xml = parent.iframeBlockly.Blockly.Xml.workspaceToDom(parent.iframeBlockly.workspace);
	var xml_text = parent.iframeBlockly.Blockly.Xml.domToText(xml);	
	document.getElementById('codeArea').value = xml_text;
}

function exportCode(){
	var xml_text = document.getElementById('codeArea').value;
	var xml = parent.iframeBlockly.Blockly.Xml.textToDom(xml_text);
	parent.iframeBlockly.Blockly.Xml.domToWorkspace(xml, parent.iframeBlockly.workspace);
}

function cleanText(){
	document.getElementById('codeArea').value = '';
}


//-------------------------------------------------------------
// Funciones
//-------------------------------------------------------------

function scanningList(datos){
	var cardPicker = document.getElementById('selectCard');
	
	while(cardPicker.length != 0){
		cardPicker.remove(cardPicker.length -1 );
	}

	datos.map(function(elem, index){
		var cardOption = document.createElement('option');
		cardOption.textContent = `${elem.name}`;
		cardOption.value = `${elem.name}\t${elem.mac}\t${elem.ip}`;
		cardPicker.appendChild(cardOption);
		console.log(index);
		console.log(cardOption.textContent);
		console.log(cardOption.value);
	});
}

function savingFile(data){
	var text_xml = "";
	var nameDoc = "";

	var nombres = data.map(function(elem, index){
		return elem;}).join(" ");

	var doc = window.prompt(`Los archivos existentes en el directorio pruebas/ son:
		${nombres} \n
		Ingresa el nombre del archivo: `, '');
	if (doc != null && doc.localeCompare(' ') != 0) {
		if(doc.indexOf('.')==-1)
			nameDoc = `${doc.replace(/ /g, '_')}.luabot`;
		else
			nameDoc = `${doc.replace(/ /g, '_')}`;
		var xml_blockly = Blockly.Xml.workspaceToDom(Code.workspace);
		text_xml = Blockly.Xml.domToText(xml_blockly);
		socket.emit('saveProject', {text: text_xml, name: nameDoc});
		window.alert(`El archivo se guardó como: \n
		${nameDoc}`);
	} else {window.alert('El archivo NO se guardó.');}
}

/*function openTelnetCard(){
	var code = Blockly.Lua.workspaceToCode(Code.workspace);
	var init = document.getElementById('selectCard').value.indexOf('\t');
	var card = document.getElementById('selectCard').value.substring(init);
	console.log(card);
	socket.emit('runTelnet', {code: code, card: card});  
	document.getElementById('statusInfo').innerText = ">> Run esp8266 by Wifi";
}*/


function runOnTelnet(data){
	var code = data;
	var theData = document.getElementById('selectCard').value.split('\t');
	socket.emit('runTelnet', 
	{name: `${theData[0]}.py`,
	 text: code,
	 cardIp: `${theData[2]}`,	
	 cardMac: `${theData[1]}`	
	});
}

function scanner(){
	window.alert("¿Desea actualizar la lista de dispositivos conectados?");
	console.log("Escaneo de dispositivos conectados");
	socket.emit('scanner');
}

function viewerGuides(){
	console.log("Hola guides");
}
