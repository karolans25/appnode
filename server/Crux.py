import pyb
pyb.LED(1).on()


from pyb import Pin
pyb.LED(1).off()
sensor = None
intensidad_de_luz = None


from pyb import ADC
sensor = ADC(Pin('SEN3'))
from pyb import Pin, Timer
class servomotor:
    def __init__(self, pin):
        timer = Timer(4, freq=200)
        self.ch = timer.channel(5-pin, Timer.PWM, pin=Pin('SRV'+str(pin)))
    def angulo(self,x):
        if 0 <= x and x <= 180:
            self.ch.pulse_width(4800+int(x*15600/180))


Servo_1 = servomotor(1)
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
  intensidad_de_luz = sensor.read()
  command(('MQTT_PUB\r'+str('luz')+'\r'+str(intensidad_de_luz)+'\r'),30)
  pyb.delay(50)
  if intensidad_de_luz > 2000:
    pyb.LED(1).on()
    Servo_1.angulo(45)
  else:
    pyb.LED(1).off()
    Servo_1.angulo(135)
  pyb.delay(int(200))

