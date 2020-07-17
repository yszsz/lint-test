const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.js');


module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        port: '3200',
        hot: true
    }
});
