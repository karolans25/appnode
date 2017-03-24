import pyb
pyb.LED(1).on()


from pyb import Pin
pyb.LED(1).off()
triga = None
eco = None
distancia = None
medida = None
sonido = None


class ultrasonido:
    def __init__(self, tPin, ePin):
        self.triggerPin = tPin
        self.echoPin = ePin
        self.trigger = pyb.Pin(self.triggerPin)
        self.trigger.init(pyb.Pin.OUT_PP, pyb.Pin.PULL_NONE)
        self.trigger.low()
        self.echo = pyb.Pin(self.echoPin)
        self.echo.init(pyb.Pin.IN, pyb.Pin.PULL_NONE)
    def distance_in_inches(self):
        return (self.distance_in_cm() * 0.3937)
    def distance_in_cm(self):
        start = 0
        end = 0
        micros = pyb.Timer(2, prescaler=83, period=0x3fffffff)
        micros.counter(0)
        self.trigger.high()
        pyb.udelay(10)
        self.trigger.low()
        while self.echo.value() == 0:
            start = micros.counter()
        while self.echo.value() == 1:
            end = micros.counter()
        micros.deinit()
        # Calc the duration of the recieved pulse, divide the
        # result by 2 (round-trip) and divide it by 29 (the
        # speed of sound is 340 m/s and that is 29 us/cm).
        dist_in_cm = (end - start) / 29
        return dist_in_cm

triga = Pin('SRV1',Pin.OUT_PP)
eco = Pin('SRV2',Pin.IN)
p_SEN_U1 = ultrasonido(triga, eco)
while True:
  distancia = p_SEN_U1.distance_in_cm()
  medida = sonido.read()
if distancia > 2:
  pyb.LED(1).on()
else:
  pyb.LED(1).off()

