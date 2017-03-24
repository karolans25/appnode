Blockly.Python.addReservedWords(
  // Keywords.
  'and,as,assert,break,class,continue,def,del,elif,else,except,finally,for,from,global,if,import,in,is,lambda,or,nonlocal,not,pass,raise,return,try,while,with,yield,False,None,True,' +
  // Helpers.
  'copyright,credits,exit,license,quit,' +
  // Builtins.
  'abs,all,any,ascii,bin,bool,bytearray,bytes,callable,chr,classmethod,compile,complex,delattr,dict,dir,divmod,enumerate,eval,exec,filter,float,format,frozenset,getattr,globals,hasattr,hash,help,hex,id,input,int,isinstance,issubclass,iter,len,list,locals,map,max,memoryview,min,next,object,oct,open,ord,pow,print,property,range,repr,reversed,round,set,setattr,slice,sorted,staticmethod,str,sum,super,tuple,type,vars,zip,NotImplemented,Ellipsis,' +
  '__debug__,__import__,__name__,' +
  // Exceptions.
  'ArithmeticError,AssertionError,AttributeError,BaseException,BufferError,BytesWarning,DeprecationWarning,EOFError,EnvironmentError,Exception,FloatingPointError,FutureWarning,GeneratorExit,IOError,ImportError,ImportWarning,IndentationError,IndexError,KeyError,KeyboardInterrupt,LookupError,MemoryError,NameError,NotImplementedError,OSError,OverflowError,PendingDeprecationWarning,ReferenceError,RuntimeError,RuntimeWarning,StopIteration,SyntaxError,SyntaxWarning,SystemError,SystemExit,TabError,TypeError,UnboundLocalError,UnicodeDecodeError,UnicodeEncodeError,UnicodeError,UnicodeTranslateError,UnicodeWarning,UserWarning,ValueError,Warning,ZeroDivisionError,' +
  'BlockingIOError,BrokenPipeError,ChildProcessError,ConnectionAbortedError,ConnectionError,ConnectionRefusedError,ConnectionResetError,FileExistsError,FileNotFoundError,InterruptedError,IsADirectoryError,NotADirectoryError,PermissionError,ProcessLookupError,ResourceWarning,TimeoutError'
);

