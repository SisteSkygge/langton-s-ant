import numpy
import zlib
a = numpy.zeros((640,640), dtype=bool)
b = a.tobytes()
c = zlib.compress(b)

with open('dump.bin', 'wb') as file:
    file.write(c)
    file.close()

with open('dump.bin', 'rb') as file:
    b = zlib.decompress(file.readline())
    a = numpy.fromstring(b, bool)
    print(a[0:10])
    file.close()
