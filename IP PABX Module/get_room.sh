#!/bin/bash
myText=$(sudo asterisk -rx "core show channel $1" | egrep MEETME_ROOMNUM)

IFS='=' read -ra myArr <<< $myText

echo ${myArr[1]}
