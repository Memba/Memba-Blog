cd /d %~dp0

REM bootstrap
XCOPY ..\..\..\..\node_modules\bootstrap\js\src\ .\ /C /E /I /R /Y
