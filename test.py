from numpy import zeros
import zlib
a = zeros((640,640), dtype=bool)
b = a.tobytes()
c = zlib.compress(b)

with open('dump.bin', 'wb') as file:
    file.write(c)
    file.close()