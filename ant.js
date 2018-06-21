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
            this.direction += 1
            this.direction %= 4;
        }
        else{
            //tourne de 90° vers la droite
            this.direction -=1;
            if(this.direction<0) this.direction = 3;
        }

        if(this.direction==0) this.x +=1;
        if(this.direction==1) this.y +=1;
        if(this.direction==2) this.x -=1;
        if(this.direction==3) this.y -=1;

        this.teleporte();
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

module.exports = Ant;
