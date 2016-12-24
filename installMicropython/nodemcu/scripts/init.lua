for i = 1, 400000 do
end
gpio.mode(4, gpio.OUTPUT)
function start()
gpio.mode(9,gpio.INPUT)
gpio.write(4,gpio.LOW)
if gpio.read(9) == 1 then
	uart.setup(0,115200,8,0,1,1)
	dofile('iotmqtt.lua')
else
	uart.setup(0,115200,8,0,1,1)
	dofile('ap.lua')
end
end
start()
