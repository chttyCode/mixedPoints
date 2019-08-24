if (!Function.prototype.bind)(function () {
    var ArrayPrototypeSlice = Array.prototype.slice;
    Function.prototype.bind = function (otherThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var baseArgs = ArrayPrototypeSlice.call(arguments, 1), //get params
            baseArgsLength = baseArgs.length, //other params length
            fToBind = this, //调用的函数
            fNOP = function () {}, //空函数
            fBound = function () {
                baseArgs.length = baseArgsLength; // reset to default base arguments
                baseArgs.push.apply(baseArgs, arguments);
                //检测一个对象是否存在于另一个对象的原型上
                return fToBind.apply(
                    fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
                );
            };

        if (this.prototype) {
            // Function.prototype doesn't have a prototype property
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();

        return fBound;
    };
})();

Function.prototype.bind=function(otherThis,...arg){
    var fToBind=this,baseArgs = Array.from(arg).slice(1)
    return function(...arg){
        baseArgs.push(Array.from(arg))
        fToBind.apply(otherThis,baseArgs)
    }
}
function a(){
    let a=1
    console.log()
}
const b=a.bind(c)