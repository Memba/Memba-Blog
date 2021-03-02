cd /d %~dp0
call "%ProgramFiles%\nodejs\nodevars.bat"
REM required to build fibers (for wdio-mocha-framework)
set PYTHON="C:\Python27\python.exe"
REM update npm, which is a requirement for some modules
npm install -g npm
REM code coverage with istanbul
REM npm install -g istanbul
REM karma command in terminal mode
npm install -g karma-cli
REM mocha command in terminal mode
npm install -g mocha
REM nodemon to run webapp while debugging browser code
npm install -g forever
npm install -g nodemon
REM less module for Jetbrains plugin
REM npm install -g less
REM build with webpack
npm install -g webpack
REM npm install -g webpack-cli
REM phonegap and weinre
npm install -g cordova
npm install -g weinre
npm install -g cordova-check-plugins
REM selenium
REM npm install -g selenium-standalone
REM selenium-standalone install
REM node security platform
npm install -g nsp
REM install all local modules in package.json
npm install
