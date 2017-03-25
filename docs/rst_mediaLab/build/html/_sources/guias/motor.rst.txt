Manejo de Motores
=================

.. image:: imag/motor.png

.. code:: python
        
    from pyb import Timer, Pin
    
    class mobile:
        pl = 100
        pr = 100
        def __init__(self):
            timerMotors = Timer(1, freq=1000)
            self.lPWM = timerMotors.channel(2, Timer.PWM, pin=Pin('SP_M0'))
            self.rPWM = timerMotors.channel(4, Timer.PWM, pin=Pin('SP_M1'))
            self.ld = Pin('DIR_M0', mode=Pin.OUT)
            self.rd = Pin('DIR_M1', mode=Pin.OUT)
        def calibration(self, l, r):
            self.pl = l
            self.pd = r
        def run(self, l, r):
            self.lPWM.pulse_width_percent(int(abs(l)*self.pl/100))
            self.rPWM.pulse_width_percent(int(abs(r)*self.pr/100))
            if l < 0:
                self.ld.low()
            else:
                self.ld.high()
            if r < 0:
                self.rd.low()
            else:
                self.rd.high()

