/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/**
 * For an introduction to WebPack
 * @see https://github.com/petehunt/webpack-howto
 * @see http://slidedeck.io/unindented/webpack-presentation
 * @see http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html
 */

const path = require('path');
const sass = require('sass');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// TerserPlugin is actually installed with webpack
/* eslint-disable-next-line import/no-extraneous-dependencies, node/no-extraneous-require */
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const workboxPlugin = require('workbox-webpack-plugin');
const lessCommentPlugin = require('./web_modules/less-plugin/index.es6');
const config = require('./webapp/config/index.es6');
const pkg = require('./package.json');

const environment = config.environment || 'development';
const buildPath = config.get('uris:webpack:root');

console.log(`webpack environment is ${environment}`); // eslint-disable-line no-console
console.log(`webpack build path is ${buildPath}`); // eslint-disable-line no-console
console.log(`processing version ${pkg.version}`); // eslint-disable-line no-console

/**
 * DefinePlugin
 * definePlugin defines a global variable which is only available when running webpack
 * We use it to merge app.config.jsx with the proper
 * @type {webpack.DefinePlugin}
 * @see http://webpack.github.io/docs/list-of-plugins.html#defineplugin
 * @see https://github.com/petehunt/webpack-howto#6-feature-flags
 */
const definePlugin = new webpack.DefinePlugin({
    __NODE_ENV__: JSON.stringify(environment),
    __VERSION__: JSON.stringify(pkg.version),
});

/**
 * CleanWebpackPlugin
 * Deletes all files in webpack build directory
 * @type {never}
 */
const cleanWebpackPlugin = new CleanWebpackPlugin();

/**
 * commonsChunkPlugin builds a common denominator of the designated chunks
 * Note: This needs to be replaced in webpack 4
 * @see https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
 * @see https://github.com/webpack/webpack/issues/6701
 */
/*
const commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'common.bundle.js',
    chunks: ['error', 'home', 'post', 'page', 'search']
});
*/
/**
 * SourceMapDevToolPlugin builds source maps
 * For debugging in WebStorm see https://github.com/webpack/webpack/issues/238
 *
 * const sourceMapDevToolPlugin = new webpack.SourceMapDevToolPlugin(
 *     '[file].map', null,
 *     "[absolute-resource-path]", "[absolute-resource-path]"
 * );
 *
 * We are not using the source map plugin since webpack -d on the command line
 * produces sourcemaps in our development environment and we do not want sourcemaps in production.
 */

/**
 * BundleAnalyzerPlugin
 */
/*
const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
    analyzerMode: 'static'
    // analyzerPort: 7000 <-- Fatal error: listen EADDRINUSE 127.0.0.1:7000
});
*/

/**
 * workboxPlugin.GenerateSW
 * @type {GenerateSW}
 */
const workboxWebpackPlugin = new workboxPlugin.GenerateSW({
    // See https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    swDest: '../sw.js', // sw.js needs to be at the root of the web site to cache in local url (scope)
    cacheId: pkg.name.replace('.', '-'), // This names teh cache to run several web sites on http://localhost:3000
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    manifestTransforms: [
        (originalManifest) => {
            const manifest = originalManifest.concat([
                {
                    url: 'https://code.jquery.com/jquery-3.5.0.min.js',
                },
            ]);
            // Optionally, set warning messages.
            const warnings = [];
            return { manifest, warnings };
        },
    ],
    offlineGoogleAnalytics: true,
    runtimeCaching: [
        // See https://gist.github.com/addyosmani/0e1cfeeccad94edc2f0985a15adefe54
        // See also https://developers.google.com/web/tools/workbox/guides/common-recipes
        {
            // Our cdn assets
            urlPattern: new RegExp(`^${config.get('uris:cdn:root')}`),
            handler: 'CacheFirst',
            options: {
                // https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.strategies.CacheFirst
                cacheName: `${pkg.name.replace('.', '-')}-runtime-assets`,
                cacheableResponse: {
                    statuses: [0, 200],
                },
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                    purgeOnQuotaError: true,
                },
            },
        },
        {
            // Our web pages (not /build)
            // urlPattern: ({url, event}) => { console.log('--> ' + url); return false; },
            urlPattern: new RegExp(
                `^${config.get('uris:webapp:root')}${config
                    .get('uris:webapp:home')
                    .replace(/\/$/, '')}(/?$|/[a-z]{2}($|/))`
            ),
            handler: 'StaleWhileRevalidate',
            options: {
                // https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.strategies.StaleWhileRevalidate
                cacheName: `${pkg.name.replace('.', '-')}-runtime-content`,
            },
        },
        // Cache Google fonts
        // https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts
        {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
                // https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.strategies.StaleWhileRevalidate
                cacheName: `google-fonts-stylesheets`,
            },
        },
        {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'CacheFirst',
            options: {
                // https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.strategies.StaleWhileRevalidate
                cacheName: `google-fonts-webfonts`,
                cacheableResponse: {
                    statuses: [0, 200],
                },
                expiration: {
                    maxEntries: 20,
                    maxAgeSeconds: 365 * 24 * 60 * 60,
                    purgeOnQuotaError: true,
                },
            },
        },
    ],
    skipWaiting: true,
});

