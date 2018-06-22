import socket
import zlib
import pickle
import numpy

serverSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
serverSocket.bind(('127.0.0.1', 13355))

while(1):
    r = serverSocket.recvfrom(2048)
    print(r)
    r = zlib.decompress(r)
    a = numpy.fromstring(r, dtype=bool)
    print(len(a))