# webpack optimize

- 1.css优化
    1. 抽离 mini-css-extrac-plugin
    2. purgecss-webpack-plugin glob 
        >主要作用去除无用的css，需要mini-css-extrac-plugin将文件抽离出来
        - glob 查找匹配文件
            - glob.sync('./src/**/*',{nodir:true})
        - purgecss-webpack-plugin
            - 只能配合mini-css-extract-plugin
            - new purgecsswebpackplugin({
                path:glob.sync('./src/**/*',{nodir:true})
            })
- 2.图片优化
    1. 需要先file-loader
    2. image-webpack-loader 配合file-loader  进行图片的压缩
- 3.cdn加载文件
    - externals 外部变量定义 不打包
        externals:{'jquery':'$'} //   包名：引用名
    - add-asset-html-webpack-plugin
    - add-asset-html-cdn-webpack-plugin
    - webpack-cdn-plugin
- tree-shaking&&scope-Hoisting
    > webpack自带只在生产环境启用且只支持es6语法
    ```js
        //便于查看tree-shaking
        optimization:{
            usedExports:true
        },
        eg:
        /*! exports provided: add, minus */
        /*! exports used: minus */
    ```
    - tree-shaking
    - 副作用 可能开发是无意义的  
        > 去除副作用 在package.json中配置"sideEffects":false,默认是需要副作用true，如果将其设置为false
        ```js
            import './index.css' //会被当作副作用移除
            //解决方式
            //1.更改为require
            //2.配置sideEffects排除css文件
                "sideEffects":[
                "**/*.css"
                ],
        ```
        - scope-hoisting
            > webpack4生产以配置
- Dllplugin&DllReferencePlugin
    - dllplugin
        1. 暴露自执行函数 library接受自执行函数的名称
        ```js
            library:'calc',//暴露库的名称
            libraryTarget:'commonjs',//暴露方式 commonjs2
        ```
        dll查找路径：import react =>mainfest.json =>找到后会加载对应库的名字，可能会引用某个模块的名字，回去dll的文件中查找
    - dllReferenceplugin
        1. 指定manifest文件
        2. 引入dll.js
            - add-asset-html-webpack-plugin
- 动态加载
    - import()动态语法，返回promise 会单独打包这个文件，需要时会采用jsonp的方式加载，webpack默认支持这个语法
    - 动态加载文件命名配置
    ```js
        //webpack配置  
        output:{
            filename:'bundle.js',//同步
            chunkFilename:'[name].min.js',//异步
        },
        //模版字符配置
        import(/* webpackChunkName:'calc' */'./tree-shaking')
    ```
- 打包文件分析工具
    - 多入口    
    ```js
        chunksSortMode:'manual',
        chunks:['a','b'] //引入的顺序按数组的顺序引入
    ```
    -  webpack-bundle-analyzer
        - 抽离第三方模块
            1. 分离业务于第三方
            2. 增加缓存
- splitChunks comm
    - 缓存组的配置会覆盖默认配置
    ```js
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
    ```
- 热更新
- IgnorePlugin
- 费时分析
    - 
- noParse
- resolve
- include/exclude
- happypack


- 初始化
    - webpack webpack-cli webpack-dev-server
    - html-webpack-plugin css-loader style-loader mini-css-extract-plugin
    - babel-loader @babel/core @babel/preset-env @babel/perset-react
    - url-loader file-loader
