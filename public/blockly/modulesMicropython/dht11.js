// Iniciar DHT11
Blockly.Blocks['start_dht'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Iniciar");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("DHT");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE);
        //.appendField(new Blockly.FieldImage("./modulesMicropython/imag/iot.gif", 40, 40, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.aulal.org/');
  }
};

Blockly.Python['start_dht'] = function(block) {
  // var number_calibration_left = block.getFieldValue('calibration_left');
  // var number_calibration_right = block.getFieldValue('calibration_right');
  // TODO: Assemble Python into code variable.
  var code = 'from pyb import disable_irq, enable_irq\n'+
'class OneWire:\n'+
'    def __init__(self, pin):\n'+
'        self.data_pin = pin\n'+
'        self.write_delays = (1, 40, 40, 1)\n'+
'        self.read_delays = (1, 1, 40)\n'+
'        self.cache = (pin.init, pin.value, pin.OUT_PP, pin.IN, pin.PULL_UP)\n'+
'        pin.init(pin.IN, pin.PULL_UP)\n'+
'    def reset(self):\n'+
'        retries = 25\n'+
'        self.data_pin.init(self.data_pin.IN, self.data_pin.PULL_UP)\n'+
'        while True:\n'+
'            if self.data_pin.value():\n'+
'                break\n'+
'            retries -= 1\n'+
'            if retries == 0:\n'+
'                raise OSError("OneWire pin didnt go high")\n'+
'            pyb.udelay(10)\n'+
'        self.data_pin.low()\n'+
'        self.data_pin.init(self.data_pin.OUT_PP)\n'+
'        pyb.udelay(480)\n'+
'        i = pyb.disable_irq()\n'+
'        self.data_pin.init(self.data_pin.IN, self.data_pin.PULL_UP)\n'+
'        pyb.udelay(70)\n'+
'        presence = not self.data_pin.value()\n'+
'        pyb.enable_irq(i)\n'+
'        pyb.udelay(410)\n'+
'        return presence\n'+
'    def write_bit(self, value):\n'+
'        pin_init, pin_value, Pin_OUT_PP, Pin_IN, Pin_PULL_UP = self.cache\n'+
'        self._write_bit(value, pin_init, pin_value, Pin_OUT_PP)\n'+
'    def _write_bit(self, value, pin_init, pin_value, Pin_OUT_PP):\n'+
'        d0, d1, d2, d3 = self.write_delays\n'+
'        udelay = pyb.udelay\n'+
'        if value:\n'+
'            i = disable_irq()\n'+
'            pin_value(0)\n'+
'            pin_init(Pin_OUT_PP)\n'+
'            udelay(d0)\n'+
'            pin_value(1)\n'+
'            enable_irq(i)\n'+
'            udelay(d1)\n'+
'        else:\n'+
'            i = disable_irq()\n'+
'            pin_value(0)\n'+
'            pin_init(Pin_OUT_PP)\n'+
'            udelay(d2)\n'+
'            pin_value(1)\n'+
'            enable_irq(i)\n'+
'            udelay(d3)\n'+
'    def write_byte(self, value):\n'+
'        pin_init, pin_value, Pin_OUT_PP, Pin_IN, Pin_PULL_UP = self.cache\n'+
'        for i in range(8):\n'+
'            self._write_bit(value & 1, pin_init, pin_value, Pin_OUT_PP)\n'+
'            value >>= 1\n'+
'        pin_init(Pin_IN, Pin_PULL_UP)\n'+
'    def write_bytes(self, bytestring):\n'+
'        for byte in bytestring:\n'+
'            self.write_byte(byte)\n'+
'    def _read_bit(self, pin_init, pin_value, Pin_OUT_PP, Pin_IN, Pin_PULL_UP):\n'+
'        d0, d1, d2 = self.read_delays\n'+
'        udelay = pyb.udelay\n'+
'        pin_init(Pin_IN, Pin_PULL_UP)\n'+
'        i = disable_irq()\n'+
'        pin_value(0)\n'+
'        pin_init(Pin_OUT_PP)\n'+
'        udelay(d0)\n'+
'        pin_init(Pin_IN, Pin_PULL_UP)\n'+
'        udelay(d1)\n'+
'        value = pin_value()\n'+
'        enable_irq(i)\n'+
'        udelay(d2)\n'+
'        return value\n'+
'    def read_bit(self):\n'+
'        pin_init, pin_value, Pin_OUT_PP, Pin_IN, Pin_PULL_UP = self.cache\n'+
'        return self._read_bit(pin_init, pin_value, Pin_OUT_PP, Pin_IN, Pin_PULL_UP)\n'+
'    def read_byte(self):\n'+
'        pin_init, pin_value, Pin_OUT_PP, Pin_IN, Pin_PULL_UP = self.cache\n'+
'        value = 0\n'+
'        for i in range(8):\n'+
'            bit = self._read_bit(pin_init, pin_value, Pin_OUT_PP, Pin_IN, Pin_PULL_UP)\n'+
'            value |= bit << i\n'+
'        return value\n'+
'    def read_bytes(self, count):\n'+
'        s = bytearray(count)\n'+
'        for i in range(count):\n'+
'            s[i] = self.read_byte()\n'+
'        return s\n'+
'    def select_rom(self, rom):\n'+
'        assert len(rom) == 8, "ROM must be 8 bytes"\n'+
'        self.reset()\n'+
'        self.write_byte(0x55)\n'+
'        self.write_bytes(rom)\n'+
'    def read_rom(self):\n'+
'        self.reset()\n'+
'        self.write_byte(0x33)\n'+
'        rom = self.read_bytes(8)\n'+
'        return rom\n'+
'    def skip_rom(self):\n'+
'        self.write_byte(0xCC)\n'+
'    def depower(self):\n'+
'        self.data_pin.init(self.data_pin.IN, self.data_pin.PULL_NONE)\n'+
'    def scan(self):\n'+
'        devices = []\n'+
'        self._reset_search()\n'+
'        while True:\n'+
'            rom = self._search()\n'+
'            if not rom:\n'+
'                return devices\n'+
'            devices.append(rom)\n'+
'    def _reset_search(self):\n'+
'        self.last_discrepancy = 0\n'+
'        self.last_device_flag = False\n'+
'        self.last_family_discrepancy = 0\n'+
'        self.rom = bytearray(8)\n'+   
'    def _search(self):\n'+
'        id_bit_number = 1\n'+
'        last_zero = 0\n'+
'        rom_byte_number = 0\n'+
'        rom_byte_mask = 1\n'+
'        search_result = 0\n'+
'        pin_init, pin_value, Pin_OUT_PP, Pin_IN, Pin_PULL_UP = self.cache\n'+
'        if not self.last_device_flag:\n'+
'            if not self.reset():\n'+
'                self._reset_search()\n'+
'                return None\n'+
'            self.write_byte(0xF0)\n'+
'            while rom_byte_number < 8:\n'+
'                id_bit = self._read_bit(pin_init, pin_value, Pin_OUT_PP, Pin_IN, Pin_PULL_UP)\n'+
'                cmp_id_bit = self._read_bit(pin_init, pin_value, Pin_OUT_PP, Pin_IN, Pin_PULL_UP)\n'+
'                if (id_bit == 1) and (cmp_id_bit == 1):\n'+
'                    break\n'+
'                else:\n'+
'                    if (id_bit != cmp_id_bit):\n'+
'                       search_direction = id_bit\n'+
'                    else:\n'+
'                       if (id_bit_number < self.last_discrepancy):\n'+
'                          search_direction = (self.rom[rom_byte_number] & rom_byte_mask) > 0\n'+
'                       else:\n'+
'                          search_direction = (id_bit_number == self.last_discrepancy)\n'+
'                       if search_direction == 0:\n'+
'                           last_zero = id_bit_number\n'+
'                           if last_zero < 9:\n'+
'                               self.last_family_discrepancy = last_zero\n'+
'                    if search_direction == 1:\n'+
'                        self.rom[rom_byte_number] |= rom_byte_mask\n'+
'                    else:\n'+
'                        self.rom[rom_byte_number] &= ~rom_byte_mask\n'+
'                self.write_bit(search_direction)\n'+
'                id_bit_number += 1\n'+
'                rom_byte_mask <<= 1\n'+
'                if rom_byte_mask == 0x100:\n'+
'                    rom_byte_number += 1\n'+
'                    rom_byte_mask = 1\n'+
'        if not (id_bit_number < 65):\n'+
'            self.last_discrepancy = last_zero\n'+
'            if self.last_discrepancy == 0:\n'+
'                self.last_device_flag = True\n'+
'            search_result = True\n'+
'        if not search_result or not self.rom[0]:\n'+
'            self._reset_search()\n'+
'           return None\n'+
'       else:\n'+
'           return bytes(self.rom)\n'
  return code;
};


Blockly.Blocks['task_dht'] = {
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

Blockly.Python['task_dht'] = function(block) {
  var dropdown_wait = block.getFieldValue('wait');
  var value_command = Blockly.Python.valueToCode(block, 'command', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'command('+value_command+','+dropdown_wait+')\n';
  return code;
};