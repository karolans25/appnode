#! /usr/bin/python
# -*- coding: utf-8 -*-

# python myEspTool.py archivo.lua delay(seconds) pathTtyUsb 

import sys, serial, time

nameFile = sys.argv[1]
timeDelay = float(sys.argv[2])
nameUart = sys.argv[3]

uart  = serial.Serial(nameUart, 115200, timeout=1)

def main():
    uart.write(';\n\r')
    time.sleep(0.2) # Delay for 200mS
    with open(nameFile) as fp: 
        for line in fp:
            for x in line:
                uart.write(str(x))
                time.sleep(timeDelay)
            print(line)

main()
