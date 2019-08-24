/*
 * @Author: kongds
 * @Date: 2019-08-20 11:31:54
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports={
    entry:{
        'index':'./src/sum.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name]-[hash].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ]
}