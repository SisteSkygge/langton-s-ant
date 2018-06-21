var debut = false;
var game;
const socket = io.connect('http://127.0.0.1:8080');

var sizeSetup = false;

var offsetX = 0;
var offsetY = 0;
var cote = 10;

function start_ant(){
    //Envoie un signal au serveur pour lui dire d'envoyer la carte du jeu et les actions de la fourmis et active la boucle principale
    socket.emit('S_SIZE');
    socket.on('R_SIZE', function(message){
        game = new Game(parseInt(message.split(',')[0]), parseInt(message.split(',')[1]));
    });
    
    socket.emit('S_DATA');
    socket.on('R_DATA', function(message){
        game.loadMap(message);
        debut = true;
    });

    socket.on('ANT_M', function(message){
        if(game!==undefined){
            game.ajouterPixel(message);
        }
    });
}

function translatePosToY(pos, screenWidth){
    return parseInt(pos/screenWidth);
}

function translatePosToX(pos, screenWidth){
    return pos%screenWidth;
}

function setup(){
    frameRate(30);
}

function draw(){
    if(debut!=false && game!==undefined){
        //init du canvas comme nous avons recu les informations du jeu
        if(sizeSetup==false){
            createCanvas(game.width*cote, game.height*cote);
            //console.log(game.width, game.height);
            background(225);
            sizeSetup=true;
        }

        background(255);

        //Dessine les pixels noirs
        for(var i=0;i<game.blackPixel.length;i++){
            fill(0);
            stroke(0);
            rect(offsetX+translatePosToX(game.blackPixel[i], game.width)*cote, offsetY+translatePosToY(game.blackPixel[i], game.width)*cote, cote, cote);
        }
    }
}