import pyb
from pyb import Pin as P
from pyb import UART
uart = UART(1,115200)
p = P('CONFIG',P.OUT_PP)
essid = 'luna'
password = '12345678'
#STA -> Wifi_Station
sta = 'STA\r'+essid+'\r'+password+'\r'
def command(dataToSend,time):
    uart.writechar(ord('\r'))
    pyb.delay(time)
    p.high()
    for x in dataToSend:
        uart.writechar(ord(x))
        pyb.delay(time)
    p.low()
    print('')

command(sta,30)
