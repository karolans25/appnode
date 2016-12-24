#!/bin/bash

command=${1:-help}
port=${2:-ttyUSB0}
baude=${3:-230400}

if [ "$command" = "esp_jtag" ]; then
	echo "Subiendo wifi para instalar micropython con openocd 0.9v"
	esptool.py -p /dev/$port -b $baude write_flash 0x00000 esp_jtag.bin
fi

if [ "$command" = 'micropython' ]; then
	echo "Instalando Micropython en STM32F401 NUCLEO"
	openocd -f config.cfg
fi

if [ "$command" = 'esp_erase' ]; then
	echo "Borrado de esp"
	esptool.py --port /dev/$port erase_flash
fi

if [ "$command" = 'esp_nodemcu' ]; then
	echo "Instalando nodemcu en esp"
	esptool.py --port /dev/$port --baud $baude write_flash --flash_size=detect -fm dio 0 nodemcu/nodemcu-float.bin
fi

if [ "$command" = 'esp_ap' ]; then
	echo "Esp como Access Point final"
	esptool.py -p /dev/$port -b $baude write_flash 0x00000 esp_ap.bin
fi

if [ "$command" = 'install_esptool' ]; then
	echo "Clonando repositorio esptool"
	echo "Por favor tener instalado git y python-setuptools"
	git clone https://github.com/espressif/esptool.git
	cd esptool/
	sudo python setup.py install
fi

if [ "$command" = 'help' ]; then
	echo "AYUDA"
	echo "====="
	echo ""
	echo "./micropythonInstall.sh [command] [baude] [port]"
	echo ""
	echo "command: [esp_jtag] [micropython] [esp_ap] [help]"
	echo "port: [ttyUSB0] [ttyUSB1] ..."
	echo "baude: [115200] [230400] ..."
	echo ""
	echo "Ejemplo:"
	echo "./micropythonInstall.sh esp_jtag 115200 230400"
	echo ""
	echo ""
	echo "INSTALAR MICROPYTHON EN MEDIA LAB"
	echo "================================="
	echo ""
	echo "Primero compruebe que tenga instalado esptool, si no es asi,"
	echo "asegurese de tener instalado git y python-setuptools, luego"
	echo "ejecute el comando:"
	echo "		./micropythonInstall.sh install_esptool"
	echo ""
	echo "Paso 1: Conectar adaptador ttl-usb al esp8266 y hacer reset en el"
	echo "	esp8266 con el jumper"
	echo "	ejecutar comando:"
	echo "		./micropythonInstall.sh esp_jtag"
	echo ""
	echo "Paso 2: Conectarse a la red wifi generada por el esp8266"
	echo "	usar los jumper para conectar el stm32 con el esp8266"
	echo "	ejecutar comando:"
	echo "		./micropythonInstall.sh micropython"
	echo ""
	echo "Paso 3: Conectar adaptador ttl-usb al esp8266 y hacer reset en el"
	echo "	esp8266 con el jumper"
	echo "	ejecutar comando:"
	echo "		./micropythonInstall.sh esp_erase"
	echo ""
	echo "Paso 4: Conectar adaptador ttl-usb al esp8266 y hacer reset en el"
	echo "	esp8266 con el jumper"
	echo "	ejecutar comando:"
	echo "		./micropythonInstall.sh esp_nodemcu"
#	echo "Paso 3: Conectar adaptador ttl-usb al esp8266 y hacer reset en el"
#	echo "	esp8266 con el jumper"
#	echo "	ejecutar comando:"
#	echo "		./micropythonInstall.sh esp_ap"
#	echo "Paso 4 Conectarse a la red generada por el esp8266 y abrir"
#	echo "	la aplicación Micropython IDE para probar comunicación"
	echo ""
	echo "Con eso ha terminado el proceso." 
	echo "gracias por usar el script `whoami`."
	echo ""
	echo "Atentamente: Carolina Pulido, Johnny Cubides"
	echo "Universidad Nacional de Colombia"
fi
