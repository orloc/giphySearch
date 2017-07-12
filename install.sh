#!/usr/bin/env bash
#  This script should do all the preparation for your project to run, such as downloading any dependencies and compiling if necessary

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

# System Setup

function sysSetup() {
    # @TODO Check current system state before doing all this
    # assumes empty machine
    echo "Updating system dependencies" &&
    apt-get update &&
    apt-get install nodejs npm git build-essential &&
    if [ -f /usr/bin/node ]; then
        echo "skipping linking"
    else
        ln -s /usr/bin/nodejs /usr/bin/node
    fi
}

# Application Setup
function applicationSetup(){
    echo "Installing application dependencies"
    npm install gulp forever -g && npm install && gulp &&
    echo "Setup Complete"
}


sysSetup &&
applicationSetup

# if this script where to be  deployed standalone
# - below is a version of it that would clone and install everything correcty
#
#DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#
#dirPath="${DIR}/clara"
#
## System Setup
#
#function sysSetup() {
#    # @TODO Check current system state before doing all this
#    # assumes empty machine
#    echo "Creating file paths"
#    mkdir $dirPath -p &&
#    echo "Updating system dependencies" &&
#    apt-get update &&
#    apt-get install nodejs npm git build-essential &&
#    if [ -f /usr/bin/node ]; then
#        echo "skipping linking"
#    else
#        ln -s /usr/bin/nodejs /usr/bin/node
#    fi
#}
#
## Application Setup
#function applicationSetup(){
#    echo "Fetching application" &&
#    git clone https://github.com/orloc/giphySearch.git  $dirPath/giphySearch &&
#    cd $dirPath/giphySearch &&
#    npm install gulp forever -g && npm install && gulp &&
#    echo "Setup Complete"
#}
#
#
#sysSetup &&
#applicationSetup
