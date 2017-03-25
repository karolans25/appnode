import pyb


def blink():
 LED = pyb.LED(1)
 spi = pyb.SPI(1)
LED.toggle()
 return

blink()

