import pyb
pyb.LED(1).off()
from pyb import Pin
for count in range(10):
  pyb.LED(1).on()pyb.delay(int(1*1000))
  pyb.LED(1).off()pyb.delay(int(1*1000))
