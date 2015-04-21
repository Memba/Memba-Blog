cd /d %~dp0
REM update jsx loader
xcopy ..\..\Kidoju\Kidoju.Webapp\web_modules\jsx-loader\*.*  \web_modules\jsx-loader\*.* /S /C /Y

REM copy ..\..\Kidoju\Kidoju.Webapp\web_modules\jsx-loader\README.md \web_modules\jsx-loader\README.md /Y
