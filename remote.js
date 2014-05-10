//
// Edoardo Odorico , hack.lenotta.com
// CC-BY-SA
//
//define some dependencies
var express = require("express"),
	exphbs = require("express3-handlebars"),
	exec = require('child_process'),
	fs = require('fs'), 
	routes = require('../routes.js');

//hack to make handlebar look back on father path
fs.exists('views/', function(exists){
	if( !exists ) fs.symlinkSync('../views', 'views', 'dir');
});

hbs = exphbs.create({ defaultLayout: 'main' });

var app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//open the socket and listen to 3700 port
var port = 3700;
var io = require('socket.io').listen(app.listen(port));

app.enable('view cache');

//define the routes from the external file
routes.define(app);


function sendMessage(message, socket){
	exec.execFile('../remote',
				['-m', message],
				function (error, stdout, stderr) {
					console.log('stdout: ' + stdout);
					console.log('stderr: ' + stderr);
					if( stdout.indexOf("Got response") > -1 ){
						socket.emit("callbackButton", { message: "received", 
						operation: message});
					}

					if (error !== null) {
						console.log('exec error: ' + error);
					}
				});
}

app.use(express.static(__dirname + '/public'));

//now define what happen when connecting the client connect to the socket

io.sockets.on('connection', function (socket) {
	socket.on('send', function (data) {

		sendMessage(data.message, socket);

	});
});

//just some output to know everything is working
console.log("Listening on port " + port);

