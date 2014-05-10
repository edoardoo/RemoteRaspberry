//
//Edoardo Odorico and Lorenzo Farnararo , hack.lenotta.com
// CC-BY-SA
//
//define some dependencies
var express = require("express"),
	exphbs = require("express3-handlebars"),
	exec = require('child_process');


var app = express();
//open the socket and listen to 3700 port
var port = 3700;
var io = require('socket.io').listen(app.listen(port));


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.enable('view cache');


app.get("/", function(req, res){
	res.render("light");
});

app.get('/gate', function (req, res) {
    res.render('gate');
});

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

