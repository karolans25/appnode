gpio.mode(0, gpio.INPUT)
gpio.mode(4, gpio.OUTPUT)
stm = {}
stm_out = false
MQTT_Client = nil
telnet = true

function thingspeak(apikey, datas)
gpio.write(4,gpio.LOW)
conn=net.createConnection(net.TCP, 0)
conn:on("connection",function(conn, payload)
local cmd ="POST /update.json?api_key="..apikey..datas.." HTTP/1.1\r\n"
.. "Host: api.thingspeak.com\r\n"
.. "Connection: close\r\n"
.. "Accept: */*\r\n"
.. "User-Agent: Mozilla/4.0 (compatible; esp8266 Lua; Windows NT 5.1)\r\n"
.. "\r\n";
conn:send(cmd);
cmd = nil
end)
conn:on("receive", function(conn, payload)
gpio.write(4,gpio.HIGH)   
conn:close()
end)
conn:connect(80,'api.thingspeak.com') 
end

function mosquitto_init(broker,port,id)
	gpio.write(4,gpio.LOW)
	MQTT_Client = mqtt.Client(id,120,"","")
	MQTT_Client:on("connect", function(conMqtt)
		gpio.write(4,gpio.HIGH)
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
local station_cfg={}
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
local band = bit.band
local bor = bit.bor
local rshift = bit.rshift
local lshift = bit.lshift
local char = string.char
local byte = string.byte
local sub = string.sub
local applyMask = crypto.mask

local function decode(chunk)
  if #chunk < 2 then return end
  local second = byte(chunk, 2)
  local len = band(second, 0x7f)
  local offset
  if len == 126 then
    if #chunk < 4 then return end
    len = bor(
      lshift(byte(chunk, 3), 8),
      byte(chunk, 4))
    offset = 4
  elseif len == 127 then
    if #chunk < 10 then return end
    len = bor(
      -- Ignore lengths longer than 32bit
      lshift(byte(chunk, 7), 24),
      lshift(byte(chunk, 8), 16),
      lshift(byte(chunk, 9), 8),
      byte(chunk, 10))
    offset = 10
  else
    offset = 2
  end
  local mask = band(second, 0x80) > 0
  if mask then
    offset = offset + 4
  end
  if #chunk < offset + len then return end

  local first = byte(chunk, 1)
  local payload = sub(chunk, offset + 1, offset + len)
  assert(#payload == len, "Length mismatch")
  if mask then
    payload = applyMask(payload, sub(chunk, offset - 3, offset))
  end
  local extra = sub(chunk, offset + len + 1)
  local opcode = band(first, 0xf)
  return extra, payload, opcode
end

local function savePython(data2save)
	if string.match(data2save,'^.-data')=="save__data" then
		local data_save = string.sub(data2save,11)
		file.writeline(data_save)
		gpio.write(4,gpio.HIGH)
	elseif string.match(data2save,'^.-begin')=="save__begin" then
		file.remove("main.py")
		file.open("main.py","w")
		file.writeline([[""]])
		file.close()
		file.open("main.py","w+")
		gpio.write(4,gpio.HIGH)
	elseif string.match(data2save,'^.-end')=="save__end" then
		file.close()
		gpio.write(4,gpio.HIGH)
	elseif string.match(data2save,'^.-rm')=="save__rm" then
		file.remove("main.py")
		gpio.write(4,gpio.HIGH)
	else
		file.close()
	end
end

local function runOrSave(data)
	if string.match(data,'^.-__')=="save__" then
		gpio.write(4,gpio.LOW)
		savePython(data)
		uart.write(0,'\r')
	else
		uart.write(0,data)
	end
end

	global_c=c
	c:on("receive", function(sck,pl) 
		if string.match(pl,'^.-\r\n') == 'GET / HTTP/1.1\r\n' then
			pl = string.gsub(string.match(pl,'Sec--WebSocket--Key.+=='),'Sec--WebSocket--Key: ',"")
			pl = crypto.toBase64(crypto.hash("sha1",pl..'258EAFA5-E914-47DA-95CA-C5AB0DC85B11'))
			global_c:send("HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: " ..pl.. "\r\n\r\n")
			telnet = false
		else
			if telnet == true then
				runOrSave(pl)
			else
				local extra, payload, opcode = decode(pl)
				runOrSave(payload)
			end
		end
	end)
	c:on("disconnection", function(c)
		telnet = true
    end)
end)

uart.on("data",'\r', function(data)

local band = bit.band
local bor = bit.bor
local rshift = bit.rshift
local lshift = bit.lshift
local char = string.char
local byte = string.byte

local function encode(payload)
  local opcode = 1 
  assert(type(opcode) == "number", "opcode must be number")
  assert(type(payload) == "string", "payload must be string")
  local len = #payload
  local head = char(
    bor(0x80, opcode),
    len < 126 and len or (len < 0x10000) and 126 or 127
  )
  if len >= 0x10000 then
    head = head .. char(
    0,0,0,0, -- 32 bit length is plenty, assume zero for rest
    band(rshift(len, 24), 0xff),
    band(rshift(len, 16), 0xff),
    band(rshift(len, 8), 0xff),
    band(len, 0xff)
  )
  elseif len >= 126 then
    head = head .. char(band(rshift(len, 8), 0xff), band(len, 0xff))
  end
  return head .. payload
end

	if global_c~=nil then
		if gpio.read(0) == 0 then
			if stm_out == false then
				if telnet == true then
					global_c:send(data..'\n')
				else
					global_c:send(encode(data))
				end
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

collectgarbage()
