import threading
import socket
import time
from ant import *
from game import *

class Partie(Thread):
    
    def __init__(self):
        Thread.__init__(self)

    def run(self):
        pass

socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
socket.bind((('', 13150)))

t1 = time.time()

while(t1+1/30<time.time()):
    t1 = time.time()

    