// importar
var express    = require('express');
var fs         = require('fs');
var path       = require('path');
var bodyParser = require("body-parser");
var formidable = require('express-formidable');
var ini        = require('ini');
var exec = require('child_process').exec;
//var form = require('connect-form');

// instanciar
var app = express();

// Archivo config
var config = ini.parse(fs.readFileSync('config.ini', 'utf-8'));

// Enviroments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(formidable(
    {encoding: 'utf-8',}
    ));

var path_server = './';

//var app = module.exports = express.createServer(form({ keepExtensions: true, uploadDir:'./uploads' }));

// ruteo
app.get('/', function(req, res){


    res.render('index', { 
        title: 'IoT', 
        message: 'Configuracion de Tarjetas y Servidor IoT', 
        name1: config.ESP1.name,
        mac1:  config.ESP1.mac,
        ip1:   config.ESP1.ip,
        name2: config.ESP2.name,
        mac2:  config.ESP2.mac,
        ip2:   config.ESP2.ip,
        name3: config.ESP3.name,
        mac3:  config.ESP3.mac,
        ip3:   config.ESP3.ip,
        name4: config.ESP4.name,
        mac4:  config.ESP4.mac,
        ip4:   config.ESP4.ip,
        name5: config.ESP5.name,
        mac5:  config.ESP5.mac,
        ip5:   config.ESP5.ip,
        name6: config.ESP6.name,
        mac6:  config.ESP6.mac,
        ip6:   config.ESP6.ip,
        name7: config.ESP7.name,
        mac7:  config.ESP7.mac,
        ip7:   config.ESP7.ip,
        name8: config.ESP8.name,
        mac8:  config.ESP8.mac,
        ip8:   config.ESP8.ip,
        name9: config.ESP9.name,
        mac9:  config.ESP9.mac,
        ip9:   config.ESP9.ip,
        name10: config.ESP10.name,
        mac10:  config.ESP10.mac,
        ip10:   config.ESP10.ip,
        evalan: config.appnode.route_ip,
        evaport: config.appnode.port,
        evawifi: config.appnode.hostname,
        nmaprange: config.NMAP.range,

    });
    console.log  (config);
});

app.post('/', (req, res) => {
    fields = req.fields; // contains non-file fields 
    req.files; // contains files 

  
    //Store the data from the fields in your data store.
    //The data store could be a file or database or any other store based
    //on your application.

    // Se actualizan los valores nuevos en el archivo de configuracion

    //console.log("Datos de la primera tarjeta");
    //console.log("Card 1 : " + fields.name1 + " , " + fields.mac1 + " , " + fields.ip1 );
    /* appnode */
    config.appnode.hostname = fields.evawifi;
    config.appnode.port = fields.evaport;
    config.appnode.route_ip = fields.evawifi;


    /* ESP 1 */
    config.ESP1.name = fields.name1;
    config.ESP1.mac = fields.mac1;
    config.ESP1.ip = fields.ip1;

    /* ESP 2 */
    config.ESP2.name = fields.name2;
    config.ESP2.mac = fields.mac2;
    config.ESP2.ip = fields.ip2;

    /* ESP 3 */
    config.ESP3.name = fields.name3;
    config.ESP3.mac = fields.mac3;
    config.ESP3.ip = fields.ip3;

    /* ESP 4 */
    config.ESP4.name = fields.name4;
    config.ESP4.mac = fields.mac4;
    config.ESP4.ip = fields.ip4;

    /* ESP 5 */
    config.ESP5.name = fields.name5;
    config.ESP5.mac = fields.mac5;
    config.ESP5.ip = fields.ip5;

    /* ESP 6 */
    config.ESP6.name = fields.name6;
    config.ESP6.mac = fields.mac6;
    config.ESP6.ip = fields.ip6;

    /* ESP 7 */
    config.ESP7.name = fields.name7;
    config.ESP7.mac = fields.mac7;
    config.ESP7.ip = fields.ip7;

    /* ESP 8 */
    config.ESP8.name = fields.name8;
    config.ESP8.mac = fields.mac8;
    config.ESP8.ip = fields.ip8;

    /* ESP 9 */
    config.ESP9.name = fields.name9;
    config.ESP9.mac = fields.mac9;
    config.ESP9.ip = fields.ip9;

    /* ESP 10 */
    config.ESP10.name = fields.name10;
    config.ESP10.mac = fields.mac10;
    config.ESP10.ip = fields.ip10;

    // NMAP
    config.NMAP.range = fields.nmaprange;

    fs.writeFileSync('config.ini', ini.stringify(config))
    //writeFile(res);

    res.writeHead(200, {
        'Content-Type': 'text/html',
            //'Content-Length': data.length
    });

    // se escriben en el archivo de configuracion
    

    writeDhcpStatic(fields);
    restartServices();
    

    //console.log(req.fields);
    res.write('Archivo de configuracion actualizado:\n\n');
    res.end('It worked!');
});


