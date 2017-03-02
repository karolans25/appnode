var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var ini = require('ini');

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }

});

function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.encoding = 'utf-8';
    form.multiples = false;

    // Read in the file and parse the raw information
	var config = ini.parse(fs.readFileSync('config.ini', 'utf-8'));


	
	
	console.log(config);

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.

        // Se actualizan los valores nuevos en el archivo de configuracion

        /* appnode */
        config.appnode.hostname = fields.evawifi;
        config.appnode.port = fields.evaport;
		config.appnode.route_ip = fields.evawifi;


		/* ESP 1 */
		config.ESP1.name = fields.name2;
		config.ESP1.mac = fields.mac2;
		config.ESP1.ip = fields.ip2;

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

		fs.writeFileSync('./config.ini', ini.stringify(config))
        //writeFile(res);

        res.writeHead(200, {
            'content-type': 'text/plain'
        });

        // se escriben en el archivo de configuracion
        res.write('Archivo de configuracion actualizado:\n\n');
        // res.end(util.inspect({
        //     fields: fields,
        //     //files: files
        // }));

    });
}

server.listen(1185);
console.log("server listening on 1185");
