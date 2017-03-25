import pyb
pyb.LED(1).on()


from pyb import Pin
pyb.LED(1).off()
sensor_1 = None
humedad1 = None


from pyb import ADC
sensor_1 = ADC(Pin('SEN1'))
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

command(('MQTT_INIT\r'+str('10.81.139.2')+'\r'+str('1883')+'\r'+str('10')+'\r'),30)
pyb.delay(50)
while True:
  humedad1 = sensor_1.read()
  command(('MQTT_PUB\r'+str('humedad 1')+'\r'+str(humedad1)+'\r'),30)
  pyb.delay(50)
  if humedad1 > 2000:
    pyb.LED(1).on()
  else:
    pyb.LED(1).off()
  pyb.delay(int(200))