function writeDhcpStatic(fields) {

    var fs = require('fs');
    var stream = fs.createWriteStream("/etc/dhcp/dhcpd.static.conf");
    stream.once('open', function(fd) {
      stream.write("#" + fields.name1 + "\n");
      stream.write('host ' + fields.name1.toLowerCase() + '{\n\thardware ethernet 5C:CF:7F:' + fields.mac1 + ';\n\tfixed-address ' + fields.ip1 + ';\n}\n\n');
      // Tarjeta 2
      stream.write("#" + fields.name2 + "\n");
      stream.write('host ' + fields.name2.toLowerCase() + '{\n\thardware ethernet 5C:CF:7F:' + fields.mac2 + ';\n\tfixed-address ' + fields.ip2 + ';\n}\n\n');
      // Tarjeta 3
      stream.write("#" + fields.name3 + "\n");
      stream.write('host ' + fields.name3.toLowerCase() + '{\n\thardware ethernet 5C:CF:7F:' + fields.mac3 + ';\n\tfixed-address ' + fields.ip3 + ';\n}\n\n');
      // Tarjeta 4
      stream.write("#" + fields.name4 + "\n");
      stream.write('host ' + fields.name4.toLowerCase() + '{\n\thardware ethernet 5C:CF:7F:' + fields.mac4 + ';\n\tfixed-address ' + fields.ip4 + ';\n}\n\n');
      // Tarjeta 5
      stream.write("#" + fields.name5 + "\n");
      stream.write('host ' + fields.name5.toLowerCase() + '{\n\thardware ethernet 5C:CF:7F:' + fields.mac5 + ';\n\tfixed-address ' + fields.ip5 + ';\n}\n\n');
      // Tarjeta 6
      stream.write("#" + fields.name6 + "\n");
      stream.write('host ' + fields.name6.toLowerCase() + '{\n\thardware ethernet 5C:CF:7F:' + fields.mac6 + ';\n\tfixed-address ' + fields.ip6 + ';\n}\n\n');
      // Tarjeta 7
      stream.write("#" + fields.name7 + "\n");
      stream.write('host ' + fields.name7.toLowerCase() + '{\n\thardware ethernet 5C:CF:7F:' + fields.mac7 + ';\n\tfixed-address ' + fields.ip7 + ';\n}\n\n');
      // Tarjeta 8
      stream.write("#" + fields.name8 + "\n");
      stream.write('host ' + fields.name8.toLowerCase() + '{\n\thardware ethernet 5C:CF:7F:' + fields.mac8 + ';\n\tfixed-address ' + fields.ip8 + ';\n}\n\n');
      // Tarjeta 9
      stream.write("#" + fields.name9 + "\n");
      stream.write('host ' + fields.name9.toLowerCase() + '{\n\thardware ethernet 5C:CF:7F:' + fields.mac9 + ';\n\tfixed-address ' + fields.ip9 + ';\n}\n\n');
      // Tarjeta 10
      stream.write("#" + fields.name10 + "\n");
      stream.write('host ' + fields.name10.toLowerCase() + '{\n\thardware ethernet 5C:CF:7F:' + fields.mac10 + ';\n\tfixed-address ' + fields.ip10 + ';\n}\n\n');
      stream.end();
    });

}

function restartServices() {
    exec(`service isc-dhcp-server restart`, function(error, stdout, stderr){
        if( error !== null) {               
            console.log('exec error: ' + error);
        }
        else{
            console.log(`Se ha reiniciado DHCP`);  
        }
    } );
    exec(`service blocklyMicropython restart`, function(error, stdout, stderr){
        if( error !== null) {               
            console.log('exec error: ' + error);
        }
        else{
            console.log(`Se ha reiniciado nodeApp`);  
        }
    } );
}
 
// escuchar
app.listen(9000);
 
console.log("Servidor Express escuchando en modo %s", app.settings.env);