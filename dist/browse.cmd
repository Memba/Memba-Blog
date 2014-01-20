REM wait 3 seconds
ping 1.1.1.1 -n 1 -w 3000 > nul
REM launch the default browser
REM start "" /MAX "http://localhost:8080/index.html"
REM we prefer and recommend chrome
REM taskkill /IM /F chrome.exe
start "" /MAX "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" "http://localhost:8080/index.html"
exit