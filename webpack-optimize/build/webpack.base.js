const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const purgecssWebpackPlugin = require('purgecss-webpack-plugin')
const addAssetsPlugin = require('add-asset-html-webpack-plugin')
const addCdnPlugin = require('add-asset-html-cdn-webpack-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const DLLReferencePlugin = require('webpack').DllReferencePlugin
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const glob = require('glob')
const smp = new SpeedMeasurePlugin();
console.log(glob.sync('./src/**/*', {
    nodir: true
}))
module.exports = (env) => {
    return smp.wrap({
        mode: env,
        // entry:"./src/index.js",
        entry: {
            a: './src/indexa.js',
            // b: './src/indexb.js'
        },
        output: {
            filename: '[name].js',
            // chunkFilename: '[name].min.js',
            path: path.resolve(__dirname, '../dist')
        },
        optimization: {
            usedExports: true,
            splitChunks: {
                chunks: 'all', //异步代码分割
                minSize: 30000, //文件大小
                maxSize: 0, //最大没有限制
                minChunks: 1, //最少引用次数
                maxAsyncRequests: 5, //最大抽离请求数
                maxInitialRequests: 3, //最多首屏请求数
                automaticNameDelimiter: '~', //文件名串联方式
                automaticNameMaxLength: 30, //最长名字大小
                name: true, //自己配置名字
                cacheGroups: { //每个缓存组可以配置自己的规则
                    moment: {
                        test: /[\\/]node_modules[\\/]moment|moment|loadsh/,
                        minSize:1,
                        priority:2
                    },
                    react: {
                        test: /[\\/]node_modules[\\/]react|react/,
                        minSize:1,
                        priority: 1
                    },
                    commons:{
                        minChunks: 1,
                        minSize:1,
                        priority: -10,
                        reuseExistingChunk: true
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            },
        },
        externals: {
            'jquery': '$'
        },
        module: {
            rules: [{
                    test: /\.css$/,
                    use: [env == 'development' ? 'style-loader' : miniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /\.js$/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(jpe?g|png|gif)$/,
                    use: [
                        "file-loader",
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                    quality: 75
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            env !== 'development' && new miniCssExtractPlugin(),
            new htmlWebpackPlugin({
                template: './public/index.html',
                filename: 'indexa.html',
                // chunks: ['a']
            }),
            // new htmlWebpackPlugin({
            //     template: './public/index.html',
            //     filename: 'indexb.html',
            //     chunksSortMode: 'manual',
            //     // chunks: ['a', 'b'] //引入的顺序按数组的顺序引入
            // }),
            new purgecssWebpackPlugin({
                paths: glob.sync('./src/**/*', {
                    nodir: true
                })
            }),
            new addCdnPlugin(true, {
                'jquery': 'https://cdn.bootcss.com/jquery/3.4.1/jquery.js'
            }),
            // new addAssetsPlugin({
            //     filepath: path.resolve(__dirname, '../dll/react.dll.js')
            // }),
            new CleanWebpackPlugin(),
            // new DLLReferencePlugin({
            //     manifest: path.resolve(__dirname, '../dll/mainfest.json')
            // }),
            env !== 'development' && new BundleAnalyzerPlugin()
        ].filter(Boolean),
    })
}