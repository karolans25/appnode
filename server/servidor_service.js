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
var ejs = require('ejs');
//var logstamp = require('log-timestamp');


// Requerido para leer config.ini
var ini = require('ini');
var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

var exec = require('child_process').exec;
//var path_server = '/home/pi/appnode/';
var path_server = './';

var serial_port = "";

//var hostname = '10.203.166.183';
//var hostname = '192.168.2.3';
//var hostname = '192.168.1.62';	// Dirección servidor node (web)
//var hostname = '192.168.1.100';	// Dirección servidor node (web)
//var hostname = '10.81.139.2';	// Dirección servidor node (web)



var hostname = config.appnode.hostname;	// Dirección servidor node (web)
var port = config.appnode.port;		// Puerto de escucha del servidor node	
var route_ip = config.appnode.route_ip; 	// Dirección del enrutador para comando nmap
//var route_ip = '192.168.2.1'; 	// Dirección del enrutador para comando nmap

// Parametros de configuracion para la libreria libnmap

var nmap = require('libnmap')
  , timeout = 1024 * 1024
  , opts = {
  	  //json: false,
      range: [
        config.NMAP.range,
      ],
      ports: '3335',
    };



var esps = [];


var cards = [];


//readConfig();

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
					//res.write(contenido);
					var rendererHtml = ejs.render(contenido, {hostname: '192.168.2.2'});
					res.end(rendererHtml);
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

	console.log('Host :' + config.appnode.hostname);
	console.log('Puerto :' + config.appnode.port);
	console.log('RouteIp :' + config.appnode.route_ip);

	// Escanea las tarjetas conectadas al servidor
	// scanConnected();
	readConfig();
	scanLibNmap();
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
		setTimeout( function(){
			socket.emit('fileLoaded');
		}, 5000);
	});

	socket.on('scanner', function(){
		scanLibNmap();
		setTimeout( function(){
			socket.emit('scanList', esps);
			console.log("Listo para actualizar el select");
		}, 5000);
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

function readConfig() {
	// Read in the file and parse the raw information
	
	console.log(config);
	
	//console.log(cards);
	
	
		cards[config.ESP1.ip] = config.ESP1.name;
		cards[config.ESP2.ip] = config.ESP2.name;
		cards[config.ESP3.ip] = config.ESP3.name;
		cards[config.ESP4.ip] = config.ESP4.name;
		cards[config.ESP5.ip] = config.ESP5.name;
		cards[config.ESP6.ip] = config.ESP6.name;
		cards[config.ESP7.ip] = config.ESP7.name;
		cards[config.ESP8.ip] = config.ESP8.name;
		cards[config.ESP9.ip] = config.ESP9.name;
		cards[config.ESP10.ip] = config.ESP10.name;
		
	//console.log('Tarjeta : ' + cards[config.ESP1.ip]);
		
		
}


function runTelnet(dataIn){
	require('log-timestamp');
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


function scanLibNmap() {
	
	// se borra el archivo cards.txt
	exec('rm '+path_server+'server/cards.txt', function(error, stdout, stderr){
		if (error !== null){console.log('exec error: ' + error);}
	});

	// Se lanza el nmap desde libnmap
	nmap.scan(opts, function(err, report) {
	  	if (err) throw new Error(err)
	  

	  	// recorremos el arreglo de respuesta y obtenemos la informacion delas tarjetas
	  	for (var item in report) {
		  	//console.log(report[item].host);
		  	//console.log(JSON.stringify(report[item].host));
		  	for (var item1 in report[item].host) {

		  		ipadd = report[item].host[item1].address[0].item["addr"];
		  		mac = report[item].host[item1].address[1].item["addr"];
		  		name = cards[ipadd];
		  		console.log(name + ' :  ' + ipadd + " " + mac);
		  		//console.log(report[item].host[item1].address[1].item["addr"]);
		  		
		  		// Creamos la variable isCard para cada tarjeta conectada
		  		var isCard = { 	
		  						name : name,
								ip: ipadd,
								mac: mac
				};
				
				// Actualizamos el arreglo de esps
				esps.push(isCard);		

				// Escribimos el archivo cards.txt
				exec('echo \' ' + isCard.name + '\t' + isCard.ip + '\t' + isCard.mac + ' \' >> '+path_server+'server/cards.txt', function(error, stdout, stderr){
					if( error !== null) {				
						console.log('exec error: ' + error);
					}
				});	
		
		  	}

		  	console.log(`\tLas tarjetas conectadas son:`); 
		  	console.log('esps:');
		  	console.log(esps);

		}

	});
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
	exec(`nmap -sP ${route_ip}-30`, function(error, stdout, stderr){
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
						console.log(stdout);
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


