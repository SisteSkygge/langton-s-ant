var Game = class{
    constructor(height, width){
        this.height = height;
        this.width = width;
        this.blackPixel = [];
    }

    ajouterPixel(antPos){
        if(this.blackPixel.indexOf(parseInt(antPos))!=-1) this.blackPixel.splice(this.blackPixel.indexOf(antPos), 1);
        else this.blackPixel.push(antPos);
    }

    returnColor(antPos){
        if(this.blackPixel.indexOf(parseInt(antPos))!=-1) return false;
        else return true;
    }

    exportMap(){
        /*
            Charge la carte envoyé par le serveur
        
        */
       return this.blackPixel.toString();
    }

    getLastPixel(){
        //retourne le dernier pixel de la liste AKA le dernier rajouter
        if(this.blackPixel.length<=0) return null;
        else return this.blackPixel[this.blackPixel.length-1];
    }

    getSize(){
        return `${this.width},${this.height}`;
    }
}

module.exports = Game;
