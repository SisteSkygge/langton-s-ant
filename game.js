class Game{
    constructor(height, width){
        this.height = height;
        this.width = width;
        this.blackPixel = [];
    }

    ajouterPixel(x, y){
        blackPixel.push(x+y*width);
    }

    returnCase(antPos){
        if(antPos in blackPixel) return false;
        else return true;
    }

    loadMap(data){
        /*
            Charge la carte envoyé par le serveur
        
        */
       this.blackPixel.push("nothing");
    }
}