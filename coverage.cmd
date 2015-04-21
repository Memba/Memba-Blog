cd /d %~dp0
istanbul cover node_modules/mocha/bin/_mocha -- ./test/webapp/**/*.js -R spec
