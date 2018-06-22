var dgram = require('dgram');
var zlib = require('zlib');

const server = dgram.createSocket('udp4');

server.on('message', function(message){
    //console.log(message);
    zlib.inflate(message, function(err, data){
        if(!err){
            console.log(data[0]);
        }
        else console.log(err);
    });
});

server.bind(13355);