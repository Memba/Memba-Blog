// For an introduction to WebPack see
// https://github.com/petehunt/webpack-howto
// http://slidedeck.io/unindented/webpack-presentation
// http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html

'use strict';

var webpack = require('webpack'),
    path = require('path');

/**
 * definePlugin defines a global variable which is only available when running webpack
 * We use it to merge app.config.jsx with the proper
 * @type {webpack.DefinePlugin}
 * @see http://webpack.github.io/docs/list-of-plugins.html#defineplugin
 * @see https://github.com/petehunt/webpack-howto#6-feature-flags
 */
var definePlugin = new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
});

/**
 * dedupePlugin deduplicates chunks
 * @type {webpack.optimize.DedupePlugin}
 * @see http://webpack.github.io/docs/optimization.html#deduplication
 * @see http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
 */
var dedupePlugin = new webpack.optimize.DedupePlugin();

/**
 * commonsChunkPlugin builds a common denominator of the designated chunks
 */
var commonsChunkPlugin =
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'common.bundle.js', chunks: ['home', 'post', 'page', 'error'] });


//TODO read copyright from package.json
//var bannerPlugin = new webpack.BannerPlugin('Copyright');

/**
 * SourceMapDevToolPlugin builds source maps
 * For debugging in WebStorm see https://github.com/webpack/webpack/issues/238
 */
var sourceMapDevToolPlugin = new webpack.SourceMapDevToolPlugin(
    '[file].map', null,
    "[absolute-resource-path]", "[absolute-resource-path]");

/**
 * Webpack configuration
 * @see https://github.com/webpack/docs/wiki/configuration
 */
module.exports = {
    //All paths below are relative to the context
    context: path.join(__dirname, '/webapp'),
    entry: {
        //We need init especially because of FOUJI
        init:   '../js/app.init.js',
        //one entry per view
        home:   '../js/app.home.js',
        page:   '../js/app.page.js',
        post:   '../js/app.post.js',
        error:  '../js/app.error.js'
    },
    externals: { //CDN modules
        jquery: 'jQuery'
    },
    output: {
        //Unfortunately it is not possible to specialize output directories
        //See https://github.com/webpack/webpack/issues/882
        path: path.join(__dirname, '/webapp/public/assets'),
        publicPath: '/assets/',
        filename:   '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    //resolve: {},
    module: {
        loaders: [
            {
                //Do not put a $ at the end of the test regex
                test: /\.jsx/, //see ./web_modules/jsx-loader
                loader: 'jsx?config=webapp/config'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /app\.theme\.[a-z]+\.less$/,
                loader: 'bundle?name=[name]!style/useable!css!less'
            },
            {
                test: /\.less$/,
                exclude: /app\.theme\.[a-z]+\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.(gif|png|jpe?g)$/,
                loader: 'url?limit=8192'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file'
            }
        ]
    },
    plugins: [
        definePlugin,
        dedupePlugin,
        commonsChunkPlugin,
        sourceMapDevToolPlugin
    ]
};
