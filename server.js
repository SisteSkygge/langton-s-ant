var express = require('express');
var app = express();
var serveur = require('http').createServer(app);
var io = require('socket.io')(serveur);
var zlib = require('zlib');
var dgram = require('dgram');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.status(200);
    res.set({'Content-type':'text/plain'});
    res.sendFile(__dirname+"/public/index.html");
});

app.get('/p5/p5.min.js', function(req, res){
    res.set({'Content-type':'text/javascript'});
    res.status(200);
    res.sendFile(__dirname+'/p5/p5.min.js');
});

serveur.listen(8080);

io.on('connection', function(socket){
    socket.on('S_SIZE', function(){
        socket.emit("R_SIZE", `${100},${100}`);
    });
});

//Récupération des paquets UDP envoyés par l'application python

var serveurSocket = dgram.createSocket('udp4');

//renvoie de l'information au client
serveurSocket.on('message', function(message){
    io.sockets.emit("MAP", message);
});

serveurSocket.bind(13355);


