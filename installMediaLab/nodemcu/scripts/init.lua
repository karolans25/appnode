tmr.delay(2000000)
gpio.mode(4, gpio.OUTPUT)
function start()
gpio.mode(9,gpio.INPUT)
gpio.write(4,gpio.LOW)
if gpio.read(9) == 1 then
	uart.setup(0,115200,8,0,1,1)
	if file.exists("main.py") then
		uart.write(0,0x04)
		tmr.delay(1000000)
		local fileline
		file.open("main.py", "r")
		repeat
			fileline = file.readline()
			if fileline then
				uart.write(0,fileline)
				tmr.delay(20000)
			end
		until fileline == nil
			file.close()
			collectgarbage()
			dofile('iot.lua')
	else
		collectgarbage()
		dofile('iot.lua')
	end
else
	uart.setup(0,115200,8,0,1,1)
	dofile('apst.lua')
end
end
start()
