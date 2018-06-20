var express = require('express');
var app = express();
var io = require('socket.io');

app.use(express.static('p5'));

app.get('/', function(req, res){
    res.sendFile(__dirname+"public/index.html");
});