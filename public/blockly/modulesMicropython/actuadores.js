/***************************************************************
 * 			BEGIN BRIDGE H
 *************************************************************/

Blockly.Blocks['init_movil'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("START PUENTE H");
    this.appendDummyInput()
        .appendField("Motor izquierdo Velocidad")
        .appendField(new Blockly.FieldNumber(100, 0, 100), "calibration_left")
        .appendField("%");
    this.appendDummyInput()
        .appendField("Motor derecho Velocidad ")
        .appendField(new Blockly.FieldNumber(100, 0, 100), "calibration_right")
        .appendField("%");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['init_movil'] = function(block) {
  var number_calibration_left = block.getFieldValue('calibration_left');
  var number_calibration_right = block.getFieldValue('calibration_right');
  // TODO: Assemble Python into code variable.
  var code = 'from pyb import Timer, Pin\n'+
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
'movil.calibration('+number_calibration_left+','+number_calibration_right+')\n';
  return code;
};

/***************************************************************
 * 			BEGIN RUN MOVIL
 *************************************************************/
Blockly.Blocks['run_movil'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("RUN PUENTE H");
    this.appendDummyInput()
        .appendField("Motor Izquierdo")
        .appendField(new Blockly.FieldNumber(0, -100, 100), "vel_left");
    this.appendDummyInput()
        .appendField("Motor Derecho ")
        .appendField(new Blockly.FieldNumber(0, -100, 100), "vel_right");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Python['run_movil'] = function(block) {
  var number_vel_left = block.getFieldValue('vel_left');
  var number_vel_right = block.getFieldValue('vel_right');
  // TODO: Assemble Python into code variable.
  var code = 'movil.run('+number_vel_left+','+number_vel_right+')\n';
  return code;
};

/***************************************************************
 * 			BEGIN CALIBRATE MOVIL
 *************************************************************/

Blockly.Blocks['calibration_movil'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("CALIBRACIÓN PUENTE H");
    this.appendDummyInput()
        .appendField("Motor Izquierdo")
        .appendField(new Blockly.FieldNumber(100, 0, 100), "cal_left")
        .appendField("%");
    this.appendDummyInput()
        .appendField("Motor Derecho ")
        .appendField(new Blockly.FieldNumber(100, 0, 100), "cal_right")
        .appendField("%");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Python['calibration_movil'] = function(block) {
  var number_cal_left = block.getFieldValue('cal_left');
  var number_cal_right = block.getFieldValue('cal_right');
  // TODO: Assemble Python into code variable.
  var code = 'movil.calibration('+number_cal_left+','+number_cal_right+')\n';
  return code;
};

/************************************************************
 * 		MODULE SERVOMOTOR
 ***********************************************************/

Blockly.Blocks['library_servo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/servo.gif", 30, 30, "*"))
        .appendField("Servomotores");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Python['library_servo'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'from pyb import Pin, Timer\n'+
'class servomotor:\n'+
'    def __init__(self, pin):\n'+
'        timer = Timer(4, freq=200)\n'+
'        self.ch = timer.channel(5-pin, Timer.PWM, pin=Pin(\'SRV\'+str(pin)))\n'+
'    def angulo(self,x):\n'+
'        if 0 <= x and x <= 180:\n'+
'            self.ch.pulse_width(4800+int(x*15600/180))\n\n\n';

  return code;
};

/************************************************************
 * 		START SERVO
 ***********************************************************/

Blockly.Blocks['start_servo'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Start Servo");
    this.appendValueInput("numberServo")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Pin servo: SRV");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['start_servo'] = function(block) {
  var value_numberservo = Blockly.Python.valueToCode(block, 'numberServo', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'Servo_'+value_numberservo+' = servomotor('+value_numberservo+')\n';
  return code;
};

/**********************************************
 * 		RUN SERVO
 *********************************************/

Blockly.Blocks['run_servo'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Run Servo");
    this.appendValueInput("numberServo")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Pin servo: SRV");
    this.appendValueInput("angule")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Angulo en grados");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['run_servo'] = function(block) {
  var value_numberservo = Blockly.Python.valueToCode(block, 'numberServo', Blockly.Python.ORDER_ATOMIC);
  var value_angule = Blockly.Python.valueToCode(block, 'angule', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'Servo_'+value_numberservo+'.angulo('+value_angule+')\n';
  return code;
};


/***************************************************************
 * 			LIBRARY STEPPER
 *************************************************************/

Blockly.Blocks['library_stepper'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("./modulesMicropython/imag/stepper.gif", 40, 40, "*"))
        .appendField("Motor Paso a Paso");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['library_stepper'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'class motorStep:\n'+
'    def __init__(self, pins):\n'+
'        self.pins = [Pin(pin, Pin.OUT_PP) for pin in pins]\n'+
'    def forward(self, steps, delay):\n'+
'        for i in range(steps):\n'+
'            for j in range(4):\n'+
'                for pin in self.pins:\n'+
'                    pin.low()\n'+
'                self.pins[j].high()\n'+
'                self.pins[7-j].high()\n'+
'                pyb.delay(delay)\n'+
'    def reverse(self, steps, delay):\n'+
'        for i in range(steps):\n'+
'            for j in range(4):\n'+
'                for pin in self.pins:\n'+
'                    pin.low()\n'+
'                self.pins[3-j].high()\n'+
'                self.pins[j+4].high()\n'+
'                pyb.delay(delay)\n'+
'    def rotLeft(self, steps, delay):\n'+
'        for i in range(steps):\n'+
'            for j in range(4):\n'+
'                for pin in self.pins:\n'+
'                    pin.low()\n'+
'                self.pins[j].high()\n'+
'                self.pins[j+4].high()\n'+
'                pyb.delay(delay)\n'+
'    def rotRight(self, steps, delay):\n'+
'        for i in range(steps):\n'+
'            for j in range(4):\n'+
'                for pin in self.pins:\n'+
'                    pin.low()\n'+
'                self.pins[3-j].high()\n'+
'                self.pins[7-j].high()\n'+
'                pyb.delay(delay)\n\n'+
'motor = motorStep([\'CM1A\', \'CM1B\', \'CM1C\', \'CM1D\', \'CM2A\', \'CM2B\', \'CM2C\', \'CM2D\'])\n';
  return code;
};


/***************************************************************
 * 			MOVE STEPPER
 *************************************************************/

Blockly.Blocks['stepper_move'] = {
  init: function() {
    this.appendValueInput("steps")
        .setCheck("Number")
        .appendField(new Blockly.FieldDropdown([["Avanzar", "forward"], ["Retroceder", "reverse"], ["Girar a la derecha", "rotRight"], ["Girar a la izquierda", "rotLeft"]]), "move");
    this.appendDummyInput()
        .appendField("pasos");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['stepper_move'] = function(block) {
  var dropdown_move = block.getFieldValue('move');
  var value_steps = Blockly.Python.valueToCode(block, 'steps', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'motor.'+dropdown_move+'('+value_steps+', 3)\n';
  return code;
};
