var express = require('express');
var app = express();
var serveur = require('http').createServer(app);
var io = require('socket.io')(serveur);
var zlib = require('zlib');
var dgram = require('dgram');

var clientConnected = 0;

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
        console.log(`${socket.request.connection.remoteAddress.substr(7)} connect`);
        socket.emit("R_SIZE", `${200},${200}`);
        clientConnected++;
        console.log(`Client connecte : ${clientConnected}`);
    });

    socket.on('disconnect', function(){
        console.log(`${socket.request.connection.remoteAddress.substr(7)} disconnect`);
        clientConnected--;
        console.log(`Client connecte : ${clientConnected}`);
    });
});

//Récupération des paquets UDP envoyés par l'application python

var serveurSocket = dgram.createSocket('udp4');

//renvoie de l'information au client
serveurSocket.on('message', function(message){
    //console.log(message);
    /*
    zlib.inflate(message, function(err, data){
        if(!err) io.sockets.emit('MAP', data);
        else console.log(err);
    });
    */
   io.sockets.emit('MAP', message);
});

serveurSocket.bind(13355);


