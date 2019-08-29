cd /d %~dp0
set NODE_ENV=test
REM istanbul cover node_modules/mocha/bin/_mocha -- ./test/webapp/**/*.js -R spec
REM https://istanbul.js.org/docs/tutorials/mocha/
REM nyc --reporter=html mocha ./test/node/**/*.test.es6 --timeout=10000
node --max_old_space_size=8192 ./node_modules/nyc/bin/nyc.js --reporter=html mocha ./test/node/**/*.test.es6 --timeout=10000
