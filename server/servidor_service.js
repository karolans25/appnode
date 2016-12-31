/**
 *	SERVIDOR HTTP: Se conecta con la aplicación en el browser
 */

//---------------------------------------------------------------
// Variables globales
//---------------------------------------------------------------
var express = require('express');
var app = express();
var serverHttp = require('http').Server(app);
var io = require('socket.io')(serverHttp);
var fs = require('fs');
var exec = require('child_process').exec;
//var path_server = '/home/pi/appNode/';
var path_server = './';

var serial_port = "";
//var hostname = '10.203.166.183';
//var hostname = '192.168.2.3';
//var hostname = '192.168.1.62';	// Dirección servidor node (web)
//var hostname = '192.168.1.100';	// Dirección servidor node (web)
var hostname = '192.168.2.1';	// Dirección servidor node (web)
var port = 1522;		// Puerto de escucha del servidor node	
var route_ip = '192.168.2.1'; 	// Dirección del enrutador para comando nmap
//var route_ip = '192.168.2.1'; 	// Dirección del enrutador para comando nmap
var esps = [];

//---------------------------------------------------------------
// app
//---------------------------------------------------------------
app.use(express.static('public'));
app.get('/', function(req, res){
	var camino = path_server + 'public/index.html';
	fs.exists(camino,function(existe){
		if (existe) {
			fs.readFile(camino,function(error,contenido){
				if (error) {
					res.writeHead(500, {'Content-Type': 'text/plain'});
					res.write('Error interno');
					res.end();                    
				} else {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write(contenido);
					res.end();
				}
			});
		} else {
			res.writeHead(404, {'Content-Type': 'text/html'});
			res.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');        
			res.end();
		}
	});
});
app.get('/hello', function(req, res){
	console.log(`Petición para /hello`);
	res.status(200).send("Hello Carito");
});


//---------------------------------------------------------------
// server
//---------------------------------------------------------------
serverHttp.listen(port, hostname, function(){
	console.log('Server On');
	console.log(`Servidor corriendo en http://${hostname}:${port}/`);
	// Escanea las tarjetas conectadas al servidor
	scanConnected();
});


//---------------------------------------------------------------
// Comunicacion io-socket
//---------------------------------------------------------------
io.on('connection', function(socket){
	console.log('Algún cliente conectado con Sockets');
	// Emite los datos de los esp conectados
	socket.emit('scanList', esps);
	
	socket.on('runTelnet', function(data){
		runTelnet(data);
	});

	socket.on('scanner', function(){
		scanConnected();
		setTimeout( function(){
			socket.emit('scanList', esps);
			console.log("Listo para actualizar el select");
		}, 20000);
	});
});


function saveInit(datoIn, fileName){
	fs.writeFile(path_server + 'server/' + fileName, datoIn, function(err) {
		if(err)	{
			console.log(err);
		}
		else {
			console.log('Se ha escrito correctamente en ' + fileName);
		}
	});
}

function runTelnet(dataIn){
	saveInit(dataIn.text, dataIn.name);
	console.log(dataIn.text);
	console.log(dataIn.name);
	console.log(dataIn.cardIp);
	console.log(dataIn.cardMac);
	//exec(`${path_server}server/runMain.sh ${dataIn.cardIp} 3335 ${path_server}server/${dataIn.name}`, function(error, stdout, stderr){
	exec(`${path_server}server/runMain.py ${dataIn.cardIp} 3335 ${path_server}server/${dataIn.name}`, function(error, stdout, stderr){
		if( error !== null) {				
			console.log('exec error: ' + error);
		}
		else{
			console.log(`Se ha cargado correctamente el archivo: ${dataIn.name}`);	
		}
	} );	
}

function scanConnected( ){
	console.log('Escaneando los dispositivos conectados...');
	//exec('arp', function(error, stdout, stderr){
	exec('rm ' +path_server+'server/devices.txt', function(error, stdout, stderr){
		if (error !== null){console.log('exec error: ' + error);}
	});
	exec('rm '+path_server+'server/cards.txt', function(error, stdout, stderr){
		if (error !== null){console.log('exec error: ' + error);}
	});
	esps = [];
	exec(`nmap -sP ${route_ip}-254`, function(error, stdout, stderr){
		if( error !== null) {				
			console.log('exec error: ' + error);
		}
		else {
		    console.log(stdout);
			var aliases = ['Orion', 'Hercules', 'Andromeda',  'Pegasus', 'Crux', 'Draco', 'Cassiopeia', 'Europa',  'Perseus', 'Centaurus', 'Phoenix', 'Hydra', 'Lyra', 'Columba', 'Horologium', 'Serpens', 'Linx'];
			var firstIn = stdout.indexOf('Nmap scan');
			var lastOut = stdout.indexOf('Nmap done');
			var cadena = stdout.substring(firstIn, lastOut);
			var count = 0;
			cadena.split('\nNmap').map(function (elem, index){
				var indexInIp = elem.indexOf('192.168');
				var indexEndIp = elem.indexOf('Host is');
				var indexInMac = elem.indexOf('Address')+9;
				var indexEndMac = elem.indexOf(' ', indexInMac);
				if(elem.substring(indexInMac, indexEndMac).length == 17){
					var device = {	name: `Dispositivo${index}`,
									ip: elem.substring(indexInIp, indexEndIp-1),
									mac: elem.substring(indexInMac, indexEndMac)
					};
					exec('echo \' ' + device.name + '\t' + device.ip + '\t' + device.mac + ' \' >> '+path_server+'server/devices.txt', function(error, stdout, stderr){
						if( error !== null) {				
							console.log('exec error: ' + error);
						}
					});
					exec(`${path_server}server/isESP.sh ${device.ip} 3335`, function(error, stdout, stderr){ 
						if (error == null){
							var isCard = { 	name: `${aliases[count]}`,
											ip: device.ip,
											mac: device.mac
							};
							count ++;
							esps.push(isCard);			
							console.log(`Card: ${isCard.name}, ip: ${isCard.ip}`);
							exec('echo \' ' + isCard.name + '\t' + isCard.ip + '\t' + isCard.mac + ' \' >> '+path_server+'server/cards.txt', function(error, stdout, stderr){
								if( error !== null) {				
									console.log('exec error: ' + error);
								}
							});	
						}
					});
				}
			});
		}
		console.log(`\tLas tarjetas conectadas son:`); 
	});
}

		
		/**	fs.readFile(`./public/pruebas/${data.name}.luabot`, function (err, data) {
			   	if (err) {
					return console.error(err);
				}
				console.log("Asynchronous read: " + data.toString());
			});*/		


