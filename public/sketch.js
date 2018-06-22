var debut = false;
var map;
var size = [];
const socket = io.connect('http://127.0.0.1:8080');

var sizeSetup = false;

var offsetX = 0;
var offsetY = 0;
var cote = 2;

function start_ant(){
    //Envoie un signal au serveur pour lui dire d'envoyer la carte du jeu et les actions de la fourmis et active la boucle principale
    socket.emit('S_SIZE');
    socket.on('R_SIZE', function(message){
        size.push(message.split(',')[0]);
        size.push(message.split(',')[1]);
    });
    socket.on('MAP', function(message){
        zlib.inflate(message, function(err, data){
            if(!err){
                map = data;
            }
            else console.log(err);
        });
    });
}

function setup(){
    frameRate(60);
}

function draw(){
    if(map!==undefined && size.length!=0){
        //init du canvas comme nous avons recu les informations du jeu
        if(sizeSetup==false){
            createCanvas(size[0]*cote, size[1]*cote);
            sizeSetup=true;
        }

        background(255);
        for(var i=0;i<map.length;i++){
            if(map[i]==1){
                let y = parseInt(i/size[0]);
                let x = i%size[0];
                fill(0);
                stroke(0);
                rect(offsetX+x*cote, offsetY+y*cote, cote, cote);
            }
        }
    }
}