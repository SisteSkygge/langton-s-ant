var express = require('express');
var app = express();
var serveur = require('http').createServer(app);
var io = require('socket.io')(serveur);

var Ant = require('./ant.js');
var Game = require('./game.js');

app.use(express.static('p5'));
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

var game = new Game(400,400);
var ant = new Ant(game.width/2,game.height/2,game.width,game.height);

setInterval(function(){
    //Fait avancer la partie
    var antPos = ant.translatePos();
    var caseColor = game.returnColor(antPos);
    ant.deplacer(caseColor);
    game.ajouterPixel(antPos);
    io.sockets.emit("ANT_M", antPos);
    
}, 1000/500);

io.on('connection', function(socket){
    socket.on('S_DATA', function(){
        //On renvoie la carte du jeu
        socket.emit("R_DATA", game.exportMap());
    });
    socket.on('S_SIZE', function(){
        //on envoie la taille de l ecran de jeu
        socket.emit("R_SIZE", game.getSize());
        //console.log(game.getSize());
    });
});