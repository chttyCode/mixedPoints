# webpack 

## 编译流程
- 初始化参数
    - webpack.config.js 配置文件
        >devtool:默认会将源码用eval包裹
    - pakeage.json 命令行参数
    - 合并参数

- webpack调试
    - debugger webpack-cli>bin>cli.js
    - webpack stat对象
        - stat.toString(params)
            ```js
                params:{
                    entries:true,
                    chunks:true,
                    modules:true,
                    _modules:true,
                    assests:true
                }
            ```
        - entries:入口文件
        - chunks:编译出来了几个代码快
        - modules:编译出来的几个模块
        - _modules:Map key 模块的绝对路径 value:对应的模块对象
        - assests:Map   key 文件名称 value 文件里的内容
- tapable
    - Basie 不关心监听函数的返回值
        1. SyncHook 
            1. tap注册事件
            2. call 触发事件
    - bail 保险式：只要监听函数中有返回值，则跳过之后的监听函数
        1. SyncBailHook
    - waterfall 瀑布式:上一步的返回值交给下一步使用
    - loop 循环类型:如果监听函数返回true,则这个监听函数就反复执行，如果返回undefined则推出循环
- 