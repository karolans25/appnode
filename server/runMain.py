#! /usr/bin/python
# -*- coding: utf-8 -*-

# python fileToSendSTM.py ip port archivo.py 

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
    with open(nameFile) as fp: 
        for line in fp:
            s.send(line+'\r')
            time.sleep(timeDelay)
            print(line)

main()
s.close()
