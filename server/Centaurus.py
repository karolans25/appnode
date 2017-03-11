import pyb
pyb.LED(1).on()


from pyb import Pin
pyb.LED(1).off()
i2c = None
devices = None
item = None


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

command(('MQTT_INIT\r'+str('10.81.139.2')+'\r'+str('1883')+'\r'+str('i2c')+'\r'),30)
from pyb import I2C
i2c = I2C(1,I2C.MASTER, baudrate=400000)
for count in range(10):
  devices = item.scan()
  command(('MQTT_PUB\r'+str('devices')+'\r'+str(devices)+'\r'),30)
  pyb.delay(50)
  pyb.delay(int(1*1000))