//Tarea IOT
Blockly.Blocks['task_config'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("TAREA");
    this.appendValueInput("command")
        .appendField(new Blockly.FieldDropdown([["normal", "30"], ["rapido+", "10"], ["rapido", "20"], ["normal", "30"], ["lento", "40"], ["lento+", "50"], ["lento++", "60"]]), "wait");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['task_config'] = function(block) {
  var dropdown_wait = block.getFieldValue('wait');
  var value_command = Blockly.Python.valueToCode(block, 'command', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'command('+value_command+','+dropdown_wait+')\n';
  return code;
};

// Iniciar IOT y/o comandos
Blockly.Blocks['start_config'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Iniciar");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("IOT/Tarea");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/iot.gif", 40, 40, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['start_config'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'from pyb import UART\n'+
	  'uart = UART(1,115200)\n'+
	  's2e = Pin(\'CONFIG\',Pin.OUT_PP)\n'+
	  'def command(dataToSend,sleepTime):\n'+
	  ' uart.writechar(ord(\'\\r\'))\n'+
	  ' pyb.delay(sleepTime)\n'+
	  ' s2e.high()\n'+
	  ' for x in dataToSend:\n'+
	  '  uart.writechar(ord(x))\n'+
	  '  pyb.delay(sleepTime)\n'+
	  ' s2e.low()\n'+
	  ' print(\'\')\n'+
	  '\n';
  return code;
};

Blockly.Blocks['wifi_sta'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Wifi en modo ESTACIÓN");
    this.appendDummyInput()
        .appendField("Red:")
        .appendField(new Blockly.FieldTextInput("miRed"), "essid")
        .appendField("Pass:")
        .appendField(new Blockly.FieldTextInput("password"), "pass");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Python['wifi_sta'] = function(block) {
  var text_essid = block.getFieldValue('essid');
  var text_pass = block.getFieldValue('pass');
  // TODO: Assemble Python into code variable.
    var code = '\'STA\\r\'+\''+text_essid+'\'+\'\\r\'+\''+text_pass+'\'+\'\\r\'';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


// I2C
Blockly.Blocks['library_i2c'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("I2C");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Python['library_i2c'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 	'from pyb import I2C\n'+
  				'DS3231_I2C_ADDR = 104\n'+
  				'\n'+
  				'def bcd2dec(bcd):\n'+
  				' return (((bcd & 0xf0) >> 4) * 10 + (bcd & 0x0f))\n'+
  				'\n'+
  				'def dec2bcd(dec):\n'+
  				' tens, units = divmod(dec, 10)\n'+
  				' return (tens << 4) + units\n'+
  				'\n'+
  				'def get_time_rtc(self):\n'+
  				' timebuf = bytearray(7)\n'+
				' data = self.mem_read(timebuf, DS3231_I2C_ADDR, 0)\n'+
				' ss = bcd2dec(data[0])\n'+
				' mm = bcd2dec(data[1])\n'+
				' if data[2] & 0x40:\n'+
				' 	hh = bcd2dec(data[2] & 0x1f)\n'+
				' 	if data[2] & 0x20:\n'+
				' 		hh += 12\n'+
				' else:\n'+
				' 	hh = bcd2dec(data[2])\n'+
				' wday = data[3]\n'+
				' DD = bcd2dec(data[4])\n'+
				' MM = bcd2dec(data[5] & 0x1f)\n'+
				' YY = bcd2dec(data[6])\n'+
				' if data[5] & 0x80:\n'+
				' 	YY += 2000\n'+
				' return (YY, MM, DD, hh, mm, ss, wday -1, 0)\n'+
				'\n'+
				'def get_time(self):\n'+
  				' timebuf = bytearray(7)\n'+
				' data = self.mem_read(timebuf, DS3231_I2C_ADDR, 0)\n'+
				' ss = bcd2dec(data[0])\n'+
				' mm = bcd2dec(data[1])\n'+
				' if data[2] & 0x40:\n'+
				' 	hh = bcd2dec(data[2] & 0x1f)\n'+
				' 	if data[2] & 0x20:\n'+
				' 		hh += 12\n'+
				' else:\n'+
				' 	hh = bcd2dec(data[2])\n'+
				' return (hh, mm, ss) \n'+
				'\n'+
				'def save_time(self, YY, MM, DD, wday, hh, mm, ss, subsec):\n'+
				' self.mem_write(dec2bcd(ss), DS3231_I2C_ADDR, 0)\n'+
				' self.mem_write(dec2bcd(mm), DS3231_I2C_ADDR, 1)\n'+
				' self.mem_write(dec2bcd(hh), DS3231_I2C_ADDR, 2)\n'+
				//' self.mem_write(dec2bcd(wday), DS3231_I2C_ADDR, 3)\n'+
				' self.mem_write(dec2bcd(DD), DS3231_I2C_ADDR, 4)\n'+
				' self.mem_write(dec2bcd(MM) | 0b10000000, DS3231_I2C_ADDR, 5)\n'+
				' self.mem_write(dec2bcd(YY-2000), DS3231_I2C_ADDR, 6)\n';
  				
  return code;
};

// Init i2c
Blockly.Blocks['i2c_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("I2C bus")
        .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "bus");
    this.appendDummyInput()
        .appendField("I2C Modo")
        .appendField(new Blockly.FieldDropdown([["MASTER", "I2C.MASTER"], ["ESCLAVO", "I2C.SLAVE"]]), "mode");
    this.appendDummyInput()
        .appendField("Baud Rate")
        .appendField(new Blockly.FieldDropdown([["100000", "100000"], ["400000", "400000"]]), "baudrate");    
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['i2c_init'] = function(block) {
  var dropdown_bus = block.getFieldValue('bus');
  var dropdown_mode = block.getFieldValue('mode');
  var dropdown_baudrate = block.getFieldValue('baudrate');
  // TODO: Assemble Python into code variable.
  var code = 'I2C('+dropdown_bus+','+dropdown_mode+', baudrate='+dropdown_baudrate+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['i2c_scan'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("I2C scan")
        .appendField(new Blockly.FieldVariable("item"), "pin");
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['i2c_scan'] = function(block) {
  var variable_pin = Blockly.Python.variableDB_.getName(block.getFieldValue('pin'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble Python into code variable.
  var code = variable_pin+'.scan()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
}

Blockly.Blocks['i2c_mem_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("I2C mem_read")
        .appendField(new Blockly.FieldVariable("item"), "pin");
    this.appendValueInput("bytes")
        .setCheck(null)
        .appendField("Bytes");
    this.appendValueInput("add")
        .setCheck(null)
        .appendField("Dir dispositivo");
    this.appendValueInput("pos")
        .setCheck(null)
        .appendField("Posicion");
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['i2c_mem_read'] = function(block) {
  var variable_pin = Blockly.Python.variableDB_.getName(block.getFieldValue('pin'), Blockly.Variables.NAME_TYPE);
  var variable_bytes = Blockly.Python.valueToCode(block, 'bytes', Blockly.Variables.NAME_TYPE);
  var variable_address = Blockly.Python.valueToCode(block, 'add', Blockly.Python.ORDER_ATOMIC);
  var variable_pos = Blockly.Python.valueToCode(block, 'pos', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = variable_pin+'.mem_read('+variable_bytes+' ,'+variable_address+' ,'+variable_pos+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
}


Blockly.Blocks['bcd2dec'] = {
  init: function() {
    this.appendValueInput("bcd")
    	.setCheck(null)
        .appendField("bcd2dec")
    this.setOutput(true, "Number");
    this.setColour(160);
    this.setTooltip('Retorna el valor bcd en forma decimal');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Python['bcd2dec'] = function(block) {
  var variable_value = Blockly.Python.valueToCode(block, 'bcd', Blockly.Python.ORDER_ATOMIC);
  //Blockly.Python.variableDB_.getName(block.getDistinctName('bcd'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble Python into code variable.
  var code =  'bcd2dec(' + variable_value + ')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
}

Blockly.Blocks['dec2bcd'] = {
  init: function() {
    this.appendValueInput("dec")
    	.setCheck(null)
        .appendField("dec2bcd")
    this.setOutput(true, "Number");
    this.setColour(160);
    this.setTooltip('Retorna el valor decimal en forma bcd');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Python['dec2bcd'] = function(block) {
  var variable_dec = Blockly.Python.valueToCode(block, 'bcd', Blockly.Python.ORDER_ATOMIC);
  //Blockly.Python.variableDB_.getName(block.getDistinctName('bcd'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble Python into code variable.
  var code =  'dec2bcd(' + variable_value + ')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
}


Blockly.Blocks['gettime'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("RTC getTime")
        .appendField(new Blockly.FieldVariable("item"), "pin");
    this.setOutput(true, "Number");
    this.setColour(160);
    this.setTooltip('Lee la hora de un rtc');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Python['gettime'] = function(block) {
  var variable_pin = Blockly.Python.variableDB_.getName(block.getFieldValue('pin'), Blockly.Variables.NAME_TYPE);
  
  // TODO: Assemble Python into code variable.
  var code =  'get_time(' + variable_pin + ')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
}

Blockly.Blocks['settime'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("RTC set Time")
        .appendField(new Blockly.FieldVariable("item"), "pin");
    this.appendValueInput("YY")
        .setCheck(null)
        .appendField("Año");
    this.appendValueInput("MO")
        .setCheck(null)
        .appendField("Mes");
    this.appendValueInput("DD")
        .setCheck(null)
        .appendField("Dia");
    this.appendValueInput("hh")
        .setCheck(null)
        .appendField("Hora");
    this.appendValueInput("mm")
        .setCheck(null)
        .appendField("Minuto");
    this.appendValueInput("ss")
        .setCheck(null)
        .appendField("Segundo");
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip('Escribe la hora en un rtc');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Python['settime'] = function(block) {
  var variable_pin = Blockly.Python.variableDB_.getName(block.getFieldValue('pin'), Blockly.Variables.NAME_TYPE);
  var variable_YY = Blockly.Python.valueToCode(block, 'YY', Blockly.Variables.NAME_TYPE);
  var variable_MO = Blockly.Python.valueToCode(block, 'MO', Blockly.Variables.NAME_TYPE);
  var variable_DD = Blockly.Python.valueToCode(block, 'DD', Blockly.Variables.NAME_TYPE);
  var variable_hh = Blockly.Python.valueToCode(block, 'hh', Blockly.Variables.NAME_TYPE);
  var variable_mm = Blockly.Python.valueToCode(block, 'mm', Blockly.Variables.NAME_TYPE);
  var variable_ss = Blockly.Python.valueToCode(block, 'ss', Blockly.Variables.NAME_TYPE);
  // TODO: Assemble Python into code variable.
  //save_time(self, YY, MM, DD, wday, hh, mm, ss, subsec)
  var code =  'save_time(' + variable_pin + ', ' + variable_YY + ', ' + variable_MO + ', ' + variable_DD + ', ' + 0 + ', ' + variable_hh + ', ' + variable_mm + ', ' + variable_ss + ', ' + 0 + ' )\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
}
