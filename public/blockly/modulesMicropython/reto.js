// START RETO

Blockly.Blocks['start_reto'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("CARGAR RETO");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["3", "3"], ["5", "5"], ["7", "7"], ["9", "9"], ["11", "11"], ["13", "13"], ["15", "15"], ["17", "17"], ["19", "19"], ["21", "21"], ["23", "23"], ["25", "25"], ["27", "27"], ["29", "29"], ["31", "31"], ["33", "33"], ["35", "35"], ["37", "37"], ["39", "39"], ["41", "41"]]), "left")
        .appendField(new Blockly.FieldDropdown([["3", "3"], ["5", "5"], ["7", "7"], ["9", "9"], ["11", "11"], ["13", "13"], ["15", "15"], ["17", "17"], ["19", "19"], ["21", "21"], ["23", "23"], ["25", "25"], ["27", "27"], ["29", "29"], ["31", "31"], ["33", "33"], ["35", "35"], ["37", "37"], ["39", "39"], ["41", "41"]]), "right")
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/kaku.gif", 100, 100, "*"));
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['start_reto'] = function(block) {
  var dropdown_left = block.getFieldValue('left');
  var dropdown_right = block.getFieldValue('right');
  // TODO: Assemble Python into code variable.
  var code = 'import pyb\nfrom pyb import Timer, Pin\n'+
'class mobile:\n'+
'    pl = 100\n'+
'    pr = 100\n'+
'    def __init__(self):\n'+
'        timerMotors = Timer(1, freq=1000)\n'+
'        self.lPWM = timerMotors.channel(2, Timer.PWM, pin=Pin(\'SP_M0\'))\n'+
'        self.rPWM = timerMotors.channel(4, Timer.PWM, pin=Pin(\'SP_M1\'))\n'+
'        self.ld = Pin(\'DIR_M0\', mode=Pin.OUT)\n'+
'        self.rd = Pin(\'DIR_M1\', mode=Pin.OUT)\n'+
'    def calibration(self, l, r):\n'+
'        self.pl = l\n'+
'        self.pr = r\n'+
'    def run(self, l, r):\n'+
'        self.lPWM.pulse_width_percent(int(abs(l)*self.pl/100))\n'+
'        self.rPWM.pulse_width_percent(int(abs(r)*self.pr/100))\n'+
'        if l < 0:\n'+
'            self.ld.low()\n'+
'        else:\n'+
'            self.ld.high()\n'+
'        if r < 0:\n'+
'            self.rd.low()\n'+
'        else:\n'+
'            self.rd.high()\n'+
'\n'+
'movil = mobile()\n'+
'movil.calibration('+dropdown_left+','+dropdown_right+')\n'+
'class ultrasonido:\n'+
'    def __init__(self, tPin, ePin):\n'+
'        self.triggerPin = tPin\n'+
'        self.echoPin = ePin\n'+
'        self.trigger = pyb.Pin(self.triggerPin)\n'+
'        self.trigger.init(pyb.Pin.OUT_PP, pyb.Pin.PULL_NONE)\n'+
'        self.trigger.low()\n'+
'        self.echo = pyb.Pin(self.echoPin)\n'+
'        self.echo.init(pyb.Pin.IN, pyb.Pin.PULL_NONE)\n'+
'    def distance_in_inches(self):\n'+
'        return (self.distance_in_cm() * 0.3937)\n'+
'    def distance_in_cm(self):\n'+
'        start = 0\n'+
'        end = 0\n'+
'        micros = pyb.Timer(2, prescaler=83, period=0x3fffffff)\n'+
'        micros.counter(0)\n'+
'        self.trigger.high()\n'+
'        pyb.udelay(10)\n'+
'        self.trigger.low()\n'+
'        while self.echo.value() == 0:\n'+
'            start = micros.counter()\n'+
'        while self.echo.value() == 1:\n'+
'            end = micros.counter()\n'+
'        micros.deinit()\n'+
'        dist_in_cm = (end - start) / 29\n'+
'        return dist_in_cm\n\n'+
'sensor1 = ultrasonido(\'SRV1\',\'SRV2\')\n';

  return code;
};

