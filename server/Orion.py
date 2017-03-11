import pyb
pyb.LED(1).on()


from pyb import Pin
pyb.LED(1).off()
i2c = None
Hora = None


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

command(('MQTT_INIT\r'+str('10.81.139.2')+'\r'+str('1883')+'\r'+str('iot')+'\r'),30)
pyb.delay(50)
from pyb import I2C
DS3231_I2C_ADDR = 104

def bcd2dec(bcd):
 return (((bcd & 0xf0) >> 4) * 10 + (bcd & 0x0f))

def dec2bcd(dec):
 tens, units = divmod(dec, 10)
 return (tens << 4) + units

def get_time_rtc(self):
 timebuf = bytearray(7)
 data = self.mem_read(timebuf, DS3231_I2C_ADDR, 0)
 ss = bcd2dec(data[0])
 mm = bcd2dec(data[1])
 if data[2] & 0x40:
 	hh = bcd2dec(data[2] & 0x1f)
 	if data[2] & 0x20:
 		hh += 12
 else:
 	hh = bcd2dec(data[2])
 wday = data[3]
 DD = bcd2dec(data[4])
 MM = bcd2dec(data[5] & 0x1f)
 YY = bcd2dec(data[6])
 if data[5] & 0x80:
 	YY += 2000
 return (YY, MM, DD, hh, mm, ss, wday -1, 0)

def get_time(self):
 timebuf = bytearray(7)
 data = self.mem_read(timebuf, DS3231_I2C_ADDR, 0)
 ss = bcd2dec(data[0])
 mm = bcd2dec(data[1])
 if data[2] & 0x40:
 	hh = bcd2dec(data[2] & 0x1f)
 	if data[2] & 0x20:
 		hh += 12
 else:
 	hh = bcd2dec(data[2])
 return (hh, mm, ss)

def save_time(self, YY, MM, DD, wday, hh, mm, ss, subsec):
 self.mem_write(dec2bcd(ss), DS3231_I2C_ADDR, 0)
 self.mem_write(dec2bcd(mm), DS3231_I2C_ADDR, 1)
 self.mem_write(dec2bcd(hh), DS3231_I2C_ADDR, 2)
 self.mem_write(dec2bcd(DD), DS3231_I2C_ADDR, 4)
 self.mem_write(dec2bcd(MM) | 0b10000000, DS3231_I2C_ADDR, 5)
 self.mem_write(dec2bcd(YY-2000), DS3231_I2C_ADDR, 6)
i2c = I2C(1,I2C.MASTER, baudrate=400000)
for count in range(100):
  Hora = get_time(i2c)

  command(('MQTT_PUB\r'+str('Hora')+'\r'+str(Hora)+'\r'),30)
  pyb.delay(50)
  pyb.delay(int(500))

