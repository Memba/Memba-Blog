cd /d %~dp0

REM copy js files
xcopy ..\..\Kidoju\Kidoju.Webapp\js\cultures\*.*  \js\cultures\ /S /C /Y
REM copy ..\..\Kidoju\Kidoju.Webapp\web_modules\jsx-loader\README.md \web_modules\jsx-loader\README.md /Y

REM Copy Kidoju webfonts
xcopy ..\..\Kidoju\Kidoju.WebFonts\dist\fonts\*.* \styles\fonts\ /S /C /Y

REM copy themes
xcopy ..\..\Kidoju\Kidoju.Webapp\styles\app.theme.*.less  \styles\ /S /C /Y

REM update jsx loader in web_modules
xcopy ..\..\Kidoju\Kidoju.Webapp\web_modules\jsx-loader\*.*  \web_modules\jsx-loader\ /S /C /Y
