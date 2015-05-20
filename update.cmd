cd /d %~dp0

REM Copy js files
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\cultures\*.*  .\js\cultures\ /C /E /I /R /Y
ATTRIB +R .\js\cultures\*.* /S

REM Copy Kidoju fonts
XCOPY ..\..\Kidoju\Kidoju.WebFonts\dist\fonts\*.* .\styles\fonts\ /C /E /I /R /Y
ATTRIB +R .\styles\fonts\*.* /S

REM Copy theme files
REM XCOPY ..\..\Kidoju\Kidoju.Webapp\styles\app.theme.*.less  .\styles\ /C /E /I /R /Y
REM ATTRIB +R .\styles\fonts\*.* /S
COPY ..\..\Kidoju\Kidoju.Webapp\styles\app.mixins.less .\styles\ /Y
ATTRIB +R .\styles\app.mixins.less
COPY ..\..\Kidoju\Kidoju.Webapp\styles\app.template.less .\styles\ /Y
ATTRIB +R .\styles\app.template.less
COPY ..\..\Kidoju\Kidoju.Webapp\styles\app.theme.*.less .\styles\ /Y
ATTRIB +R .\styles\app.theme.*.less

REM Copy web_modules
XCOPY ..\..\Kidoju\Kidoju.Webapp\web_modules\*.*  .\web_modules\ /C /E /I /R /Y
ATTRIB +R .\web_modules\*.* /S
