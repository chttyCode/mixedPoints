- vscode fav
# eslint 

- eslint-loader
- eslint
- babel-eslint
- eslintrc.js
    ```js

        module.exports={
            root:true,//是否是根配置
            parserOptions:{//解析器的选项
                sourceType:'module',
                ecmaVersion:es2015
            },
            env:{//指定运行环境
                browser:true,
                node:true,

            },
            rules:{
                "indent":["error",4]
            }
        }
    ```

## source-map

## devserver
    - charles
    - proxy
    - before
    - express + webpack-dev-middleware + webpack
        >node集成webpack打包功能
## resovle
    - extensions 扩展名
    ```js
        resolve:{
            extensions:['.js'，‘.jsx’]
        }
    ```
    - alias 别名
    ```js
       resolve:{
            alias:{
                "bootstrap":path.resolve(__dirname,'node_modules/bootstrap/dist/bootstrap.css')
            }
        }
    ```
    - modules
    >第一减少查找路径
    >指定额外查找路径
    ```js
        resolve:{
            modules:["node_modules"，“self_modules”]
        }
    ```
    - mainfieds
    >package.json 查找字段
    ```js
        resolve:{
            mainfieds:["style"，“browers”,"main"]
        }
    ```
    - mainfiles
    >默认查找文件
    ```js
        resolve:{
            mainfieds:["index.js","main.js"]
        }
    ```
## resolveLoader
    >指定如何查找loader
     ```js
        resolveLoader:{
            modules:["node_modules"，“self_loaders”]
        }
    ```
## noParse
    >配置那些模块不需要读取并且转化成语法树进行解析依赖
    ```js
        module:{
            noParse:/jquery|loadsh/
        }
    ```
## DefinePlugin
    >会把变量和值注入到每一个模块内
    ```js
        plugins:[
            new webpack.DefinePlugin({
                key:value
            })
        ]
    ```
## 区分环境
    - mode
    >devtool会影响压缩
        - --env指定webpack内置变量
        - {smart} = require('webpack-merge');
        ```js
            {
                "scripts":{
                    "build":"webpack --env=development",
                    "dev:build":"webpack --env=production"
                }
            }
        ```
        - corss-env 设置process node的环境变量
        ```js
            {
                "scripts":{
                    "build":"cross-env NODE_ENV=development webpack",
                    "dev:build":"cross-env NODE_ENV=production webpack"
                }
            }
        ```
## ignoreplugin
    ```js
        {
            plugins:{
                new webpack.IgnorePlugin(/^\.\/locale/,/^moment$/)
            }
        }
    ```
## image-webpack-loader
    >图片优化
    ```js
        {
            rules: [{
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
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
                    },
                ],
            }]
        }
    ```
## 多入口
## 日志优化
    ```js
        {
            stats:'errors-only' //normal minimal
        }
    ```
    - friendly-errors-webpack-plugin
    ```js
        {
            stats:'verbose'//显示完整日志
            plugins:[
                 new FriendlyErrorsWebpackPlugin(),
            ]
        }
    ```
## 错误上报
## 费时分析
    - speed-measure-webpack-plugin
      ```js
        const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
 
        const smp = new SpeedMeasurePlugin();
        
        const webpackConfig = smp.wrap({
            plugins: [
                new MyPlugin(),
                new MyOtherPlugin()
            ]
        });
    ```
## 结构分析
    - webpack-bundle-analyzer
    ```js
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
        module.exports = {
            plugins: [
                new BundleAnalyzerPlugin({
                    analyzerMode:'disabled',//不启动展示打包报告的http服务
                    generateStatsFile:true//是否生产stats.json文件
                })
            ]
        }
        //package.json
        {
            "scripts":{
                "generateAnalyerFile":"webpack --profile --json > stats.json",
                "analyz":"webpack-bundle-analyzer --port 8080 ./dist/stats.json"
            }
        }
    ```
## babel-polyfill
    - polyfill-server
    - corejs
    - babel-transform-runtime
## libraryTarget&library
    > 实现一个库
        1. webpack打包js库
        2. 实现功能
        3. 打包压缩版和非压缩版
        4. 支持CMD/AMD/CJS/ESM方式导入
        5. nrm use npm 
        7. npm login
        8. npm search
        9. npm pulish
    ```js
        {
            output:{
                library,//导出库的名字
                libraryTarget,//导出的方式
                libraryExport//导出那个属性
            }
        }
    ```
## purgecss-webpack-plugin
    > 必须配合mini-css-extract-plugin & glob
    ```js
        {
            plugins:[
                new purgrecssWebpackPlugin({
                    paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
                })
            ]
        }
    ```
## CDN
## pxToRem
    - px2rem-loader
    ```js
        {
            modules:{
                rules:[
                    test:/\.css$/,
                    use:[
                        'style-loader',
                        'css-loader',
                        {
                            loader:'px2rem-loader',
                             options: {
                                remUni: 75,
                                remPrecision: 8
                            }
                        }
                    ]
                ]
            }
        }
    ```
    - lib-flexi  https://github.com/amfe/lib-flexible
    - vw+rem 
    - html 内敛文件 style中执行node_modules
        ```js
             ${require('raw-loader!../node_modules/*.js')}
              ${require('!!raw-loader!../node_modules/*.js')} //强行忽略其他loader
        ```
## 动态链接库
    - 生产动态链接
        - 配置output
        >生产js文件
        ```js
            {
                output:{
                    library:'_dll_[name]',
                    libraryTarget:'var'
                }
            }
        ```
        - webpack.DllPlugin
        >生产mainfest.json文件
        ```js
            {
                plugins:{
                    new webpack.DllPlugin({
                        name:'_dll_[name]',
                        path:path.resolve(__dirname,'dist','[name].mainfest.json')
                    })
                }
            }
        ```
    - 引用动态链接库
        - webpack/lib/DllReferencePlugin
        ```js
            new DllReferencePlugin({
                mainfest:path.resolve(__dirname,'dist','[name].mainfest.json')
            })
        ```
        - 手动引入动态链接库文件
    - 流程
    ```js
        import ReactDom from 'react-dom'
        =>import ReactDom from './node_modules/_react-dom........'
        =>let ReactDom = '_dll_[name]'[]
    ```
## tree-shaking
    - @babel/preset-env 
    ```js
        {module:false}
    ```
    - remove devtool
    - 场景
        1. 导入不使用
        2. 代码不可到达·
        3. 代码执行返回变量不被使用
        4. 定义变量没有使用
## webpack 插件机制
    - 源码debugger
        1. npx webpack
            - node_modules->bin->*.cmd->%~dp0(当前路径)
    - tab
        - modules
        - chunk 会根据依赖关系生产chunk
            - 每个入口文件天然就是一个chunk，此入口文件和依赖文件的模块生成一个chunk
            - 动态引入
            - splitchunks
        - assets
## loader
    - 查找配置
        1. use
        ```js
            {
                test://,
                use:[
                    {
                        loader:path.resolve(__dirname,'loaders/loader1.js'),
                        options:{}
                    }
                ]
            }
        ```
        2. resolveLoader
         ```js
            resolveLoader:{
                modules:['node_modules',path.resolve(__dirname,loaders)]
            }
        ```
        3. npm link
        4. alias
        ```js
            resolveLoader:{
                alias:{
                    "loader1":path.resolve()
                }
            }
        ```
    - loader异步
    ```js
        function loader(source){
            let callback = this.async()
            setTimeout(()=>{
                callback(null,source)
            },2000)
        }
    ```
    - less
        ```css
            $color:red
            body{
                backgroun:$color
            }
        ```