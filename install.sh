#!/usr/bin/env bash
#  This script should do all the preparation for your project to run, such as downloading any dependencies and compiling if necessary

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

dirPath="${DIR}/clara/tmp"
nodeVersion="6.11.1"

sysSetup &&
applicationSetup

# System Setup

function sysSetup() {
    # @TODO Check current system state before doing all this
    # assumes empty machine
    echo "Creating file paths"
    mkdir $dirPath -p &&
    cd $dirPath &&
    echo "Downloading node setup"
    curl -sL https://deb.nodesource.com/setup_$nodeVersion -o nodesource_setup.sh &&
    echo "Executing setup" &&
    chmod +x nodeousrce_setup.sh &&
    exec nodesource_setup.sh &&
    echo "Updating system dependencies" &&
    apt-get install nodejs npm git build-essentials &&
    echo "Cleaning up" &&
    cd .. &&
    rmdir tmp
}

# Application Setup
function applicationSetup(){
    echo "Fetching application" &&
    git clone https://github.com/orloc/giphySearch.git  &&
    cd giphySearch &&
    npm install &&
    

    
}

