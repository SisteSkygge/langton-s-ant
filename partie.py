from game import *
from ant import *
import time
from threading import Thread
import socket

delay = 1/250

class Partie(object):
    def __init__(self, socketManager):
        self.width = 200
        self.height = 200
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
        #self.socketManager.send_Message(zlib.compress(self.game.blackPixel.tobytes(), 9))
        self.socketManager.add_queue(self.game.blackPixel.tobytes())

class SocketManager(Thread):
    
    def __init__(self):
        Thread.__init__(self)
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.queue = []
        print('Ouverture du SocketManager')
        print('Envoie de données...')

    def run(self):
        while(1):
            if(len(self.queue)>0):
                self.send_Message(self.queue[0])
                del self.queue[0]
                time.sleep(delay)

    def send_Message(self, message):
        #print(message)
        self.socket.sendto(message, ('127.0.0.1', 13355))

    def add_queue(self, message):
        self.queue.append(message)
        

#Programme principal

partie = Partie(SocketManager())
while(1):
    partie.nextMove()
    partie.send_Map()
    time.sleep(delay)
