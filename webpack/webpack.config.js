// webpack是基于nodejs语法 commonjs规范
//默认导出的是配置对象

const path = require('path')
//1.导出对象
// module.exports={
//     //当前开发模式
//     mode:'develoment',
//     //入口
//     entry:'./src/index.js',//路径可相对和绝对
//     output:{
//         filename:'bundle.js',
//         //chunkfilename 异步文件名 需配合占位名使用
//         path:path.resolve(__dirname,'dist')
//     }
// }
//导出函数
module.exports=(env)=>{
    console.log(env)
    return {
        
    }
}