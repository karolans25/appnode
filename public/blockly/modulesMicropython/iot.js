// Iniciar IOT y/o comandos
Blockly.Blocks['start_iot'] = {
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

Blockly.Python['start_iot'] = function(block) {
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

//Tarea IOT
Blockly.Blocks['task_iot'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("IOT");
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

Blockly.Python['task_iot'] = function(block) {
  var dropdown_wait = block.getFieldValue('wait');
  var value_command = Blockly.Python.valueToCode(block, 'command', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'command('+value_command+','+dropdown_wait+')\npyb.delay(50)\n'; // Un pequelo delay para sincronizacion 
  return code;
};

// MQTT iniciar
Blockly.Blocks['mqtt_init'] = {
  init: function() {
    this.appendValueInput("broker")
        .setCheck("String")
        .appendField("Iniciar MQTT")
        .appendField("Broker:");
    this.appendValueInput("port")
        .setCheck("String")
        .appendField("port:");
    this.appendValueInput("id")
        .setCheck("String")
        .appendField("id:");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['mqtt_init'] = function(block) {
  var value_broker = Blockly.Python.valueToCode(block, 'broker', Blockly.Python.ORDER_ATOMIC);
  var value_port = Blockly.Python.valueToCode(block, 'port', Blockly.Python.ORDER_ATOMIC);
  var value_id = Blockly.Python.valueToCode(block, 'id', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '\'MQTT_INIT\\r\'+str('+value_broker+')+\'\\r\'+str('+value_port+')+\'\\r\'+str('+value_id+')+\'\\r\'';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['mqtt_sub'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("MQTT");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Subcripción");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("mqtt_sub(a,m)");
    this.appendStatementInput("topics")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Asuntos");
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['mqtt_sub'] = function(block) {
  var statements_topics = Blockly.Python.statementToCode(block, 'topics');
  // TODO: Assemble Python into code variable.
  var code = '\'MQTT_SUB\\r\''+statements_topics;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// Asunto MQTT
Blockly.Blocks['mqtt_topic'] = {
  init: function() {
    this.appendValueInput("topic")
        .setCheck("String")
        .appendField("Asunto");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['mqtt_topic'] = function(block) {
  var value_topic = Blockly.Python.valueToCode(block, 'topic', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '+str('+value_topic+')+\'\\r\'';
  return code;
};

// Publicacion MQTT
Blockly.Blocks['mqtt_pub'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Publicar MQTT");
    this.appendValueInput("topic")
        .setCheck(null)
        .appendField("Asunto:");
    this.appendValueInput("message")
        .setCheck(null)
        .appendField("Mensaje:");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['mqtt_pub'] = function(block) {
  var value_topic = Blockly.Python.valueToCode(block, 'topic', Blockly.Python.ORDER_ATOMIC);
  var value_message = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '\'MQTT_PUB\\r\'+str('+value_topic+')+\'\\r\'+str('+value_message+')+\'\\r\'';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
// ThingSpeak
Blockly.Blocks['write_thingspeak'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("ThingSpeak");
    this.appendValueInput("key")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("API Key");
    this.appendStatementInput("field")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Fields:");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['write_thingspeak'] = function(block) {
  var value_key = Blockly.Python.valueToCode(block, 'key', Blockly.Python.ORDER_ATOMIC);
  var statements_field = Blockly.Python.statementToCode(block, 'field');
  // TODO: Assemble Python into code variable.
  var code = '\'TSW\\r\'+str('+value_key+')+\'\\r\''+statements_field;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

//ThingSpeak Fields
Blockly.Blocks['field_thingspeak'] = {
  init: function() {
    this.appendValueInput("data")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["field1", "1"], ["field2", "2"], ["field3", "3"], ["field4", "4"], ["field5", "5"], ["field6", "6"], ["field7", "7"], ["field8", "8"]]), "field");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['field_thingspeak'] = function(block) {
  var dropdown_field = block.getFieldValue('field');
  var value_data = Blockly.Python.valueToCode(block, 'data', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '+\''+dropdown_field+'\\r\'+str('+value_data+')+\'\\r\'';
  return code;
};
