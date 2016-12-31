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
