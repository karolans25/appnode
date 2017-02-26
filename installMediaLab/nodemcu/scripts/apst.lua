gpio.write(4,gpio.LOW)
local str=wifi.ap.getmac();
local ssidTemp=string.format("%s%s%s",string.sub(str,10,11),string.sub(str,13,14),string.sub(str,16,17));
cfg={}
cfg.ssid="medialab_"..ssidTemp;
cfg.pwd="12345678"
wifi.ap.config(cfg)
cfg={}
cfg.ip="192.168.4.1";
cfg.netmask="255.255.255.0";
cfg.gateway="192.168.4.1";
wifi.ap.setip(cfg);
wifi.setmode(wifi.SOFTAP)
node.heap()
wifi.ap.getmac()
str=nil;
ssidTemp=nil;
collectgarbage();
gpio.write(4,gpio.HIGH)

ap_mac = wifi.ap.getmac();

function connect2AP(ssid,pass)
	wifi.setmode(wifi.STATION)
	station_cfg={}
	station_cfg.ssid=ssid
	station_cfg.pwd=pass
	station_cfg.save=true
	wifi.sta.config(station_cfg)
	wifi.sta.connect()
	tmr.alarm(0,1000,tmr.ALARM_AUTO, function()
		if wifi.sta.status() == 1 then
			gpio.write(4,gpio.LOW)
			tmr.stop(0)
		end
	end)
end

srv=net.createServer(net.TCP,60);
srv:listen(80, function(conn)
	conn:on("receive", function(conn,payload)
		ssid_start,ssid_end=string.find(payload,"SSID=");
		if ssid_start and ssid_end then
			amper1_start, amper1_end =string.find(payload,"&", ssid_end+1);
			if amper1_start and amper1_end then
				http_start, http_end =string.find(payload,"HTTP/1.1", ssid_end+1);
				if http_start and http_end then
					ssid=string.sub(payload,ssid_end+1, amper1_start-1);
					password=string.sub(payload,amper1_end+10, http_start-2);
					if ssid and password then
						connect2AP(ssid,password)
					end
				end
			end
		end
	end)
	local remaining, used, total=file.fsinfo()
	local l = file.list();
	local fileAndSize=""
	for k,v in pairs(l) do
  		fileAndSize = fileAndSize .. "<h3>name: "..k.."\t, size: "..v.." Bytes</h3>\r\n"
	end
	local pageWifi = "HTTP/1.1 200 OK\r\n"
	.."<!DOCTYPE html>\r\n"
	.."<html>\r\n"
	.."<body>\r\n"
	.."Content-Type: text/html\r\n\r\n"
	..'<meta charset="utf-8"/>\r\n'
	.."<h1>MediaLab </h1>\r\n"
	.."<h2>File system info:</h2>\r\n"
	.."<h3>Tota: "..total.." Bytes, Used: "..used.." Bytes, Remain: "..remaining.." Bytes\r\n</h3>"
	.."<h2>Lists all files in the file system</h2>\r\n"
	..fileAndSize
	.."<h2>MAC: "..ap_mac.."</h2>\r\n"
	.."<h2>Connect to AP</h2>\r\n"
	.."<h3>Enter SSID and Password for your WIFI router</h3>\r\n"
	.."<form action='' method='get'>\r\n"
	.."++++SSID:"
	.."<input type='text' name='SSID' value='' maxlength='100'/>\r\n"
	.."<br/>"
	.."+Password:"
	.."<input type='text' name='Password' value='' maxlength='100'/>\r\n"
	.."<input type='submit' value='Submit' />\r\n"
	.."</form>\r\n"
	.."<h2>Universidad Nacional de Colombia</h2>"
	.."</html>\r\n"
	conn:send(pageWifi)
end)

