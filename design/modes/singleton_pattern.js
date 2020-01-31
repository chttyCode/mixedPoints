"use strict";
exports.__esModule = true;
//1-1
var Window_1 = /** @class */ (function () {
    function Window_1() {
    }
    Window_1.getInstance = function () {
        if (!Window_1.instance) {
            Window_1.instance = new Window_1();
        }
        return Window_1.instance;
    };
    return Window_1;
}());
//new Window();
var w1 = Window_1.getInstance();
var w2 = Window_1.getInstance();
console.log(w1 === w2);
//1-2透明单例
var Window = (function () {
    var _window;
    var Window = /** @class */ (function () {
        function Window() {
            if (_window) {
                return _window;
            }
            _window = this;
        }
        Window.prototype.hello = function () {
            return 'hello';
        };
        return Window;
    }());
    return Window;
})();
var w3 = new Window();
var w4 = new Window();
console.log(w3 === w4);
var Window_3 = /** @class */ (function () {
    function Window_3() {
    }
    Window_3.prototype.hello = function () {
        return 'hello';
    };
    return Window_3;
}());
var createInstance = (function () {
    var instance;
    return function () {
        if (!instance) {
            instance = new Window_3();
        }
        return instance;
    };
})();
var w5 = createInstance();
var w6 = createInstance();
console.log(w5 === w6);
var Window_4 = /** @class */ (function () {
    function Window_4() {
    }
    Window_4.prototype.hello = function () {
        return 'hello';
    };
    return Window_4;
}());
var createInstance_1 = function (Constructor) {
    var instance;
    return function () {
        if (!instance) {
            // Constructor.apply(this, arguments);
            // Object.setPrototypeOf(this, Constructor.prototype)
            instance = new Constructor();
        }
        return instance;
    };
};
var CreateWindow = createInstance_1(Window_4);
var w7 = new CreateWindow();
var w8 = new CreateWindow();
//场景
//2-1 commonjs
(function (modules) {
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
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
})();
//2-2 jQuery
var jQuery = function (selector) {
    return new jQuery.prototype.init(selector);
};
jQuery.prototype = {
    constructor: jQuery,
    init: function () {
        this.jquery = 1.0;
        return this;
    },
    jquery: 2.0,
    each: function () {
        console.log('each');
        return this;
    }
};
var $ = jQuery;
jQuery.prototype.init.prototype = jQuery.prototype;
console.log($(1) === $(2));
