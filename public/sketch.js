var debut = false;
var game;
const socket = io.connect('http://127.0.0.1:8080');

var sizeSetup = false;

function start_ant(){
    //Envoie un signal au serveur pour lui dire d'envoyer la carte du jeu et les actions de la fourmis et active la boucle principale
    socket.emit('S_SIZE');
    socket.on('R_SIZE', function(message){
        game = new Game(parseInt(message.split(',')[0]), parseInt(message.split(',')[1]));
        //console.log("Taille de l'écran : ",message);
    });
    
    socket.emit('S_DATA');
    socket.on('R_DATA', function(message){
        //console.log("Map received !",message);
        game.loadMap(message);
        debut = true;
    });

    socket.on('ANT_M', function(message){
        if(game!==undefined){
            game.ajouterPixel(message);
            //console.log("Update received !",message);
        }
    });
}

function setup(){
    frameRate(30);
}

function draw(){
    if(debut!=false && game!==undefined){
        //console.log('On dessine !');
        //init du canvas comme nous avons recu les informations du jeu
        if(sizeSetup==false){
            createCanvas(game.width, game.height);
            //console.log(game.width, game.height);
            background(225);
            sizeSetup=true;
        }
    }
    else{
        //console.log('On dessine pas');
    }
}