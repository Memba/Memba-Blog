/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/**
 * For an introduction to WebPack
 * @see https://github.com/petehunt/webpack-howto
 * @see http://slidedeck.io/unindented/webpack-presentation
 * @see http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html
 */

const path = require('path');
const webpack = require('webpack');
const cleanPlugin = require('./web_modules/less-plugin');
const config = require('./webapp/config');
const pkg = require('./package.json');

const environment = config.environment || 'development';
const publicPath = config.get('uris:webpack:root');

console.log(`webpack environment is ${environment}`); // eslint-disable-line no-console
console.log(`webpack public path is ${publicPath}`); // eslint-disable-line no-console
console.log(`building version ${pkg.version}`); // eslint-disable-line no-console

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
    __VERSION__: JSON.stringify(pkg.version)
});

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
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
    analyzerMode: 'static'
    // analyzerPort: 7000 <-- Fatal error: listen EADDRINUSE 127.0.0.1:7000
});
*/

/**
 * Webpack configuration
 * @see https://github.com/webpack/docs/wiki/configuration
 */
module.exports = {
    // All paths below are relative to the context
    context: path.join(__dirname, '/'),
    devtool: 'source-map',
    entry: {
        // We need init especially because of FOUJI
        init: './js/app.init.js',
        // One entry per view
        error: './js/app.error.js',
        home: './js/app.home.js',
        page: './js/app.page.js',
        post: './js/app.post.js',
        search: './js/app.search.js'
    },
    externals: {
        // CDN modules
        jquery: 'jQuery'
    },
    module: {
        rules: [
            {
                test: /\.es6$/,
                use: [{ loader: 'babel-loader' }]
            },
            {
                // Do not put a $ at the end of the test regex
                test: /\.jsx/, // see ./web_modules/jsx-loader?config=
                use: [
                    {
                        loader: './web_modules/jsx-loader',
                        options: { config: 'webapp/config' }
                    }
                ]
            },
            {
                test: /app\.theme\.[a-z0-9-]+\.less$/,
                use: [
                    {
                        loader: 'bundle-loader',
                        options: { name: '[name]' }
                    },
                    { loader: 'style-loader/useable' },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 2 }
                    },
                    { loader: 'postcss-loader' },
                    // See https://github.com/jlchereau/Kidoju-Webapp/issues/197
                    {
                        loader: 'less-loader',
                        options: {
                            compress: true,
                            relativeUrls: true,
                            strictMath: true,
                            plugins: [cleanPlugin]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: /app\.theme\.[a-z0-9-]+\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    { loader: 'postcss-loader' },
                    // See https://github.com/jlchereau/Kidoju-Webapp/issues/197
                    {
                        loader: 'less-loader',
                        options: {
                            compress: true,
                            relativeUrls: true,
                            strictMath: true,
                            plugins: [cleanPlugin]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    { loader: 'postcss-loader' }
                ]
            },
            {
                test: /\.(gif|png|jpe?g)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 8192 }
                    }
                ]
            },
            {
                test: /\.woff(2)?/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg)/,
                use: [{ loader: 'file-loader' }]
            }
        ]
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    optimization: {
        minimize: true,
        splitChunks: {
            // https://github.com/webpack/webpack/issues/7085
            // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
            // https://gitter.im/webpack/webpack?at=5ad8d9b4109bb04332dd19c9
            cacheGroups: {
                common: {
                    chunks: 'initial',
                    filename: `[name].bundle.js?v=${pkg.version}`,
                    minChunks: 2,
                    name: 'common',
                    reuseExistingChunk: true,
                    test: /[\\/](js|styles)[\\/]/
                }
            }
        }
    },
    output: {
        // Unfortunately it is not possible to specialize output directories
        // See https://github.com/webpack/webpack/issues/882
        path: path.join(__dirname, '/webapp/public/build'),
        publicPath,
        filename: `[name].bundle.js?v=${pkg.version}`,
        chunkFilename: `[name].bundle.js?v=${pkg.version}`
    },
    plugins: [
        definePlugin
        // commonsChunkPlugin
        // bundleAnalyzerPlugin
    ],
    resolve: {
        modules: [
            path.resolve('.'),
            path.resolve('./js/vendor/kendo'), // required since Kendo UI 2016.1.112
            'node_modules'
        ]
    }
};
