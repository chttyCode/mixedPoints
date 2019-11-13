let babel = require('@babel/core')
let loaderUtils = require('loader-utils')
function loader(source){
    let options1 = oaderUtils.getOptions()
    const options2={
        presets:["@babel/preset-env"],
        sourceMaps:true,
        filename:this.resourcePath
    }
    let {code,map,ast} =  babel.transform(source,options)
    console.log(code)
    return this.callback(null,code,map,ast)
}
module.exports=loader