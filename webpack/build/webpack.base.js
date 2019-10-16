const path = require('path')
const prod = require('./webpack.prod')
const dev = require('./webpack.dev')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = (env) => {
    let isDev = env.development
    let base = {
        //入口
        // entry: './src/index.js', //路径可相对和绝对
        // entry: './src/index.tsx', //路径可相对和绝对
        entry: './src/index.ts', //路径可相对和绝对
        output: {
            filename: 'bundle.js',
            //chunkfilename 异步文件名 需配合占位名使用
            path: path.resolve(__dirname, '../dist')
        },
        module:{
            //模块处理
            rules:[
                {
                    test:/\.vue?$/i,
                    use:'vue-loader'
                },
                {
                    test:/\.tsx?$/i,
                    use:'babel-loader'
                },
                {
                    test:/\.js$/i,
                    use:'babel-loader'
                },
                {
                    test:/\.css$/,
                    use:[isDev?'style-loader':MiniCssExtractPlugin.loader,{
                        loader:'css-loader',
                        options:{
                            importLoaders:2
                        }

                    },'postcss-loader' ,'sass-loader']
                },
                {
                    test:/\.scss$/,
                    use:[isDev?'style-loader':MiniCssExtractPlugin.loader,'css-loader','postcss-loader' ,'sass-loader']
                },
                {
                    test:/\.(jpe?g|png|gif)$/i,
                    use:{
                        loader:'url-loader',
                        options:{
                            limit:1*1024,
                            name:'images/[hash].[ext]'
                        }
                    }
                }
            ]
        },
        plugins:[
            new CleanWebpackPlugin(),
            !isDev&&new MiniCssExtractPlugin({
                filename:'css/main.css'
            }),
            new HtmlWebpackPlugin({
                filename:'index.html',
                template:path.resolve(__dirname,'../public/index.html'),
                minify:!isDev&&{
                    removeAttributeQuotes:true,
                    collapseWhitespace:true,//压缩在一行
                }
            }),
            new VueLoaderPlugin()
        ].filter(Boolean)
    }
    if(isDev){
        return merge(base,dev)
    }
    return merge(base,prod)
}