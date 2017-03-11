import pyb
pyb.LED(1).on()


from pyb import Pin
pyb.LED(1).off()
led = None
switch = None


led = Pin('IO6',Pin.OUT_PP)
switch = Pin('IO0',Pin.IN)
for count in range(10):
  if (switch.value()) == 1:
    led.high()
  else:
    led.low()
  pyb.delay(int(1*1000))

