from game import *
from ant import *
import time
from threading import Thread
import socket
import zlib

class Partie(object):
    def __init__(self, socketManager):
        self.width = 100
        self.height = 100
        self.game = Game(self.width, self.height)
        self.ant = Ant(int(self.width/2), int(self.height/2), self.width, self.height)
        self.socketManager = socketManager
        self.socketManager.start()

    def nextMove(self):
        antPosX = self.ant.x
        antPosY = self.ant.y
        caseColor = self.game.returnColor(antPosX, antPosY)
        self.ant.deplacer(caseColor)
        self.game.ajouterPixel(antPosX, antPosY)

    def send_Map(self):
        self.socketManager.send_Message(zlib.compress(self.game.blackPixel.tobytes(), 9))

class SocketManager(Thread):
    
    def __init__(self):
        Thread.__init__(self)
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        print('Ouverture du SocketManager')
        print('Envoie de données...')

    def send_Message(self, message):
        #print(message)
        self.socket.sendto(message, ('127.0.0.1', 13355))
        

#Programme principal

partie = Partie(SocketManager())
delay = 1/60

while(1):
    partie.nextMove()
    partie.send_Map()
    time.sleep(delay)
