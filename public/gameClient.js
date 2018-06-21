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

    loadMap(data){
        /*
            Charge la carte envoyé par le serveur
        */
       data = data.split(',');
       for(var i=0;i<data.length;i++) this.ajouterPixel(data[i]);
    }
}