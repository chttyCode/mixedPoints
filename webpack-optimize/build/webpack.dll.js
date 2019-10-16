const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DLLPlugin= require('webpack').DllPlugin
module.exports=(env)=>{
    return {
        mode:env,
        entry:['react','react-dom'],
        output:{
            filename:'react.dll.js',//
            library:'react',//
            // libraryTarget:'commonjs',
            path:path.resolve(__dirname,'../dll')
        },
        plugins:[
            new CleanWebpackPlugin(),
            new DLLPlugin({
                name:'react',
                path:path.resolve(__dirname,'../dll/mainfest.json')
            })
        ]
    }
}