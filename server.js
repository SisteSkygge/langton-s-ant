var express = require('express');
var app = express();
var serveur = require('http').createServer(app);
var io = require('socket.io')(serveur);
var dgram = require('dgram');

var clientConnected = 0;
var dataDelay = 1000/30;
var messageStock;

app.use(express.static('public'));

app.get('/', function(req, res){
    res.status(200);
    res.set({'Content-type':'text/html'});
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
    messageStock = message;
});

setInterval(function(){
    if(messageStock!==undefined) io.sockets.emit('MAP', messageStock);
}, dataDelay);
serveurSocket.bind(13355);