// Doit Reto
Blockly.Blocks['function_reto'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("hacer");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/kaku.gif", 100, 100, "*"));
    this.appendStatementInput("doit")
        .setCheck(null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};



Blockly.Python['function_reto'] = function(block) {
  var statements_doit = Blockly.Python.statementToCode(block, 'doit');
  // TODO: Assemble Python into code variable.
  var code = 'def doit():\n'+
	statements_doit+'\n'+
	'doit()\n';
  return code;
};
// Avanzar pasos

Blockly.Blocks['avanzar'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Avanzar")
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/ava.gif", 30, 30, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['avanzar'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'motor1.run(100,100)\n'+
	'pyb.delay(1000)\n'+
	'movil.run(0,0)\n';
  return code;
};


// Avanzar pasos con tiempo

Blockly.Blocks['avanzar_t'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Avanzar")
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/ava.gif", 30, 30, "*"))
        .appendField("Tiempo")
        .appendField(new Blockly.FieldDropdown([["0.5", "500"], ["1", "1000"], ["1.5", "1500"], ["2", "2000"], ["2.5", "2500"], ["3", "3000"], ["3.5", "3500"], ["4", "4000"], ["4.5", "4500"], ["5", "5000"]]), "time")
        .appendField("[S]");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['avanzar_t'] = function(block) {
  var dropdown_time = block.getFieldValue('time');
  // TODO: Assemble Python into code variable.
  var code = 'motor1.run(100,100)\n'+
	'pyb.delay('+dropdown_time+')\n'+
	'movil.run(0,0)\n';
  return code;
};

// Retroceder

Blockly.Blocks['retroceder'] = {
  init: function() {
    this.appendDummyInput()
	.setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Retroceder")
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/atr.gif", 30, 30, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['retroceder'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'motor1.run(-100,-100)\n'+
	'pyb.delay(1000)\n'+
	'movil.run(0,0)\n';
  return code;
};


// Retroceder con tiempo

Blockly.Blocks['retroceder_t'] = {
  init: function() {
    this.appendDummyInput()
	.setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Retroceder")
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/atr.gif", 30, 30, "*"))
        .appendField("Tiempo")
        .appendField(new Blockly.FieldDropdown([["0.5", "500"], ["1", "1000"], ["1.5", "1500"], ["2", "2000"], ["2.5", "2500"], ["3", "3000"], ["3.5", "3500"], ["4", "4000"], ["4.5", "4500"], ["5", "5000"]]), "time")
        .appendField("[S]");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['retroceder_t'] = function(block) {
  var dropdown_time = block.getFieldValue('time');
  // TODO: Assemble Python into code variable.
  var code = 'motor1.run(-100,-100)\n'+
	'pyb.delay('+dropdown_time+')\n'+
	'movil.run(0,0)\n';
  return code;
};


// Giro Izquierda

Blockly.Blocks['izquierda'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Giro a la Izquierda")
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/izq.gif", 30, 30, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['izquierda'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'motor1.run(100,-100)\n'+
	'pyb.delay(1000)\n'+
	'movil.run(0,0)\n';
  return code;
};

// Giro Izquierda con tiempo

Blockly.Blocks['izquierda_t'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Giro a la Izquierda")
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/izq.gif", 30, 30, "*"))
        .appendField("Tiempo")
        .appendField(new Blockly.FieldDropdown([["0.5", "500"], ["1", "1000"], ["1.5", "1500"], ["2", "2000"], ["2.5", "2500"], ["3", "3000"], ["3.5", "3500"], ["4", "4000"], ["4.5", "4500"], ["5", "5000"]]), "time")
        .appendField("[S]");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['izquierda_t'] = function(block) {
  var dropdown_time = block.getFieldValue('time');
  // TODO: Assemble Python into code variable.
  var code = 'motor1.run(100,-100)\n'+
	'pyb.delay('+dropdown_time+')\n'+
	'movil.run(0,0)\n';
  return code;
};


// Giro Derecha

Blockly.Blocks['derecha'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Girar a la Derecha")
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/der.gif", 30, 30, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['derecha'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'motor1.run(-100,100)\n'+
	'pyb.delay(1000)\n'+
	'movil.run(0,0)\n';
  return code;
};

// Giro Derecha con tiempo

Blockly.Blocks['derecha_t'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Girar a la Derecha")
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/der.gif", 30, 30, "*"))
        .appendField("Tiempo")
        .appendField(new Blockly.FieldDropdown([["0.5", "500"], ["1", "1000"], ["1.5", "1500"], ["2", "2000"], ["2.5", "2500"], ["3", "3000"], ["3.5", "3500"], ["4", "4000"], ["4.5", "4500"], ["5", "5000"]]), "time")
        .appendField("[S]");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['derecha_t'] = function(block) {
  var dropdown_time = block.getFieldValue('time');
  // TODO: Assemble Python into code variable.
  var code = 'motor1.run(-100,100)\n'+
	'pyb.delay('+dropdown_time+')\n'+
	'movil.run(0,0)\n';
  return code;
};

// Sensor Ultrasonido

Blockly.Blocks['sensor'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("¿Obstáculo?");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/sensor.gif", 100, 30, "*"));
    this.setOutput(true, null);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};



Blockly.Python['sensor'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '4 >= sensor1.distance_in_cm()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// Sensor Ultrasonido

Blockly.Blocks['ultra_d'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("¿Obstáculo a")
       .appendField(new Blockly.FieldDropdown([["2", "2"], ["4", "4"], ["6", "6"], ["8", "8"], ["10", "10"], ["12", "12"], ["14", "14"], ["16", "16"], ["18", "18"], ["20", "20"]]), "time")
        .appendField("[cm]")
        .appendField("o menos ?");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/sensor.gif", 100, 30, "*"));
    this.setOutput(true, null);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};



Blockly.Python['ultra_d'] = function(block) {
  var dropdown_time = block.getFieldValue('time');
  // TODO: Assemble Python into code variable.
  var code = dropdown_time + ' >= sensor1.distance_in_cm()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


// BLINK



Blockly.Blocks['blink'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("blink");
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['blink'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'import pyb\n'+
	'def blink():\n'+
 	' LED = pyb.LED(1)\n'+
	' LED.toggle()\n'+
	' return\n\n'+
	'blink()\n';
  return code;
};

//
