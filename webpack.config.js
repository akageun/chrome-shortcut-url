const webpack = require('webpack');
const ejs = require('ejs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const {VueLoaderPlugin} = require('vue-loader');
const {version} = require('./package.json');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const commonModule = {
    mode: process.env.NODE_ENV,
    context: path.join(__dirname, '/src'),
    entry: {
        'bundle': './common/js/bundle.js',
        'commonUtil': './common/js/commonUtil.js'
    },
    output: {
        path: path.join(__dirname, '/dist/common'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?emitFile=false',
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            global: 'window',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new UglifyJSPlugin({
            cache: true,
            parallel: 4
        }),
        new OptimizeCSSAssetsPlugin({})
    ],
    performance: {
        hints: false
    },
};

const extensionConfig = {
    mode: process.env.NODE_ENV,
    context: path.join(__dirname, '/src'),
    entry: {
        'background': './background.js',
        'popup/popup': './popup/popup.js',
        'options/options': './options/options.js',
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'SrcRoot': path.join(__dirname, '/src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loaders: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?emitFile=false',
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            global: 'window',
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyWebpackPlugin([
            {from: 'resources', to: 'resources'},
            // {from: 'common', to: 'common'},
            {from: 'popup/popup.html', to: 'popup/popup.html', transform: transformHtml},
            {from: 'options/options.html', to: 'options/options.html', transform: transformHtml},
            {
                from: 'manifest.json',
                to: 'manifest.json',
                transform: (content) => {
                    const jsonContent = JSON.parse(content);
                    jsonContent.version = version;

                    if (extensionConfig.mode === 'development') {
                        jsonContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'";
                    }

                    return JSON.stringify(jsonContent, null, 2);
                },
            },
        ]),
        new UglifyJSPlugin({
            cache: true,
            parallel: 4
        }),
        new OptimizeCSSAssetsPlugin({})
    ],
    performance: {
        maxEntrypointSize: 400000
    },
};

if (extensionConfig.mode === 'production') {
    extensionConfig.plugins = (extensionConfig.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
    ]);
}

if (process.env.HMR === 'true') {
    extensionConfig.plugins = (extensionConfig.plugins || []).concat([
        new ChromeExtensionReloader(),
    ]);
}

function transformHtml(content) {
    return ejs.render(content.toString(), {
        ...process.env,
    });
}

module.exports = [
    extensionConfig, commonModule
];
