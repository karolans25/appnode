#Instalación de µPython#

**No Actualizada información: 24 Dic 2016**

* Se debe primero instalar el stamp_WIFI_2 para poder instalar el micropython
desde el esp8266.

* Primero instalar el openocd en la versión 0.9.0. En debian strech, el precompilado
ya soporta el bit-bang, para instalarlo:
```
apt-get install openocd
```

* Desempaquetar el micropython y entrar en él:
```
tar xvfz micropython.tar
cd micropython/
```
* Ejecute el comando siguiente que se encargará de instalar micropython en el 
ARM:
```
openocd -f config.cfg
```
* Puede comprobar la instalación accediendo con el adaptador UART en los pines de 
conexión del SSE1 pero en éste caso al lado derecho (S_RX, S_TX y GND). El resultado
final será ver en la consola algo como lo siguiente:
```
minicom -o -b 115200 -D /dev/ttyUSB0
>>> MicroPython edb8d5c-dirty on 2016-07-01; F401NUCLEO with STM32F401xE
Type "help()" for more information.
>>> 
```

#Ejemplos MediaLab e IOT#

**Actualizado 24 Dic 2016**
Ahora el MediaLab soporta MQTT en modo SUBCRIPTOR o PUBLICADOR, puede hacer uso
de clientes MQTT (aplicaciones Android y/o otros) para monitorear el flujo de mensajería.
Medialab soporta Thingspeak en modo escritura hasta 8 campos.

Los ejemplos los encuentra en stm32f401_nucleoswhw/script/ y se pueden ejecutar con el siguiente 
comando en éste nivel:

```
./fileToSendSTM.py script/file.py sleep ip port
```
Donde:

* **sleep**: pensado cuando la conexión puede tardar entonces aumentar su valor, sleep está en segundos.
* **ip**: Dirección ip asignada al esp (conexión socket TCP).
* **port**: Puerto por donde escucha el servicio TCP.
* **file.py**: Archivo que se desea lanzar.

Ejemplo:

```
./fileToSendSTM.py script/station.py 0.05 192.168.4.1 3335
```

**Nota**: En ocasiones es oportuno hacer un reset del stm para borrar variables que ya
se estén usando.


Atentamente:

Carolina Pulido crpulidog@unal.edu.co

Johnny Cubides  jgcubidesc@unal.edu.co

Universidad Nacional
