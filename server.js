var express = require('express');
var app = express();
var serveur = require('http').createServer(app);
var io = require('socket.io')(app);

var Ant = require('./ant.js');
var Game = require('./game.js');

app.use(express.static('p5'));

app.get('/', function(req, res){
    res.sendFile(__dirname+"public/index.html");
});

serveur.listen(8080);

io.on('connection', function(socket){
    socket.on('S_DATA', function(){
        //On renvoie la carte du jeu
        socket.emit("R_DATA", game.exportMap());
    });
});

var game = new Game(640,640);
var ant = new Ant(320,320,640,640);

setInterval(1000/30, function(){
    //Fait avancer la partie
    var antPos = ant.translatePos();
    var caseColor = game.returnColor(antPos);
    ant.deplacer(caseColor);
    game.ajouterPixel(antPos);
    io.sockets.emit("ANT_M", game.getLastPixel());
})