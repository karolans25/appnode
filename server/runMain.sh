#!/usr/bin/expect

set ip [lindex $argv 0]
set port [lindex $argv 1]
set miMainPy [lindex $argv 2]
set timeout 1

spawn telnet $ip $port
expect "Escape character is '^]'."
send "\x1d\n"
expect "telnet>"
send "mode character\n\n\n"
expect {
			">>> " {}
			timeout {
			puts "conection failure!!!"
			exit 1
			}
		}
send "print(\"ok\")\n"
expect "ok"
send "\n"
expect ">>> "
set fp [open $miMainPy r]
while {[gets $fp line] != -1} {
		send $line
		expect $line
		send "\n"
		expect {
			">>> " {}
			"... " {}
		}
}
close $fp
send "\n"
expect ">>>"

close
