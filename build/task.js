/**
 * [DEPLOY_ENV 构建环境变量]
 * @type {[type]} local、test、pre和production，缺省值：production
 */
const webpack = require('webpack');
const cssnano = require('cssnano');
const merge = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const DEPLOY_ENV = process.env.DEPLOY_ENV || 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const webpackConfig = require('../config/webpack.config.js')(DEPLOY_ENV);
const HtmlFaviconPlugin = require('../custom_plugins/htmlFaviconPlugin.js');
const HtmlBlankLinePlugin = require('../custom_plugins/htmlBlankLinePlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// node_modules包正则表达式
const NODE_MODULES_REGEXP = /node_modules/;
// vendors包正式表达式数组
const NODE_MODULES_VENDORS_REGEXPS = [
    /node_modules\/react(-dom)?/,
    /node_modules\/prop-types/
];

module.exports = merge(webpackConfig, {
    module: {
        rules: [
            {
                test: /.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    stats: {
        cached: false,
        cachedAssets: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        hash: false,
        modules: false,
        reasons: false,
        timings: true,
        version: false
    },
    optimization: {
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        runtimeChunk: {
            name: 'runtime'
        },
        minimizer: [
            new TerserJSPlugin({
                cache: true,
                parallel: true,
                extractComments: false,
                terserOptions: {
                    compress: {
                        drop_console: true
                    },
                    output: {
                        comments: false,
                        beautify: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: cssnano,
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            cacheGroups: {
                default: false,
                vendors: {
                    priority: -10,
                    // test: /[\\/]node_modules[\\/](react|react-dom|prop-types)[\\/]/,
                    test (module) {
                        let context = module.context;

                        return NODE_MODULES_VENDORS_REGEXPS.some(regExp => regExp.test(context));
                    },
                    name: 'vendors',
                    chunks: 'all'
                },
                polyfill: {
                    priority: -15,
                    test (module) {
                        let context = module.context;

                        if (!NODE_MODULES_REGEXP.test(context)) {
                            return false;
                        }

                        return NODE_MODULES_VENDORS_REGEXPS.every(regExp => !regExp.test(context));
                        // return !/node_modules\/[^(react|react\-dom|prop\-types)]/.test(module.context);
                        // return /node_modules/.test(module.context);
                    },
                    name: 'polyfill',
                    chunks: 'all'
                },
                commons: {
                    priority: -20,
                    test: /[\\/]src[\\/](api|constants|modules|views)[\\/]/,
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2,
                    reuseExistingChunk: true
                },
                components: {
                    priority: -5,
                    test: /[\\/src][\\/]components[\\/]/,
                    name: 'components',
                    chunks: 'all'
                }
            }
        },
        usedExports: true
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new ScriptExtHtmlWebpackPlugin({
            inline: /runtime(\..*)?\.js$/
        }),
        new HtmlFaviconPlugin(),
        new HtmlBlankLinePlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/*"]
        })
    ]
});

