#! /usr/bin/python
# -*- coding: utf-8 -*-

# python fileToSendSTM.py archivo.py delay(seconds) ip port 

import sys, serial, time, socket

nameFile = sys.argv[1]
timeDelay = float(sys.argv[2])
ip = sys.argv[3]
port = int(sys.argv[4])

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
