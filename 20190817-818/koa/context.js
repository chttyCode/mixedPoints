/*
 * @Author: kongds
 * @Date: 2019-08-17 15:25:32
 */
let ctx = {}
function defineGetter(property,key){
    ctx.__defineGetter__(key,function(){
        return this[property][key];
    });
}

function deineSetter(property,key){
    ctx.__defineSetter__(key,function(value){
        console.log(Object.keys(this))
        this[property][key] = value;
    });
}
// ctx.url == ctx.request.url
defineGetter('request','url');
defineGetter('response','body');

deineSetter('response','body');
module.exports = ctx;
