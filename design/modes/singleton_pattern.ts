export { };
//1-1
class Window_1 {
    private static instance: Window_1;
    private constructor() { }
    static getInstance() {
        if (!Window_1.instance) {
            Window_1.instance = new Window_1();
        }
        return Window_1.instance;
    }
}
//new Window();
var w1 = Window_1.getInstance();
var w2 = Window_1.getInstance();
console.log(w1 === w2);


//1-2透明单例
let Window = (function () {
    let _window: Window;
    class Window{
        constructor(){
            if(_window){
                return _window
            }
            _window=this
        }
        hello(){
            return 'hello'
        }
    }
    return Window;
})();

let w3=new Window()
let w4=new Window()
console.log(w3===w4)

//1-3单例与构建分离

interface Window_3Type {
    hello: any
}
class Window_3 implements Window_3Type{
    hello(){
        return 'hello'
    }
}

let createInstance = (function () {
    let instance: Window;
    return function () {
        if (!instance) {
            instance = new (Window_3 as any)();
        }
        return instance;
    }
})();

let w5 = createInstance();
let w6 = createInstance();
console.log(w5 === w6)

//1-4封装变化

interface Window_3Type {
    hello: any
}
class Window_4 implements Window_3Type{
    hello(){
        return 'hello'
    }
}
let createInstance_1 = function (Constructor: any) {
    let instance: any;
    return function (this: any) {
        if (!instance) {
            // Constructor.apply(this, arguments);
            // Object.setPrototypeOf(this, Constructor.prototype)
            instance = new Constructor();
        }
        return instance;
    }
};
let CreateWindow: any = createInstance_1(Window_4);
let w7 = new CreateWindow();
let w8 = new CreateWindow();

//场景
//2-1 commonjs
(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      var module = (installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
      });
      modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
      module.l = true;
      return module.exports;
    }
  })()

//2-2 jQuery 不是单例
var jQuery = function(selector){
    return new jQuery.prototype.init(selector);
  }
  jQuery.prototype = {
    constructor: jQuery,
    init: function(){
      this.jquery = 1.0;
      return this;
    },
    jquery: 2.0,
    each: function(){
      console.log('each');
      return this;
    }
  }
  let $ = jQuery
  jQuery.prototype.init.prototype = jQuery.prototype;


  console.log($(1)===$(2))