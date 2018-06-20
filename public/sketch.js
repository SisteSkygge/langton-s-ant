function start_ant(){
    //Envoie un signal au serveur pour lui dire d'envoyer la carte du jeu et les actions de la fourmis et active la boucle principale
    const socket = io.connect('http://176.143.194.216:8080');
    var game = new Game(640,640);
    
    socket.emit('S_DATA', "Ready to receive");
    socket.on('R_DATA', function(message){
        game.loadMap(message);
    });

    socket.on('ANT_M', function(message){
        game.ajouterPixel();
    });
}