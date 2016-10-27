#!/usr/bin/expect

set ip [lindex $argv 0]
set port [lindex $argv 1]
set timeout 1

spawn telnet $ip $port
expect "'^]'."
expect {
			"host: Connection refused" {
				puts "This is NOT an ESP."
				send_user "ERROR:EXITING!"
				exit
			}
	   }
close
