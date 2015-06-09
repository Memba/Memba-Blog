cd /d %~dp0
REM ************************************************************
REM IMPORTANT!
REM Kidoju.WebApp is the original project where any modifications
REM of locked read-only files should be completed.
REM ************************************************************

REM ------------------------------------------------------------
REM Root files
REM ------------------------------------------------------------

REM copy all dot files
ATTRIB -R .\.*
COPY ..\..\Kidoju\Kidoju.Webapp\.* .\ /Y
ATTRIB +R .\.*

REM build.cmd and BUILD.md
ATTRIB -R .\build.*
COPY ..\..\Kidoju\Kidoju.Webapp\build.* .\ /Y
ATTRIB +R .\build.*

REM TODO Coverage

REM Dockerfile
ATTRIB -R .\Dockerfile
COPY ..\..\Kioju\Kidoju.Webapp\Dockerfile .\ /Y
ATTRIB +R .\Dockerfile

REM gruntfile.js
ATTRIB -R .\gruntfile.js
COPY ..\..\Kioju\Kidoju.Webapp\gruntfile.js .\ /Y
ATTRIB +R .\gruntfile.js

REM LICENSE
ATTRIB -R .\LICENSE-GPLv3
COPY ..\..\Kioju\Kidoju.Webapp\LICENSE-GPLv3 .\ /Y
ATTRIB +R .\LICENSE-GPLv3

REM setup.cmd
ATTRIB -R .\setup.cmd
COPY ..\..\Kidoju\Kidoju.Webapp\setup.cmd .\ /Y
ATTRIB +R .\setup.cmd

REM UPDATE.md
ATTRIB -R .\UPDATE.md
COPY ..\..\Kidoju\Kidoju.Webapp\UPDATE.md .\ /Y
ATTRIB +R .\UPDATE.md

REM webpack
REM ATTRIB -R .\webpack.config.js
REM COPY ..\..\Kidoju\Kidoju.Webapp\webpack.config.js .\ /Y
REM ATTRIB +R .\webpack.config.js

REM ------------------------------------------------------------
REM Support files
REM ------------------------------------------------------------

REM Copy ./js files
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\cultures\*.*  .\js\cultures\ /C /E /I /R /Y
ATTRIB +R .\js\cultures\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\vendor\bootstrap\*.* .\js\vendor\bootstrap\ /C /E /I /R /Y
ATTRIB +R .\js\vendor\bootstrap\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\vendor\kendo\*.* .\js\vendor\kendo\ /C /E /I /R /Y
ATTRIB +R .\js\vendor\kendo\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\vendor\logentries\*.* .\js\vendor\logentries\ /C /E /I /R /Y
ATTRIB +R .\js\vendor\logentries\*.* /S
XCOPY ..\..\Kidoju\Kidoju.Webapp\js\logentries\*.* .\js\vendor\logentries\ /C /E /I /R /Y
ATTRIB +R .\js\vendor\logentries\*.* /S

REM ./js/app.error.js
ATTRIB -R .\js\app.error.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\app.error.js .\js\ /Y
ATTRIB +R .\js\app.error.js

REM ./js/app.init.js
ATTRIB -R .\js\app.init.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\app.init.js .\js\ /Y
ATTRIB +R .\js\app.init.js

REM ./js/app.locale.js
ATTRIB -R .\js\app.locale.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\app.locale.js .\js\ /Y
ATTRIB +R .\js\app.locale.js

REM ./js/app.logger.js
ATTRIB -R .\js\app.logger.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\app.logger.js .\js\ /Y
ATTRIB +R .\js\app.logger.js

REM ./js/app.support.js
ATTRIB -R .\js\app.support.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\app.support.js .\js\ /Y
ATTRIB +R .\js\app.support.js

REM ./js/app.theme.js
ATTRIB -R .\js\app.theme.js
COPY ..\..\Kidoju\Kidoju.Webapp\js\app.theme.js .\js\ /Y
ATTRIB +R .\js\app.theme.js

REM Copy \styles
REM XCOPY ..\..\Memba\Memba.Blog\styles .\styles /C /E /I /R /Y
REM COPY .\graphics\memba.home.jpg .\styles\images\jumbotron.jpg
REM ATTRIB +R .\styles\*.* /S

REM Copy Kidoju fonts
XCOPY ..\..\Kidoju\Kidoju.WebFonts\dist\fonts\*.* .\styles\fonts\ /C /E /I /R /Y
ATTRIB +R .\styles\fonts\*.* /S

REM Copy theme files
REM XCOPY ..\..\Kidoju\Kidoju.Webapp\styles\app.theme.*.less  .\styles\ /C /E /I /R /Y
REM ATTRIB +R .\styles\fonts\*.* /S
ATTRIB -R .\styles\app.mixins.less
COPY ..\..\Kidoju\Kidoju.Webapp\styles\app.mixins.less .\styles\ /Y
ATTRIB +R .\styles\app.mixins.less

ATTRIB -R .\styles\app.page.common.less
COPY ..\..\Kidoju\Kidoju.Webapp\styles\app.page.common.less .\styles\ /Y
ATTRIB +R .\styles\app.page.common.less

ATTRIB -R .\styles\app.template.less
COPY ..\..\Kidoju\Kidoju.Webapp\styles\app.template.less .\styles\ /Y
ATTRIB +R .\styles\app.template.less

ATTRIB -R .\styles\app.theme.*.less
COPY ..\..\Kidoju\Kidoju.Webapp\styles\app.theme.*.less .\styles\ /Y
ATTRIB +R .\styles\app.theme.*.less

REM Copy web_modules
XCOPY ..\..\Kidoju\Kidoju.Webapp\web_modules\*.*  .\web_modules\ /C /E /I /R /Y
ATTRIB +R .\web_modules\*.* /S

REM ------------------------------------------------------------
REM Web Application
REM ------------------------------------------------------------

REM Copy ./config/*.*
ATTRIB -R .\webapp\config\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\config\index.js .\webapp\config /Y
ATTRIB +R .\webapp\config\index.js

REM Copy ./lib/*.*
ATTRIB -R .\webapp\lib\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\error.js .\webapp\lib /Y
ATTRIB +R .\webapp\lib\error.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\logger.js .\webapp\lib /Y
ATTRIB +R .\webapp\lib\logger.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\url.js .\webapp\lib /Y
ATTRIB +R .\webapp\lib\url.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\lib\utils.js .\webapp\lib /Y
ATTRIB +R .\webapp\lib\utils.js

REM Copy ./middleware/*.*
ATTRIB -R .\webapp\middleware\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\error.js .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\error.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\language.js .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\language.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\middleware\notFound.js .\webapp\middleware /Y
ATTRIB +R .\webapp\middleware\notFound.js

REM Copy ./views/*.*
ATTRIB -R .\webapp\views\*.*
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\views\error.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\error.ejs
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\views\footer.ejs .\webapp\views /Y
ATTRIB +R .\webapp\views\footer.ejs

REM Copy ./server.js
ATTRIB -R .\webapp\server.js
COPY ..\..\Kidoju\Kidoju.Webapp\webapp\server.js .\webapp\ /Y
ATTRIB +R .\webapp\server.js
