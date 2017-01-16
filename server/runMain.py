#! /usr/bin/python
# -*- coding: utf-8 -*-

# python runMain.py ip port archivo.py 

#import sys, serial, time, socket
import sys, time, socket

ip = sys.argv[1]
port = int(sys.argv[2])
nameFile = sys.argv[3]
timeDelay = float(0.05) 
#La velocidad del delay debe estar entre 30 y 100 [ms]

s = socket.socket()
s.connect((ip, port))

def main():
    s.send('\r')
    time.sleep(0.2) # Delay for 200mS
    s.send('import pyb\r')
    s.send('receivedLed = pyb.LED(1)\r')
    s.send('receivedLed.on()\r')
    s.send('\x05')  # Start mode paste
    with open(nameFile) as fp: 
        for line in fp:
            s.send(line+'\r')
            time.sleep(timeDelay)
            print(line)
    s.send('\x04')  # Execute
    s.send('receivedLed.off()\r')

main()
s.close()
