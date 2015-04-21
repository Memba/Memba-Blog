var webpack = require('webpack');
    loaderUtils = require('loader-utils'),
    ejs = require('ejs'),
    path = require('path'),
    fs = require('fs'),
    async = require('async');

//Copied from https://github.com/unclechu/node-deep-extend/blob/master/index.js
function deepExtend(/*obj_1, [obj_2], [obj_N]*/) {
    if (arguments.length < 1 || typeof arguments[0] !== 'object') {
        return false;
    }

    if (arguments.length < 2) return arguments[0];

    var target = arguments[0];

    // convert arguments to array and cut off target object
    var args = Array.prototype.slice.call(arguments, 1);

    var key, val, src, clone, tmpBuf;

    args.forEach(function (obj) {
        if (typeof obj !== 'object') return;

        for (key in obj) {
            if ( ! (key in obj)) continue;

            src = target[key];
            val = obj[key];

            if (val === target) continue;

            if (typeof val !== 'object' || val === null) {
                target[key] = val;
                continue;
            } else if (val instanceof Buffer) {
                tmpBuf = new Buffer(val.length);
                val.copy(tmpBuf);
                target[key] = tmpBuf;
                continue;
            } else if (val instanceof Date) {
                target[key] = new Date(val.getTime());
                continue;
            } else if (val instanceof RegExp) {
                target[key] = new RegExp(val);
                continue;
            }

            if (typeof src !== 'object' || src === null) {
                clone = (Array.isArray(val)) ? [] : {};
                target[key] = deepExtend(clone, val);
                continue;
            }

            if (Array.isArray(val)) {
                clone = (Array.isArray(src)) ? src : [];
            } else {
                clone = (!Array.isArray(src)) ? src : {};
            }

            target[key] = deepExtend(clone, val);
        }
    });

    return target;
}

module.exports = function(source) {
    var opts = loaderUtils.parseQuery(this.query),
        params = loaderUtils.parseQuery(this.resourceQuery),
        configDir = path.join(__dirname, '../..', opts.config), //go up from `/web_modules/jsx-loader` to project root `/` and then down to 'webapp/config'
        configEnv = (params.env || 'production').toLowerCase(),
        callback = this.async();
    console.log('jsx-loader started with process.env.NODE_ENV="' + configEnv + '"');
    this.cacheable && this.cacheable();
    var defaultFile = path.join(configDir, 'default.json');
    var configFile = path.join(configDir, configEnv + '.json');
    this.addDependency(defaultFile);
    this.addDependency(configFile);
    async.parallel([
            function(done){
                fs.readFile(defaultFile, 'utf-8', function(err, content) {
                    if(err) return done(err);
                    done(null, JSON.parse(content));
                });
            },
            function(done){
                fs.readFile(configFile, 'utf-8', function(err, content) {
                    if(err) return done(err);
                    done(null, JSON.parse(content));
                });
            }
        ],
        function(err, result) {
            if(err) return callback(err);
            var config = deepExtend(result[0], result[1]),
                output = ejs.render(source, config);
            callback(null, output);
        }
    );
    console.log('jsx-loader done');
};
