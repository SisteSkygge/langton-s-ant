var debut = false;
var map;
var previousMap;
var size = [];
const socket = io.connect('http://176.143.194.216:8080');

var sizeSetup = false;

var offsetX = 0;
var offsetY = 0;
var cote = 5;

function start_ant(){
    //Envoie un signal au serveur pour lui dire d'envoyer la carte du jeu et les actions de la fourmis et active la boucle principale
    socket.emit('S_SIZE');
    socket.on('R_SIZE', function(message){
        size=[message.split(',')[0], message.split(',')[1]];
    });
    socket.on('MAP', function(message){
        //console.log(message);
        map = new Uint8Array(message);
        //console.log(map);
    });
}

function mapDiff(previousMap, map){
    let diff = [];
    for(var i=0;i<map.length;i++){
        if(previousMap[i]!=map[i]) diff.push(i);
    }
    return diff;
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
        if(previousMap===undefined && map!==undefined){
            //On dessine toutes les cases
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
        else{
            let difference = mapDiff(previousMap, map);
            for(var i=0;i<difference.length;i++){

                let y = parseInt(difference[i]/size[0]);
                let x = difference[i]%size[0];
                //console.log(`x : ${x}, y : ${y}`);

                if(map[difference[i]]==1){
                    //Noir
                    fill(0)
                    stroke(0)
                    rect(offsetX+x*cote, offsetY+y*cote, cote, cote);
                }
                else{
                    //blanc
                    fill(255)
                    stroke(255)
                    rect(offsetX+x*cote, offsetY+y*cote, cote, cote);
                }
            }
        }
        previousMap = map;
    }
}
