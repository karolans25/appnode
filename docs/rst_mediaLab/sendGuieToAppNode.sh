#!/bin/bash
#cp -r * ../../rasp/appNode/public/guias/

scp -r ./build/html pi@192.168.2.1:/home/pi/appNode/public/guias/build/
