IP PABX 
1. Download raspberry Pi Asterisk/FreePBX pre-built image from https://www.raspberry-asterisk.org/ and burn to SD card.
2. Plan your IP network and setup static IP for this Pi because all clients will point to this. 
3. Configure FreePBX with extension and conference numbers. There are online tutorials available like https://www.whichvoip.com/articles/freepbx-setup-tutorial.htm. 

Dialplan
extension 16911 - Pi 1
extension 16912 - Pi 2
extension 16913 - Pi 3

conference 2011 - radio channel 1
conference 2012 - radio channel 2
conference 2013 - radio channel 3

Add extension number for IP phones and mobile phones.

4. Configure extension numbers to IP phone, or SIP softphone to PC/Laptop and mobile phone

Test calls between phones on local network.

5. Install twinkle on Pi using "apt" or use your favorite installation program.

Twinkle is a softphone (https://mfnboer.home.xs4all.nl/twinkle/), configure extension number 16913 on this Pi and make test calls.

6. Copy "data.db" sqlite database file into Pi, note file path.
7. Copy "get_room.sh" script file into Pi, note file path.
8. Install Nodered (https://nodered.org/docs/getting-started/local)

Import the flows found in Nodered folder.

