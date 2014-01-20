call "%ProgramFiles%\nodejs\nodevars.bat"
cd %~dp0
start browse.cmd
node nodejs/http.server.js 