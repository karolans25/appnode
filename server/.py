import pyb
from pyb import Pin
dist = None


from pyb import Timer, Pin
class mobile:
    pl = 100
    pr = 100
    def __init__(self):
        timerMotors = Timer(1, freq=1000)
        self.lPWM = timerMotors.channel(2, Timer.PWM, pin=Pin('SP_M0'))
        self.rPWM = timerMotors.channel(4, Timer.PWM, pin=Pin('SP_M1'))
        self.ld = Pin('DIR_M0', mode=Pin.OUT)
        self.rd = Pin('DIR_M1', mode=Pin.OUT)
    def calibration(self, l, r):
        self.pl = l
        self.pr = r
    def run(self, l, r):
        self.lPWM.pulse_width_percent(int(abs(l)*self.pl/100))
        self.rPWM.pulse_width_percent(int(abs(r)*self.pr/100))
        if l < 0:
            self.ld.low()
        else:
            self.ld.high()
        if r < 0:
            self.rd.low()
        else:
            self.rd.high()

movil = mobile()
movil.calibration(40,40)
movil.calibration(40,40)
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

p_SEN_U1 = ultrasonido(('SRV1'), ('SRV2'))
for count in range(1000000):
  dist = p_SEN_U1.distance_in_cm()
  if dist <= 12:
    movil.run(0,0)
    pyb.delay(10)
  else:
    movil.run(100,100)
    pyb.delay(10)
  pyb.delay(10)
