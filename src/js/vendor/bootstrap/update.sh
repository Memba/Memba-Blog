#!/bin/sh

# change directory to script location
cd "$(dirname "$0")"

find ./ -type f -exec chmod u+w {} \;
cp -f -r ../../../../node_modules/bootstrap/js/src/* ./
find ./ -type f -exec chmod u-w {} \;

