import pyb  #Necesario delay...
from pyb import Pin as P # Para usar GPIO
from pyb import UART    # solo hay una UART ativa (1)
uart = UART(1,115200)   # Sincronizada con nodemcu
p = P('CONFIG',P.OUT_PP)    #Pin CONFIG en modo salida para activar comandos

broker = '192.168.2.1'
port = '1883'
myid = '120'
# MQTT_INIT -> Start mqtt Sub y Pub
mqttinit = 'MQTT_INIT\r'+broker+'\r'+port+'\r'+myid+'\r' #Estructura del comando a enviar

mensaje = '1234'
topic = 'iot'
#MQTT_PUB -> Publica un topic
pub = 'MQTT_PUB\r'+topic+'\r'+mensaje+'\r'

def command(dataToSend,time):
    uart.writechar(ord('\r'))   # Importante para limpiar la uart de los comandos 
    pyb.delay(time)             # Espeara que pueda recibir los siguientes comandos
    p.high()                    # Entrando en modo comandos
    for x in dataToSend:        # Lee y envia uno a uno los caracteres
        uart.writechar(ord(x))  # Cada string (caracter) lo convierte en su valor entero para ser enviado por la uart
        pyb.delay(time)         # Sincroniza y espara a nodemcu si es necesario
    p.low()                     # Sale del modo comando
    print('')                   # Ejecuta la tarea

command(mqttinit,30)               # Ejemplo de uso del comando
command(pub,30)
