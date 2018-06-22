import numpy

class Game(object):
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.blackPixel = numpy.zeros(width, height)

    def ajouterPixel(self):
        pass
    
    def returnColor(self):
        pass
    
    def exportMap(self):
        pass

    def getSize(self):
        pass