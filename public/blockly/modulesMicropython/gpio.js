/**********************************************************
 * 					BEGIN GPIO MODE
 * ********************************************************/

Blockly.Blocks['create_pin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("en pin")
        .appendField(new Blockly.FieldDropdown([["IO0", "IO0"], ["IO1", "IO1"], ["IO2", "IO2"], ["IO3", "IO3"], ["IO4", "IO4"], ["IO5", "IO5"], ["IO6", "IO6"], ["IO7", "IO7"], ["IO8", "IO8"], ["IO9", "IO9"], ["IO10", "IO10"], ["IO11", "IO11"], ["IO12", "IO12"], ["IO13", "IO13"], ["IO14", "IO14"], ["IO15", "IO15"], ["IO16", "IO16"], ["IO17", "IO17"], ["IO18", "IO18"], ["IO19", "IO19"], ["IO20", "IO20"], ["IO21", "IO21"], ["IO22", "IO22"], ["IO23", "IO23"], ["IO24", "IO24"], ["IO25", "IO25"], ["IO26", "IO26"], ["ECHO", "ECHO"], ["TRIGG", "TRIGG"], ["SRV1", "SRV1"], ["SRV2", "SRV2"], ["SRV3", "SRV3"], ["SRV4", "SRV4"], ["PWM1", "PWM1"], ["CM1A", "CM1A"], ["CM1B", "CM1B"], ["CM1C", "CM1C"], ["CM1D", "CM1D"], ["CM2A", "CM2A"], ["CM2B", "CM2B"], ["CM2C", "CM2C"], ["CM2D", "CM2D"], ["DIR_M0", "DIR_M0"], ["SP_M0", "SP_M0"], ["DIR_M1", "DIR_M1"], ["SP_M1", "SP_M1"], ["PC13", "PC13"], ["option", "OPTIONNAME"]]), "pin")
        .appendField("Modo")
        .appendField(new Blockly.FieldDropdown([["Salida", "OUT_PP"], ["Entrada", "IN"]]), "mode");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['create_pin'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var dropdown_mode = block.getFieldValue('mode');
  // TODO: Assemble Python into code variable.
  var code = 'Pin(\''+dropdown_pin+'\',Pin.'+dropdown_mode+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['gpio_mode'] = {
  init: function() {
    this.appendValueInput("elPin")
        .setCheck("String")
        .appendField("Modo Pin");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Entrada", "IN"], ["Salida_PP", "OUT_PP"], ["Salida_OD", "OUT_OD"]]), "mode");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['gpio_mode'] = function(block) {
  var value_elpin = Blockly.Python.valueToCode(block, 'elPin', Blockly.Python.ORDER_ATOMIC);
  var dropdown_mode = block.getFieldValue('mode');
  // TODO: Assemble Python into code variable.
  var code = 'p_'+value_elpin+' = Pin('+value_elpin+', Pin.'+dropdown_mode+')\n';
  return code;
};


/*****************************************************************
 * 						BEGIN GPIO WRITE DIGITAL
 * **************************************************************/

Blockly.Blocks['gpio_write'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Escribir")
        .appendField(new Blockly.FieldVariable("item"), "pin")
        .appendField("a")
        .appendField(new Blockly.FieldDropdown([["Alto", "high"], ["Bajo", "low"],["1", "high"],["0", "low"]]), "state");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['gpio_write'] = function(block) {
  var variable_pin = Blockly.Python.variableDB_.getName(block.getFieldValue('pin'), Blockly.Variables.NAME_TYPE);
  var dropdown_state = block.getFieldValue('state');
  // TODO: Assemble Python into code variable.
  var code = variable_pin+'.'+dropdown_state+'()\n';
  return code;
};


/*****************************************************************
 * 						BEGIN GPIO READ DIGITAL
 * ***************************************************************/

Blockly.Blocks['gpio_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Leer")
        .appendField(new Blockly.FieldVariable("item"), "pin");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['gpio_read'] = function(block) {
  var variable_pin = Blockly.Python.variableDB_.getName(block.getFieldValue('pin'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble Python into code variable.
  var code = variable_pin+'.value()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

/*****************************************************************
 * 						LIST GPIO DIGITAL
 * ***************************************************************/

Blockly.Blocks['pin_digital'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pin Digital")
        .appendField(new Blockly.FieldDropdown([["SRV1", "SRV1"], ["SRV2", "SRV2"], ["SRV3", "SRV3"], ["SRV4", "SRV4"], ["PWM1", "PWM1"], ["IO0", "IO0"], ["IO1", "IO1"], ["IO2", "IO2"], ["IO3", "IO3"], ["IO4", "IO4"], ["IO5", "IO5"], ["IO6", "IO6"], ["IO7", "IO7"], ["IO8", "IO8"], ["IO9", "IO9"], ["IO10", "IO10"], ["IO11", "IO11"], ["IO12", "IO12"], ["IO13", "IO13"], ["IO14", "IO14"], ["IO15", "IO15"], ["IO16", "IO16"], ["IO17", "IO17"], ["IO18", "IO18"], ["IO19", "IO19"], ["IO20", "IO20"], ["IO21", "IO21"], ["IO22", "IO22"], ["IO23", "IO23"], ["IO24", "IO24"], ["IO25", "IO25"], ["IO26", "IO26"], ["CM1A", "CM1A"], ["CM1B", "CM1B"], ["CM1C", "CM1C"], ["CM1D", "CM1D"], ["CM2A", "CM2A"], ["CM2B", "CM2B"], ["CM2C", "CM2C"], ["CM2D", "CM2D"], ["DIR_M0", "DIR_M0"], ["SP_M0", "SP_M0"], ["DIR_M1", "DIR_M1"], ["SP_M1", "SP_M1"], ["ECHO", "ECHO"], ["TRIGG", "TRIGG"], ["PC13", "PC13"], ["option", "OPTIONNAME"]]), "pines_D");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['pin_digital'] = function(block) {
  var dropdown_pines_d = block.getFieldValue('pines_D');
  // TODO: Assemble Python into code variable.
  var code = '\''+dropdown_pines_d+'\'';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


/**********************************************************
 * 					BEGIN GPIO ADC
 * ********************************************************/

Blockly.Blocks['library_adc'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ADC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['library_adc'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'from pyb import ADC\n';
  return code;
};

Blockly.Blocks['adc_create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ADC en")
        .appendField(new Blockly.FieldDropdown([["SEN1", "SEN1"], ["SEN2", "SEN2"], ["SEN3", "SEN3"], ["SEN4", "SEN4"], ["SEN5", "SEN5"], ["SEN6", "SEN6"], ["SEN7", "SEN7"], ["SEN8", "SEN8"]]), "pin");
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['adc_create'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  // TODO: Assemble Python into code variable.
  var code = 'ADC(Pin(\''+dropdown_pin+'\'))';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['adc_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Leer ADC")
        .appendField(new Blockly.FieldVariable("item"), "pin");
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['adc_read'] = function(block) {
  var variable_pin = Blockly.Python.variableDB_.getName(block.getFieldValue('pin'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble Python into code variable.
  var code = variable_pin+'.read()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
}

Blockly.Blocks['library_dac'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("DAC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['library_dac'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'from pyb import DAC\n';
  return code;
};



Blockly.Blocks['led_options'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("Led")
          .appendField(new Blockly.FieldDropdown([["on", "on()"], ["off", "off()"], ["toggle", "toggle()"]]), "led_actions");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['led_options'] = function(block) {
  var dropdown_led_actions = block.getFieldValue('led_actions');
  // TODO: Assemble Python into code variable.
  var code = 'pyb.LED(1).' + dropdown_led_actions;
  return code;
};

