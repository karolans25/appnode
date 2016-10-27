/**********************************************************
 * 					BEGIN GPIO MODE
 * ********************************************************/

Blockly.Blocks['gpio_mode'] = {
  init: function() {
    this.appendValueInput("elPin")
        .setCheck("String")
        .appendField("Modo Pin");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Entrada", "IN"], ["Salida_PP", "OUT_PP"], ["Salida_OD", "OUT_OD"]]), "mode");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
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
    this.appendValueInput("elPin")
        .setCheck(null)
        .appendField("Esccribir Pin");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Alto", "high"], ["Bajo", "low"]]), "mode");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['gpio_write'] = function(block) {
  var value_elpin = Blockly.Python.valueToCode(block, 'elPin', Blockly.Python.ORDER_ATOMIC);
  var dropdown_mode = block.getFieldValue('mode');
  // TODO: Assemble Python into code variable.
  var code = 'p_'+value_elpin+'.'+dropdown_mode+'()\n';
  return code;
};


/*****************************************************************
 * 						BEGIN GPIO READ DIGITAL
 * ***************************************************************/

Blockly.Blocks['gpio_read'] = {
  init: function() {
    this.appendValueInput("elPin")
        .setCheck("String")
        .appendField("Leer Pin");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['gpio_read'] = function(block) {
  var value_elpin = Blockly.Python.valueToCode(block, 'elPin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'p_'+value_elpin+'.value()\n';
  return code;
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
    this.setColour(65);
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


/*****************************************************************
 * 						BEGIN GPIO WRITE ANALOGA
 * **************************************************************/

Blockly.Blocks['gpio_write_dac'] = {
  init: function() {
    this.appendValueInput("elPin")
        .setCheck(null)
        .appendField("Esccribir DAC");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Alto", "high"], ["Bajo", "low"]]), "mode");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['gpio_write_dac'] = function(block) {
  var value_elpin = Blockly.Python.valueToCode(block, 'elPin', Blockly.Python.ORDER_ATOMIC);
  var dropdown_mode = block.getFieldValue('mode');
  // TODO: Assemble Python into code variable.
  var code = 'p_'+value_elpin+'.'+dropdown_mode+'()\n';
  return code;
};


/*****************************************************************
 * 						BEGIN GPIO READ ANALOGO
 * ***************************************************************/

Blockly.Blocks['gpio_read_adc'] = {
  init: function() {
    this.appendValueInput("elPin")
        .setCheck("String")
        .appendField("Leer ADC");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['gpio_read_adc'] = function(block) {
  var value_elpin = Blockly.Python.valueToCode(block, 'elPin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'p_'+value_elpin+'.value()\n';
  return code;
};


/*****************************************************************
 * 						LIST GPIO ANALOGO
 * ***************************************************************/

Blockly.Blocks['pin_analogo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pin Analogo (Entrada)")
        .appendField(new Blockly.FieldDropdown([["SEN1", "SEN1"], ["SEN2", "SEN2"], ["SEN3", "SEN3"], ["SEN4", "SEN4"], ["SEN5", "SEN5"], ["SEN6", "SEN6"], ["SEN7", "SEN7"], ["SEN8", "SEN8"]]), "pines_A");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['pin_analogo'] = function(block) {
  var dropdown_pines_a = block.getFieldValue('pines_A');
  // TODO: Assemble Python into code variable.
  var code = '\''+dropdown_pines_a+'\'';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

/*****************************************************************
 * 						LIST GPIO ANALOGO Out
 * ***************************************************************/

Blockly.Blocks['pin_analogo_out'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pin Analogo (Salida)")
        .appendField(new Blockly.FieldDropdown([["SEN5", "SEN5"], ["SEN6", "SEN6"]]), "pines_A");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['pin_analogo_out'] = function(block) {
  var dropdown_pines_a = block.getFieldValue('pines_A');
  // TODO: Assemble Python into code variable.
  var code = '\''+dropdown_pines_a+'\'';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
