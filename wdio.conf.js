/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// const path = require('path');

/** *************************************************************
 * On any platform including Travis-CI
 ************************************************************** */

let capabilities = [
    {
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 1,
        browserName: 'chrome',
        // https://github.com/webdriverio/webdriverio/issues/3130#issuecomment-447405876
        'goog:chromeOptions': {
            args: ['headless', 'disable-gpu']
        }
        // unexpectedAlertBehaviour: 'ignore'
        // TODO Consider wdio-phantomjs-service (waiting for @wdio/phantomjs-service)
    }
];
let seleniumArgs = {};

/** **************************************************************
 * In our Windows environment
 * @see https://medium.com/@jlchereau/how-to-configure-webdrivier-io-with-selenium-standalone-and-additional-browsers-9369d38bc4d1
 *************************************************************** */

if (/^win/.test(process.platform)) {
    seleniumArgs = {
        // Drivers can be downloaded at http://docs.seleniumhq.org/download/
        javaArgs: [
            // Add Microsoft Edge driver
            '-Dwebdriver.edge.driver=C:\\Windows\\System32\\MicrosoftWebDriver.exe'

            // Add opera driver
            // `-Dwebdriver.opera.driver=${path.join(__dirname, './test/bin/operadriver.exe')}`,
            // '-Dwebdriver.opera.driver=C:\\Users\\jlche\\AppData\\Roaming\\npm\\node_modules\\selenium-standalone\\.selenium\\chromedriver\\2.43-x64-chromedriver'
        ]
        // For other opts, see https://github.com/vvo/selenium-standalone/blob/master/lib/start.js#L22
        // seleniumArgs: [],
        // version
        // spawnCb
        // drivers
        // basePath
        // javaPath
    };
    capabilities = [
        {
            maxInstances: 1,
            browserName: 'chrome'
            // 'goog:chromeOptions': {}
        },
        {
            maxInstances: 1,
            browserName: 'firefox'
            // 'moz:firefoxOptions': { args: ['-headless'] }
        },
        {
            maxInstances: 1,
            browserName: 'internet explorer'
            // 'se:ieOptions': {}
        } /* ,
        {
            // See https://github.com/webdriverio/webdriverio/issues/3196
            maxInstances: 1,
            browserName: 'MicrosoftEdge'
        },
        // The following driver is installed with phantomjs-prebuilt
        {
            // See https://github.com/webdriverio/webdriverio/issues/3198
            maxInstances: 1,
            browserName: 'phantomjs',
            // Without the path, phantomJS is not found on Windows
            // 'phantomjs.binary.path': 'C:\\Program Files (x86)\\PhantomJS\\bin\\phantomjs.EXE'
            'phantomjs.binary.path': path.join(__dirname, './node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs.exe')
        },
        {
            maxInstances: 1,
            browserName: 'operablink',
            'goog:chromeOptions': {
                args: [],
                extensions: [],
                // binary: 'C:\\Program Files (x86)\\Opera\\launcher.exe'
                binary:
                    'C:\\Program Files (x86)\\Opera\\57.0.3098.106\\opera.exe'
            }
        } */
    ];
}

module.exports.config = {
    // =====================
    // Server Configurations
    // =====================
    // Host address of the running Selenium server. This information is usually obsolete as
    // WebdriverIO automatically connects to localhost. Also, if you are using one of the
    // supported cloud services like Sauce Labs, Browserstack, or Testing Bot you don't
    // need to define host and port information because WebdriverIO can figure that out
    // according to your user and key information. However, if you are using a private Selenium
    // backend you should define the host address, port, and path here.
    //
    // host: '0.0.0.0',
    // port: 4444,
    // path: '/wd/hub',
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    //
    // =================
    // Service Providers
    // =================
    // WebdriverIO supports Sauce Labs, Browserstack, and Testing Bot (other cloud providers
    // should work too though). These services define specific user and key (or access key)
    // values you need to put in here in order to connect to these services.
    //
    // user: process.env.SAUCE_USERNAME,
    // key: process.env.SAUCE_ACCESS_KEY,
    //
    // If you run your tests on SauceLabs you can specify the region you want to run your tests
    // in via the `region` property. Available short handles for regions are:
    // us: us-west-1 (default)
    // eu: eu-central-1
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: ['./test/selenium/**/*.test.es6'],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities, // See above
    //
    // TODO BEGIN Check (was in webdriver v4 config, might not exist in v5)
    // When enabled opens a debug port for node-inspector and pauses execution
    // on `debugger` statements. The node-inspector can be attached with:
    // `node-inspector --debug-port 5859 --no-preload`
    // When debugging it is also recommended to change the timeout interval of
    // test runner (eg. jasmineNodeOpts.defaultTimeoutInterval) to a very high
    // value and setting maxInstances to 1.
    // debug: false,
    //
    // Additional list node arguments to use when starting child processes
    // execArgv: null,
    // TODO END
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    // More information at https://webdriver.io/docs/options.html
    //
    // TODO BEGIN Check (was in webdriver v4 config, might not exist in v5)
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    // sync: false,
    // TODO END
    //
    // Level of logging verbosity: trace | debug | info | warn | error
    logLevel: 'info',
    //
    // Enables colors for log output.
    coloredLogs: true, // TODO in v5?
    //
    // Warns when a deprecated command is used
    deprecationWarnings: true,
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './errorShots/',
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'http://localhost:3000',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as properties. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //     webdrivercss: {
    //         screenshotRoot: 'my-shots',
    //         failedComparisonsRoot: 'diffs',
    //         misMatchTolerance: 0.05,
    //         screenWidth: [320,480,640,1024]
    //     },
    //     webdriverrtc: {},
    //     browserevent: {}
    // },
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    // services: [],//
    // services: ['selenium-standalone', 'phantomjs'],
    services: ['selenium-standalone'],
    //
    // selenium-standalone configuration
    // @see http://webdriver.io/guide/services/selenium-standalone.html
    // @see https://www.npmjs.com/package/selenium-standalone
    seleniumArgs,
    //
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: http://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/docs/dot-reporter.html
    // reporters: ['dot'],
    reporters: ['spec'],
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000, // for gremlins
        require: ['js:@babel/register']
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    // Start the web application
    onPrepare: () => require('./webapp/server') // eslint-disable-line global-require
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    // beforeTest: function (test) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function () {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function () {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    // afterTest: function (test) {
    // },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // }
};
