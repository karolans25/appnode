import pyb
pyb.LED(1).on()


from pyb import Pin
pyb.LED(1).off()
sensor_de_humedad_2 = None
medida = None


from pyb import ADC
sensor_de_humedad_2 = ADC(Pin('SEN1'))
from pyb import UART
uart = UART(1,115200)
s2e = Pin('CONFIG',Pin.OUT_PP)
def command(dataToSend,sleepTime):
 uart.writechar(ord('\r'))
 pyb.delay(sleepTime)
 s2e.high()
 for x in dataToSend:
  uart.writechar(ord(x))
  pyb.delay(sleepTime)
 s2e.low()
 print('')

command(('MQTT_INIT\r'+str('10.81.139.2')+'\r'+str('1883')+'\r'+str('sensor de humedad 2')+'\r'),30)
pyb.delay(50)
while True:
  medida = sensor_de_humedad_2.read()
  command(('MQTT_PUB\r'+str('sensor de humedad 2')+'\r'+str(medida)+'\r'),30)
  pyb.delay(50)
  if medida > 10:
    pyb.LED(1).on()
  else:
    pyb.LED(1).off()
  pyb.delay(int(200))

