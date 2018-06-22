class Ant(object):
    def __init__(self, startX, startY, screenWidth, screenHeight):
        self.x = startX
        self.y = startY
        self.screenWidth = screenWidth
        self.screenHeight = screenHeight
        self.direction = 0

    def deplacer(self, caseActuel):
        
        if(caseActuel==False):
            self.direction +=1
            if(self.direction>3):
                self.direction=0
            
        else:
            self.direction -=1
            if(self.direction<0):
                self.direction=3

        if(self.direction==0):
            self.x +=1
        if(self.direction==1):
            self.y -=1
        if(self.direction==2):
            self.x -= 1
        if(self.direction==3):
            self.y +=1

        self.teleport()

    def teleport(self):
        if(self.x<0):
            self.x = self.screenWidth
        if(self.x>self.screenWidth):
            self.x = 0

        if(self.y<0):
            self.y = self.screenHeight
        if(self.y>self.screenHeight):
            self.y = 0

    def translatePos(self):
        return self.x+self.y*self.screenWidth