/**
 * Webpack configuration
 * @see https://github.com/webpack/docs/wiki/configuration
 */
module.exports = {
    // All paths below are relative to the context
    context: path.join(__dirname, '/'),
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    entry: {
        // We need init especially because of FOUJI
        init: './src/js/app/app.init.es6',
        // One entry per page
        error: './src/js/ui/error.page.es6',
        home: './src/js/ui/home.page.es6',
        page: './src/js/ui/page.page.es6',
        post: './src/js/ui/post.page.es6',
        search: './src/js/ui/search.page.es6',
    },
    externals: {
        // CDN modules
        jquery: 'jQuery',
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.(es6|mjs)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { babelrc: true },
                    },
                ],
            },
            {
                // Do not put a $ at the end of the test regex
                test: /\.jsx/, // see ./web_modules/jsx-loader?config=
                use: [
                    {
                        loader: './web_modules/jsx-loader/index.es6',
                        options: { config: 'webapp/config' },
                    },
                    {
                        loader: 'babel-loader',
                        options: { babelrc: true },
                    },
                ],
            },
            {
                test: /app\.theme\.[a-z0-9-]+\.scss$/,
                use: [
                    {
                        loader: 'bundle-loader',
                        options: { name: '[name]' },
                    },
                    {
                        loader: 'style-loader',
                        options: { injectType: 'lazyStyleTag' },
                    },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 2 },
                    },
                    { loader: 'postcss-loader' },
                    // See https://github.com/jlchereau/Kidoju-Webapp/issues/197
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sass,
                            // compress: true,
                            // relativeUrls: true,
                            // strictMath: true,
                            // plugins: [lessCommentPlugin]
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                exclude: /app\.theme\.[a-z0-9-]+\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    { loader: 'postcss-loader' },
                    // See https://github.com/jlchereau/Kidoju-Webapp/issues/197
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sass,
                        },
                    },
                ],
            },
            {
                test: /app\.theme\.[a-z0-9-]+\.less$/,
                use: [
                    {
                        loader: 'bundle-loader',
                        options: { name: '[name]' },
                    },
                    { loader: 'style-loader/useable' },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 2 },
                    },
                    { loader: 'postcss-loader' },
                    // See https://github.com/jlchereau/Kidoju-Webapp/issues/197
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                compress: true,
                                relativeUrls: true,
                                strictMath: true,
                                plugins: [lessCommentPlugin],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                exclude: /app\.theme\.[a-z0-9-]+\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    { loader: 'postcss-loader' },
                    // See https://github.com/jlchereau/Kidoju-Webapp/issues/197
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                compress: true,
                                relativeUrls: true,
                                strictMath: true,
                                plugins: [lessCommentPlugin],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    { loader: 'postcss-loader' },
                ],
            },
            {
                test: /\.(gif|png|jpe?g)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 8192 },
                    },
                ],
            },
            {
                test: /\.woff(2)?/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|eot|svg)/,
                use: [{ loader: 'file-loader' }],
            },
        ],
    },
    optimization: {
        minimize: process.env.NODE_ENV === 'production',
        minimizer: [
            // https://github.com/webpack-contrib/terser-webpack-plugin
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: process.env.NODE_ENV !== 'production',
                terserOptions: {
                    mangle: true,
                    output: {
                        // Remove comments especially in Modernizr
                        comments: /memba®/i,
                    },
                },
            }),
        ],
        splitChunks: {
            // https://webpack.js.org/plugins/split-chunks-plugin/
            // https://github.com/webpack/webpack/issues/7085
            // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
            // https://gitter.im/webpack/webpack?at=5ad8d9b4109bb04332dd19c9
            cacheGroups: {
                common: {
                    chunks: 'initial',
                    filename: `[name].bundle.js?v=${pkg.version}`,
                    minChunks: 2,
                    // maxSize: 250000,
                    name: 'common',
                    reuseExistingChunk: true,
                    test: /[\\/](js|styles)[\\/]/,
                },
            },
        },
    },
    output: {
        // Unfortunately it is not possible to specialize output directories
        // See https://github.com/webpack/webpack/issues/882
        path: path.join(__dirname, '/webapp/public/build'),
        publicPath: buildPath,
        filename: `[name].bundle.js?v=${pkg.version}`,
        chunkFilename: `[name].bundle.js?v=${pkg.version}`,
    },
    plugins: [
        definePlugin,
        cleanWebpackPlugin,
        workboxWebpackPlugin,
        // commonsChunkPlugin
        // bundleAnalyzerPlugin
    ],
    resolve: {
        extensions: ['.es6', '.js', '.mjs'],
        modules: [
            'node_modules',
            path.resolve(__dirname, './src/js/vendor/kendo'), // required since Kendo UI 2016.1.112
            '.', // For popper.js in bootstrap
        ],
    },
};
