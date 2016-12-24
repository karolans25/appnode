import pyb  #Necesario delay...
from pyb import Pin as P # Para usar GPIO
from pyb import UART    # solo hay una UART ativa (1)
uart = UART(1,115200)   # Sincronizada con nodemcu
p = P('CONFIG',P.OUT_PP)    #Pin CONFIG en modo salida para activar comandos

field1 = 13
field2 = 14
key = '11VXOBTU2X8BQIPS'
#TWS -> ThingSpeakWrite
thingSpeak = 'TSW\r'+key+'\r'+str(field1)+'\r'+str(field2)+'\r' #hasta 8 campos

def command(dataToSend,time):
    uart.writechar(ord('\r'))   # Importante para limpiar la uart de los comandos 
    pyb.delay(time)             # Esperar que pueda recibir los siguientes comandos
    p.high()                    # Entrando en modo comandos
    for x in dataToSend:        # Lee y envia uno a uno los caracteres
        uart.writechar(ord(x))  # Cada string (caracter) lo convierte en su valor entero para ser enviado por la uart
        pyb.delay(time)         # Sincroniza y espara a nodemcu si es necesario
    p.low()                     # Sale del modo comando
    print('')                   # Ejecuta la tarea

command(thingSpeak,30)          # Ejemplo de uso del comando
