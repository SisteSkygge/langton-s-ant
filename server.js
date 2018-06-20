var express = require('express');
var app = express();
var serveur = require('http').createServer(app);
var io = require('socket.io');

app.use(express.static('p5'));

app.get('/', function(req, res){
    res.sendFile(__dirname+"public/index.html");
});

serveur.listen(8080);