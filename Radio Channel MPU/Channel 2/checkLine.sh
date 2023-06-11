#!/bin/bash
# 16912 is extension number for this terminal
# this script is used for the web app, to control the port group
ssh pi@pbx "sudo asterisk -rx 'core show channels' | grep -o 16912"
