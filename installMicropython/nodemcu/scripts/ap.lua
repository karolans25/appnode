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
