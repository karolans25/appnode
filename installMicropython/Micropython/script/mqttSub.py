import pyb  #Necesario delay...
from pyb import Pin as P # Para usar GPIO
from pyb import UART    # solo hay una UART ativa (1)
from pyb import LED

uart = UART(1,115200)   # Sincronizada con nodemcu
p = P('CONFIG',P.OUT_PP)    #Pin CONFIG en modo salida para activar comandos

broker = '192.168.2.1'
port = '1883'
myid = '120'
topic1 = 'iot'
topic2 = 'led'
# MQTT_INIT -> Start mqtt Sub y Pub
mqttinit = 'MQTT_INIT\r'+broker+'\r'+port+'\r'+myid+'\r' #Estructura del comando a enviar
#MQTT_SUB -> Se subscribe a un topic, se ha probado 2 se espera hasta 3 ...
sub = 'MQTT_SUB\r'+topic1+'\r'+topic2+'\r'

def command(dataToSend,time):
    uart.writechar(ord('\r'))   # Importante para limpiar la uart de los comandos 
    pyb.delay(time)             # Espeara que pueda recibir los siguientes comandos
    p.high()                    # Entrando en modo comandos
    for x in dataToSend:        # Lee y envia uno a uno los caracteres
        uart.writechar(ord(x))  # Cada string (caracter) lo convierte en su valor entero para ser enviado por la uart
        pyb.delay(time)         # Sincroniza y espara a nodemcu si es necesario
    p.low()                     # Sale del modo comando
    print('')                   # Ejecuta la tarea

led = LED(1)

def mqtt_sub(topic,data):
    if topic == 'iot':
        if data == 'toggle':
            led.toggle()
    elif topic == 'led':
        if data == 'ON':
            led.on()
        elif data == 'OFF':
            led.off()


command(mqttinit,30)               # Ejemplo de uso del comando
command(sub,30)

