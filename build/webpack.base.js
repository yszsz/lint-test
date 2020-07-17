const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
    entry: {
        index: path.join(__dirname, '../src/index.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                    localIdentName: '[local]_[hash:base64:6]',  
                                },
                            },
                    },
                    'less-loader'
                ],
                exclude: [path.resolve(__dirname, '..', 'node_modules')],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /\.(css|less)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    },
                ],
                include: [path.resolve(__dirname, '..', 'node_modules')],
                },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].[chunkhash].css'
        }),
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../public/index.html')
        })
    ],
    resolve: {
        extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"],
        modules: ['src', 'node_modules'],
        alias: {
            utils: path.join(__dirname, '../src/utils'),
            components: path.join(__dirname, '../src/components')
        }
    }
}