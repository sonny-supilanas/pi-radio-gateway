#!/bin/bash
# 16913 is extension number for this terminal 
# this script is used for the web app, to control the port group
sudo asterisk -rx 'core show channels' | grep -o 16913
