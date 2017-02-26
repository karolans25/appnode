# Esp programas para nodemcu, ESP como esclavo del STM #

Se había pensado en que el esp8266 tuviera un firmware compilado con la herramienta de Arduino,
pero montar el interprete nodemcu en esp8266 da mayor flexibilidad y por ende prestaciones.

Los archivos que se encuentran en scripts/ pretenden mostrar la flexibilidad querida.

**Nota**: Si el interprete nodeMcu no se inicia en el esp8266 de mediaLab puede ser debido
a problemas físicos en la tarjeta (como son soldaduras entre otros)

A continuación se presentan los archivos y sus prestaciones:

* **ap.lua**: Cuando se pone el pin uart_rx (en nodemcu D9 -> 9) del esp8266 a GND (cero lógico), el
archivo ap.lua es ejecutado. El esp8266 es iniciado en modo PUNTO DE ACCESO. Logrado el punto de acceso,
generar el puente entre el stm y el esp con los jumpers (lrx-stx y ltx-srx) y reset el esp (también puede
apagar la placa) de esta manera queda lista para ser programada por conexion TCP (telnet).

* **iotmqtt.lua**: Al dejar el puente entre el stm y el esp el archivo iotmqtt.lua es ejecutado, dando todas
las prestaciones requeridas para MQTT, ThingSpeak e inclusive cambiar de nuevo al esp a modo STATION,
controlando variables como essid y password. En sí es el modo en el que quedará siempre para programación.

* **init.lua**: El init.lua es el programa en el que se empieza la ejecución y se decide qué archivo
iniciar dependiendo del estado del pin D9 en nodemcu 

##Notas##

* El único modo donde puede reescribir los file (por ejemplo, haciendo uso de nodemcu-uploader) es ap.lua
* En modo accespoint el essid es: medialab_xxxxx y el password es 12345678.
* La manera de poner el D9 de nodemcu en 0 (GND) es usar el jumper y cambiarlo de orientación, es decir,
en vez de ser puente entre stm y esp es voltearlo y dejarlo entre GND y LRX. 

#Upload Files#

Instalar desde los repositorios nodemcu-uploader e instalar en nodemcu:

ap.lua, iotmqtt.lua, init.lua.

Ejemplo:

```
nodemcu-uploader --port /dev/ttyUSB0 upload iotmqtt.lua
```

Atentamente:

Carolina Pulido crpulidog@unal.edu.co

Johnny Cubides  jgcubidesc@unal.edu.co

Universidad Nacional

