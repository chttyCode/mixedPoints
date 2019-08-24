"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);//next方法
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);//迭代器

            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

var fs = require('fs');

var path = require('path');

function read(name) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path.join(__dirname, '..', name), 'utf8', function (err, data) {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function readBatch() {
    return _readBatch.apply(this, arguments);
}

function _readBatch() {
    _readBatch = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
            var name, age;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return read('name.txt');

                        case 2:
                            name = _context.sent;
                            _context.next = 5;
                            return read('age.txt');

                        case 5:
                            age = _context.sent;
                            return _context.abrupt("return", name + age);

                        case 7:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee);
        }));
    return _readBatch.apply(this, arguments);
}

readBatch().then(function (val) {
    console.log(val);
});