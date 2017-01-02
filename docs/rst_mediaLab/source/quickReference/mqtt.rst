MQTT
====


Concepto
++++++++

MQTT en sí es un protocolo de comunicación **publicación/suscripción**, se trata de mensajes 
clasificados según **asuntos** (*topics*) los cuales deben ser gestionados por un servidor
llamado **Broker**, los elementos conectados a éste servicio podrán publicar mensajes con
el respectivo asunto, otros dispositivos conectados al servicio podrán suscribirse a mensajes
con asuntos publicados; así, mensajes publicados serán enviados a los suscriptores por parte 
del Broker que hará de corredor "cartero".


Conexión física
---------------

        .. image:: imag/infraestructura.png

MQTT (Message Queue Telemetry Transport) funciona sobre TCP/IP, así que se requiere
un canal con esas características. En la imagen se pueden observar un ejemplo de
infraestructura, en él hay cuatro elementos conectados entre sí: dos media_lab, un celular 
que hace de interfaz de usuario (terminal) y una raspberry pi; la conexión es lograda 
a partir de una comunicación wifi.

La raspberry pi es la responsable de crear el punto de acceso wifi
y además de tener acceso a Internet por medio de su puerto de Ethernet.
Los demás dispositivos se conectarán como estaciones a esta pequeña red
con el fin de compartir en el canal información como lo es estados
y ordenes a partir de mensajes.


Comportamiento
--------------

De la imagen de *conexió física* se puede describir la infraestructura necesaria para hacer
uso del protocolo MQTT. 
Tanto en el celular (terminal) como en las dos tarjetas media_lab se debe contener software
**MQTT-cliente** el cual permita hacer la solicitudes de suscripción o publicación de mensajes;
en las tarjetas *media_lab* es logrado a partir de las librerías pre-instaladas, en el celular
el cliente debe ser instalado, si el celular es Android como en el ejemplo, basta con instalar 
un cliente MQTT, como es el caso de **MyMQTT** desde *Play Store*; la raspberry tiene la 
responsabilidad de alojar el **MQTT-broker**, para el ejemplo, el broker es el popular software 
denominado **mosquitto**, el cual ya es pre-configurado para raspbian-lite.

        .. image:: imag/infraestructuraMQTTejemplo.png

Ahora se explicará como los elementos interactúan a partir del flujo de mensajes;
la explicación será realizada a partir de un ejemplo:

1. El servicio MQTT-broker debe ser iniciado en la raspberry; **mosquitto** se inicia
   en la raspberry, escuchará por el puerto 1883 y estará listo para gestionar la 
   mensajería según publicaciones, suscripciones y asuntos (*topic*).

2. Los demás dispositivos como tarjetas *media_lab* y celulares deben conectarse a la dirección
   del servicio (dirección IP de la raspberry) especificando el puerto por el cual **mosquitto**
   escucha (por defecto es 1883).

3. Los dispositivos que desean **suscribirse** a la mensajería, deben hacerlo a el **MQTT-broker**
   especificando los asuntos que sean de interés; en la imagen, el celular solicita al broker
   suscribirse al *asunto 1* y al *asunto 2*, *MediaLab 2* solicita suscribirse al *asunto 1*
   y al *asunto 3* 

4. Cualquier dispositivo conectado al servicio puede **publicar** mensajes con el asunto que
   desee, el broker se encargará de gestionar el flujo y hacer llegar a los dispositivos 
   suscritos el mensaje correspondiente. Así entonces, el celular recibe información de ambas
   tarjetas ya que ambas publican asuntos a los cuales el celular está suscrito, del mismo
   modo, MediaLab 2 está suscrito a publicaciones de MediaLab 1 con el asusto 1, Además,
   MediaLab 2 está suscrita a mensajes provenientes del celular.

Se puede pensar entonces, que los dispositivos tendrán entre ellos un **"chat"** el cual permite
que **"las cosas"** hablen entre ellas. Si pensamos un poco más afuera de lo que se ha mencionado,
se pude pensar que una máquina le puede dar una orden a otra para que cambie su estado y entonces
los mensajes no solo serán informativos, sino tomas de decisiones en sistemas máquina-máquina donde
poco o nada habrá intervención del hombre.


Iniciar clientes MQTT
+++++++++++++++++++++


        .. image:: imag/init_mqtt_client.png



MQTT Publicar
+++++++++++++


        .. image:: imag/mqtt_pub.png


MQTT Suscribir
++++++++++++++


        .. image:: imag/mqtt_sub.png


        .. image:: imag/mqtt_sub_fun.png
