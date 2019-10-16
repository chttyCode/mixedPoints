# webpack

- webpack默认支持模块写法 commonjs规范
- es6 规范 esmodule 

- webpack执行方式
    - npx npm5.2中后出来的 会执行node_module下bin目录下的某个文件
    - scripts npm run 会将node_module下./bin目录放到全局作用域下 执行完就销毁
- 两个模式
    - development
    - production
- 配置文件
    - webpack.config.js/webpack.file.js 
    - 拆分配置文件
        - 导出对象
        - 导出函数
            >通过--config指定配置文件是哪一个
            - --env[环境参数]是给webpack内置定义环境 cross-env 是给process定义环境变量
            - 基础配置
            - 环境配置
            1. 默认引入base,在base中根据环境变量合并dev/prod
            2. 就是分别引入dev/prod，在dev/prod中引入base
            - webpack-merge合并配置
- webpack-dev-server
    - 是在内存中打包，不会产生实体文件
- 自动生产html,模版html html-webpack-plugin
    - minify配置下压缩选项
        - removeAttributeQuotes
        - collapseWhitespace
- css
    - css-loader 会解析css语法，并且把解析的结果传递给style-loader
    - style-loader 会将解析后的css，以style标签的形式插入到html中
    - loader的执行顺序：从后往前
    - loader的配置方法
        - 数组
        - 字符串
        - 对象
        ```js
            rules:[
                {
                    test:/\.css$/,
                    use:'style-loader'
                },
                {
                    test:/\.css$/,
                    use:'css-loader'
                }
            ]
            rules:[
                {
                    test:/\.css$/,
                    use:['style-loader','css-loader']
                }
            ]
        ```
    - css预处理
        - .scss node-sass sass-loader
        - .less less less-loader
        - .stylus stylus stylus-loader
        - @import嵌套引入的问题
        ```css
            1.index.css
             @import './a.css';
            body{
                background: red;
            }
            2.a.css
            @import './a.scss';
            a.scss将不会被loader
            解决方案
             {
                    test:/\.css$/,
                    use:['style-loader',{
                        loader:'css-loader',
                        options:{//css 文件中的loader需要使用此loader后面 1 个 loader去处理
                            importLoaders:1
                        }
                    },'sass-loader']
                },
        ```
        - 样式前缀
            - postcss-loader autoprefixer
            - 执行顺序 在编译之后css之前
            - .browserslistrc 浏览器配置
        - 抽了css，解析css阻止解析dom，抽离和js一样并行加载
            - mini-css-extract-plugin 有loader功能
            - 抽离的css不会自动压缩，手动压缩
                -  optimize-css-assets-webpack-plugin 
                - 一旦手动压缩，同时需要对js进行压缩
                - terser-webpack-plugin js压缩

- 图片
    - file-loader 主要是拷贝替换文件
    - url-loader 当图片比较小时，可以以base64嵌入，但是文件大小会变大
- js
    - es6=>es5 有些api 装饰器 类的属性
    - babel 转化   vue-cli是基于babel6
    - babel7
        - @babel/core 回调中@babel/preset-env  @babel是作用域
        - @babel/preset-env 转化语法 插件集合
        - babel-loader 会调用@babel/cor
    - plugins
        > 1.以字符串的形式 2.以数组的形式（可以传参数）
        - @babel/plugin-proposal-class-properties 类属性 
            ["@babel/plugin-proposal-class-properties",{"loose":true}]//loose是否宽松 指定义的方式是this还是defined
        - @babel/plugin-proposal-decorators 装饰器语法
        - 不转化高级语法 实例上的语法 promise core-js动态
            ```js
                ["@babel/preset-env",{
                    "useBuiltIns":"usage",//API按需加载
                    "corejs":2//babel-polyfill
                }]
            ```
        - @babel/plugin-transform-runtime
            > A plugin that enables the re-use of Babel's injected helper code to save on codesize.
            -  @babel/runtime as a production dependency 
- react
    - react
    - react-dom
    - @babel/preset-react 
    - 支持ts
        - ts-loader
        - @babel/preset-typescript ts只做辅助的检测功能
        - 还需要typescript库，用于语法检测
            1. npx tsc --init 初始化ts配置
            2. @types/react @types/react-dom -S
- vue
    - *.d.ts声明文件，将.vue文件声明为VUE类型
    - vue-loader vue-template-compiler
    - ts语言还需要vue-property-decorator 