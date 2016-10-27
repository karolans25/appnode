/************************************************************
 * 		MODULE ULTRASONIDO
 ***********************************************************/

Blockly.Blocks['library_ultrasonido'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/ultra.gif", 40, 40, "*"))
        .appendField("Ultrasonido");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['library_ultrasonido'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 
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
'        # Calc the duration of the recieved pulse, divide the\n'+
'        # result by 2 (round-trip) and divide it by 29 (the\n'+
'        # speed of sound is 340 m/s and that is 29 us/cm).\n'+
'        dist_in_cm = (end - start) / 29\n'+
'        return dist_in_cm\n\n';
  return code;
};


/************************************************************
 * 		START SENSOR ULTRASONIDO
 ***********************************************************/

Blockly.Blocks['start_ultrasonido'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Ultrasonido:");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Sensor_U1", "SEN_U1"], ["Sensor_U2", "SEN_U2"], ["Sensor_U3", "SEN_U3"]]), "sen_ultra");
    this.appendValueInput("pinTrig")
        .setCheck(null)
        .appendField("Pin trig");
    this.appendValueInput("pinEcho")
        .setCheck(null)
        .appendField("Pin echo");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['start_ultrasonido'] = function(block) {
  var dropdown_sen_ultra = block.getFieldValue('sen_ultra');
  var value_pintrig = Blockly.Python.valueToCode(block, 'pinTrig', Blockly.Python.ORDER_ATOMIC);
  var value_pinecho = Blockly.Python.valueToCode(block, 'pinEcho', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'p_'+dropdown_sen_ultra+' = ultrasonido('+value_pintrig+', '+value_pinecho+')\n';
  return code;
};

/************************************************************
 * 		READ SENSOR ULTRASONIDO
 ***********************************************************/
Blockly.Blocks['read_ultrasonido'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Leer distancia")
        .appendField(new Blockly.FieldDropdown([["Sensor_U1", "SEN_U1"], ["Sensor_U2", "SEN_U2"], ["Sensor_U3", "SEN_U3"]]), "sen_ultra")
        .appendField("(cm)");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['read_ultrasonido'] = function(block) {
  var dropdown_sen_ultra = block.getFieldValue('sen_ultra');
  // TODO: Assemble Python into code variable.
  var code = 'p_'+dropdown_sen_ultra+'.distance_in_cm()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


/************************************************************
 * 		INFRARROJO CLASE
 ***********************************************************/
Blockly.Blocks['library_infrarrojo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/linea.gif", 40, 40, "*"))
        .appendField("De línea");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['library_infrarrojo'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'class InfraRojo:\n'+
'    def __init__(self, pins):\n'+
'        self.ref = pins\n'+
'    def read(self):\n'+
'        self.pins = [Pin(pin, Pin.OUT_PP) for pin in self.ref]\n'+
'        for pin in self.pins:\n'+
'           pin.high()\n'+
'        pyb.udelay(40)\n'+
'        self.pins = [Pin(pin, Pin.IN, Pin.PULL_UP) for pin in self.ref]\n'+
'        a = [[0,1],[2,3]]\n'+
'        return a[self.pins[0].value()][self.pins[1].value()]\n'+
'\n'+
'\n';
  return code;
};


/************************************************************
 * 		DECLARACION INFRARROJO
 ***********************************************************/

Blockly.Blocks['start_infrarrojo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Sen_L1", "Sen_L1"], ["Sen_L2", "Sen_L2"]]), "sensor");
    this.appendValueInput("pin1")
        .setCheck(null)
        .appendField("Pin1");
    this.appendValueInput("pin2")
        .setCheck(null)
        .appendField("Pin2");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['start_infrarrojo'] = function(block) {
  var dropdown_sensor = block.getFieldValue('sensor');
  var value_pin1 = Blockly.Python.valueToCode(block, 'pin1', Blockly.Python.ORDER_ATOMIC);
  var value_pin2 = Blockly.Python.valueToCode(block, 'pin2', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'infra_'+dropdown_sensor+' = InfraRojo(['+value_pin1+', '+value_pin2+'])\n'+
'\n';
  return code;
};


/************************************************************
 * 		LEER INFRARROJO
 ***********************************************************/

Blockly.Blocks['read_infrarrojo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Leer infrarrojo ")
        .appendField(new Blockly.FieldDropdown([["Sen_L1", "Sen_L1"], ["Sen_L2", "Sen_L2"]]), "sensor");
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['read_infrarrojo'] = function(block) {
  var dropdown_sensor = block.getFieldValue('sensor');
  // TODO: Assemble Python into code variable.
  var code = 'infra_'+dropdown_sensor+'.read()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
