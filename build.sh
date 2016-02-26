#!/bin/sh
# source ~/.bashrc

# echo '------------------------------------------------------------'
echo '>>> environment build'

if [ $# -lt 1 ]
then
    echo '>>> missing arguments'
    exit
fi

if [ "$1" == "d" ] || [ "$1" == "dev" ] || [ "$1" == "development" ]
then
    export NODE_ENV="development"
elif [ "$1" == "t" ] || [ "$1" == "test" ]
then
    export NODE_ENV="test"
elif [ "$1" == "p" ] || [ "$1" == "prod" ] || [ "$1" == "production" ]
then
    export NODE_ENV="production"
fi

# first change directory to script directory
cd "$(dirname "$0")"

# delete assets
rm -f ./webapp/public/assets/*

# rebuild
grunt build
