#!/usr/bin/env bash
#  This script should start up your service on port 8080

appName=dist/app.js

if [ ! -f $appName ]; then
 echo "Make sure you are in the project directory"
 exit 1
fi

echo "Starting app server"

forever $appName