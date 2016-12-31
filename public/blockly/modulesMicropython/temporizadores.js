/*****************************************************************
 * 						DELAY SECS
 * **************************************************************/

Blockly.Blocks['temporizador_sec'] = {
  init: function() {
    this.appendValueInput("sec")
        .setCheck("Number")
        .appendField("Esperar ");
    this.appendDummyInput()
        .appendField("(s)");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['temporizador_sec'] = function(block) {
  var value_sec = Blockly.Python.valueToCode(block, 'sec', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'pyb.delay(int('+value_sec+'*1000))\n';
  return code;
};


/*****************************************************************
 * 						DELAY MILLIS
 * **************************************************************/

Blockly.Blocks['temporizador_millis'] = {
  init: function() {
    this.appendValueInput("millis")
        .setCheck("Number")
        .appendField("Esperar ");
    this.appendDummyInput()
        .appendField("(ms)");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['temporizador_millis'] = function(block) {
  var value_millis = Blockly.Python.valueToCode(block, 'millis', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'pyb.delay(int('+value_millis+'))\n';
  return code;
};


/*****************************************************************
 * 						DELAY MICROS
 * **************************************************************/

Blockly.Blocks['temporizador_micro'] = {
  init: function() {
    this.appendValueInput("micro")
        .setCheck("Number")
        .appendField("Esperar ");
    this.appendDummyInput()
        .appendField("(us)");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['temporizador_micro'] = function(block) {
  var value_micro = Blockly.Python.valueToCode(block, 'micro', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'pyb.udelay(int('+value_micro+'))\n';
  return code;
};

