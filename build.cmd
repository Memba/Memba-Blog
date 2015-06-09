@ECHO OFF
IF "%1"=="" GOTO BLANK
IF "%1"=="d" GOTO DEVELOPMENT
IF "%1"=="dev" GOTO DEVELOPMENT
IF "%1"=="development" GOTO DEVELOPMENT
IF "%1"=="p" GOTO PRODUCTION
IF "%1"=="prod" GOTO PRODUCTION
IF "%1"=="production" GOTO PRODUCTION
IF "%1"=="t" GOTO TEST
IF "%1"=="test" GOTO TEST
:ERROR
ECHO Unknown parameter. Use `d` or `dev` or `development`, `p` or `prod` or `production`, `t` or `test`.
GOTO DONE
:BLANK
ECHO Missing parameter. Use `d` or `dev` or `development`, `p` or `prod` or `production`, `t` or `test`.
GOTO DONE
:DEVELOPMENT
set NODE_ENV=development
GOTO BUILD
:PRODUCTION
set NODE_ENV=production
GOTO BUILD
:TEST
set NODE_ENV=test
GOTO BUILD
:BUILD
grunt build
:DONE
