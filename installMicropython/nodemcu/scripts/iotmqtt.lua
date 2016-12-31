gpio.mode(0, gpio.INPUT)
gpio.mode(4, gpio.OUTPUT)
stm = {}
stm_out = false
MQTT_Client = nil

function thingspeak(apikey, datas)
gpio.write(4,gpio.LOW)
conn=net.createConnection(net.TCP, 0)
conn:on("connection",function(conn, payload)
cmd ="POST /update.json?api_key="..apikey..datas.." HTTP/1.1\r\n"
.. "Host: api.thingspeak.com\r\n"
.. "Connection: close\r\n"
.. "Accept: */*\r\n"
.. "User-Agent: Mozilla/4.0 (compatible; esp8266 Lua; Windows NT 5.1)\r\n"
.. "\r\n";
conn:send(cmd); 
end)
conn:on("receive", function(conn, payload)
gpio.write(4,gpio.HIGH)   
conn:close()
end)
conn:connect(80,'api.thingspeak.com') 
end

function mosquitto_init(broker,port,id)
	MQTT_Client = mqtt.Client(id,120,"","")
	MQTT_Client:on("connect", function(conMqtt)
		gpio.write(4,gpio.LOW)
	end)
	MQTT_Client:on("offline", function(connMqtt) 
		gpio.write(4,gpio.HIGH)
	end)
	MQTT_Client:on("message", function(conn, topic, data)
		gpio.write(4,gpio.LOW)
		if data ~= nil then
			uart.write(0,'mqtt_sub(\''..topic..'\',\''..data..'\')\n\r')
			gpio.write(4,gpio.HIGH)
		end
	end)
	MQTT_Client:connect(broker, port, 0, function(connMqtt)
		gpio.write(4,gpio.LOW)
	end)	
end

function mosquitto_sub()
	gpio.write(4,gpio.LOW)
	local topicn = table.getn(stm)
	for i = 1, topicn do
		MQTT_Client:subscribe(string.gsub(table.remove(stm,1),'\r',""),0, function(conn) end)
	end
	gpio.write(4,gpio.HIGH)
end

function mosquitto_pub(topic,mensaje)
	gpio.write(4,gpio.LOW)
	MQTT_Client:publish(topic, mensaje, 0, 0, function(connMqtt)
		gpio.write(4,gpio.HIGH)
	end)
end

function wifi_station_start()
gpio.write(4,gpio.LOW)
wifi.setmode(wifi.STATION)
station_cfg={}
station_cfg.ssid=string.gsub(table.remove(stm,1),'\r',"")
station_cfg.pwd=string.gsub(table.remove(stm,1),'\r',"")
station_cfg.save=true
wifi.sta.config(station_cfg)
wifi.sta.connect()
gpio.write(4,gpio.HIGH)
end

function taskstm()
	local command = string.gsub(table.remove(stm,1), '\r',"")
	if command == "TSW" then
		local key = string.gsub(table.remove(stm,1), '\r',"")
		local datan = table.getn(stm)/2
		local datasSend = ""
		for i = 1, datan do
			datasSend = datasSend..'&field'..string.gsub(table.remove(stm,1),'\r',"")..'='..string.gsub(table.remove(stm,1),'\r',"")
		end
		thingspeak(key,datasSend)
	elseif command == "MQTT_INIT" then
		local broker = string.gsub(table.remove(stm,1),'\r',"")
		local port = string.gsub(table.remove(stm,1),'\r',"")
		local id = string.gsub(table.remove(stm,1),'\r',"")
		mosquitto_init(broker,port,id)
	elseif command == "MQTT_SUB" then
		mosquitto_sub()
	elseif command == "MQTT_PUB" then
		local topic = string.gsub(table.remove(stm,1),'\r',"")
		local mensaje = string.gsub(table.remove(stm,1),'\r',"")
		mosquitto_pub(topic,mensaje)
	elseif command == "STA" then
		wifi_station_start()
	end
	stm={}
end

sv=net.createServer(net.TCP, 180)
global_c = nil
sv:listen(3335, function(c)
	if global_c~=nil then
		global_c:close()
	end
	global_c=c 
	c:on("receive",function(sck,pl)	uart.write(0,pl) end)
end)

uart.on("data",'\r', function(data)
	if global_c~=nil then
		if gpio.read(0) == 0 then
			if stm_out == false then
				global_c:send(data..'\n')
			else
				stm_out = false
				taskstm()
			end
		else
			table.insert(stm, data)
			stm_out = true
		end
	else
		if gpio.read(0) == 0 then
			if stm_out == true then
				stm_out = false
				taskstm()
			end
		else
			table.insert(stm, data)
			stm_out = true
		end
	end	
end, 0)

