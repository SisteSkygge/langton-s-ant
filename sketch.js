function start_ant(){
    //Envoie un signal au serveur pour lui dire d'envoyer la carte du jeu et les actions de la fourmis et active la boucle principale
    const socket = io.connect('http://176.143.194.216:8080');
}

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

class Ant{
    constructor(startX, startY, screenWidth, screenHeight){
        this.x = startX;
        this.y = startY
        this.direction = 4;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    deplacer(caseActuel){
        /*
            Convertit le chiffre de direction en une vrai direction
            Puis change la direction de la fourmis en fonction de la case

            caseActuel false -> case noir
            caseActuel true -> case blanche
        */
        if(caseActuel==false){
            //tourne de 90° vers la gauche
            direction += 1
            direction %= 4;
        }
        else{
            //tourne de 90° vers la droite
            direction -=1;
            if(direction<0) direction = 3;
        }

        if(this.direction==0) this.x +=1;
        if(this.direction==1) this.y +=1;
        if(this.direction==2) this.x -=1;
        if(this.direction==3) this.y -=1;

        teleporte();
    }

    teleporte(){
        //Si la fourmis sort du cadre on la teleporte à l'oppose

        //X
        if(this.x<0) this.x = this.screenWidth;
        if(this.x>this.screenWidth) this.x = 0;

        //Y
        if(this.y>this.screenHeight) this.y = 0;
        if(this.y<0) this.y = this.screenHeight;
    }

    translatePos(){
        return this.x+this.y*this.screenWidth;
    }
}