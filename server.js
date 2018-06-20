var express = require('express');
var app = express();
var serveur = require('http').createServer(app);
var io = require('socket.io');

var Ant = require('./ant.js');
var Game = require('./game.js');

app.use(express.static('p5'));

app.get('/', function(req, res){
    res.sendFile(__dirname+"public/index.html");
});

serveur.listen(8080);

io.sockets.on('connection', function(){

});

var game = new Game(640,640);
var ant = new Ant(320,320,640,640);

setInterval(1000/30, function(){
    //Fait avancer la partie
    io.sockets.emit("UPDATE", Game.getLastPixel());
})