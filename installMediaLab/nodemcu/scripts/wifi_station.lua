--Cambie la informacion pertinente para conectarse al AP deseado
--Para subirlo, ejecute el comando:
--./myEspTool.py ./scripts/iot.lua 0.03 /dev/ttyUSB0
--Puede ver una breve explicacion de la aplicacion myEspTool.py abriendo
--tal archivo.
--connect to Access Point (DO save config to flash)
wifi.setmode(wifi.STATION)
station_cfg={}
station_cfg.ssid="luna"
station_cfg.pwd="12345678"
station_cfg.save=true
wifi.sta.config(station_cfg)
wifi.sta.connect()
--print(wifi.sta.getapinfo())
