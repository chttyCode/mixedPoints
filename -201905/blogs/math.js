const path = require('path')
const fs = require('fs')
//isAarry
Array.isArray1 = function (val) {
    return Object.prototype.toString.call(val) == '[object Array]'
}
//bind
Function.prototype.bind = function (otherThis, ...arg) {
    var fToBind = this,
        baseArgs = Array.from(arg).slice(1)
    return function (...arg) {
        baseArgs.push(Array.from(arg))
        fToBind.apply(otherThis, baseArgs)
    }
}
//bind prototype
Function.prototype.bind = function (otherThis, ...arg) {
    var fToBind = this,
        baseArgs = Array.from(arg).slice(1)
    fn = function () {}

    function fnBind(...arg) {
        baseArgs.push(Array.from(arg))
        fToBind.apply(otherThis, baseArgs)
    }
    if (this.prototype) {
        fn.prototype = this.prototype
    }
    fnBind.prototype = new fn()
    return fnBind
}
//Iterator
function Iterator(item) {
    let index = 0
    return {
        next() {
            return {
                value: item[index],
                done: index++ > item.length
            }
        }
    }
}
//Promise
function Promisek(fn) {
    let that = this;
    that.status = 'padding'
    that.fulfiledCallback = []
    that.rejectedCallback = []
    that.value = undefined

    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }
        if (that.status == 'padding') {
            that.value = value
            that.status = 'fulfiled'
            that.fulfiledCallback.forEach(item => item(value))
        }
    }

    function reject(value) {
        if (that.status == 'padding') {
            that.statue = 'rejected'
            that.value = value
            that.rejectedCallback.forEach(item => item(value))
        }
    }
    try {
        fn(resolve, reject)
    } catch (err) {
        reject(err)
    }
}
Promisek.prototype.then = function (onfulfiled, onrejected) {
    let that = this,
        Promise2 = undefined
    onrejected = typeof onrejected == 'function' ? onrejected : function (value) {
        return value
    }
    onfulfiled = onfulfiled ? onfulfiled : function (err) {
        throw new Error(err)
    }
    if (this.status == 'padding') {
        Promise2 = new Promisek((resolve, reject) => {
            that.fulfiledCallback.push(function () {
                let x = onfulfiled(that.value)
                resolvePromise(x, resolve, reject)
            })
            that.rejectedCallback.push(function () {
                let x = onrejected(that.value)
                resolvePromise(x, resolve, reject)
            })
        })
    } else if (this.status == 'fulfiled') {
        Promise2 = new Promisek((resolve, reject) => {
            let x = onfulfiled(that.value)
            resolvePromise(x, resolve, reject)
        })
    } else if (this.status == 'rejected') {
        Promise2 = new Promisek((resolve, reject) => {
            let x = onrejected(that.value)
            resolvePromise(x, resolve, reject)
        })
    }
    return Promise2
}

function resolvePromise(x, resolve, reject) {
    if (typeof x == 'Promise') {
        if (x.statue == 'padding') {
            x.then(function (y) {
                resolvePromise(y, resolve, reject)
            }, reject)
        } else if (x.status == 'fulfiled') {
            resolve(x.value)
        } else if (x.status == 'rejected') {
            reject(x.value)
        }
    } else if (x != null && (typeof x == 'object' || typeof x == 'function')) {
        try {
            let then = x.then
            if (typeof then == 'function') {
                then.call(x, function (y) {
                    resolvePromise(y, resolve, reject)
                })
            }
        } catch (err) {
            reject(err)
        }
    } else {
        resolve(x)
    }
}
// new Promisek((resolve,reject)=>{
//     return new Promise(()=>{
//         setTimeout(()=>{resolve(100)},1000)
//     })
// }).then((value)=>{
//     return value+100
// },(err)=>{
//     console.log(err)
// }).then((val)=>{
//     console.log(val)
// })
//create
Object.create = function (target, properties) {
    let newObj = undefined,
        fn = function () {}
    fn.prototype = target
    newObj = new fn()
    return newObj
}
//entrires
Object.entries1 = function (obj) {
    let objKeys = Object.keys(obj),
        i = objKeys.length,
        newArr = new Array(i)
    while (i-- && (i >= 0)) {
        newArr[i] = [objKeys[i], obj[objKeys[i]]]
    }
    return newArr
}
// console.log(Object.entries1({name:'张三',value:'12'}))
//New
function create() {
    let obj = new Object()
    let Con = [].shift.call(arguments)
    obj.__proto__ = Con.prototype
    let result = Con.apply(obj, arguments)
    return typeof result === 'object' ? result : obj
}
//函数防抖
function debounce(fn, delay) {
    let timer = undefined,
        context = this;
    return function (...arg) {
        if (timer) {
            clearTimeout(timer);
            timer = undefined
        }
        timer = setTimeout(() => {
            fn.call(context, arg)
        }, delay)
    }
}
//函数节流 
function throttle(fn, inter) {
    let timer, time = Date.now(),
        context = this
    return function (...arg) {
        if (timer) {
            clearTimeout(timer);
            timer = undefined
        }
        if (Date.now() - time >= inter) {
            fn.call(context, arg)
        } else {
            timer = setTimeout(() => {
                fn.call(context, arg)
            }, inter)
        }
    }
}
//深拷贝
function clone(value) {
    let result
    if (typeof value != 'object') return value
    if (typeof value == 'object' && typeof value != null) {
        if (Array.isArray1(value)) {
            result = [...value.map(x => {
                if (typeof x != null && (typeof x == 'object')) {
                    let v = clone(x)
                    return v
                }
                return x
            })]
        } else {
            result = {}
            for (let [key, val] of Object.entries1(value)) {
                if (typeof val != 'object') {
                    result[key] = val
                } else {
                    result[key] = clone(val)
                }
            }
        }
    }
    return result
}

function clone2(source,hash=new Map()){
    //null&undefind
    if(source == null)return source
    //正则
    if(source instanceof RegExp)return new RegExp(source)
    //时间
    if(source instanceof Date)return new Date(source)
    //基本类型
    if(typeof source != 'object')return source
    //是否循环引用
    if(hash.has(source))return hash.get(source)
    //是对象
    hash.set(source,newTarget)
    let newTarget=new source.constructor()
    for(let key of source){
        if(source.hasOwnProperty(key)){
            newTarget[key]=clone2(source[key],hash)
        }
    }
    return newTarget
}


//千分符
let red = /.^/
// console.log(red.test(''))
//正则
//1.匹配位置
//2.匹配内容
function thousandSeparator(str) {
    let reg = /(\d+)(\d{3})/g
    while (reg.test(str)) {
        str = str.replace(reg, (m, $1, $2, index, orign) => {
            return `${$1},${$2}`
        })
    }
    console.log(str)
}
/*
“先行断言”指的是，x只有在y前面才匹配，必须写成/x(?=y)/。比如，只匹配百分号之前的数字，要写成/\d+(?=%)/。
“先行否定断言”指的是，x只有不在y前面才匹配，必须写成/x(?!y)/
/\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]
*/

function thousandReg(str) {
    // let reg=/(?=\d{3}$)/g
    str += ''
    let regSplite = /^([\d]*)\.?([\d]*)$/,
        regInit = /(?!^)(?=(\d{3})+$)/g,//先行断言
        regDigit = /(?!$)(?<=^(\d{3})+)/g,//后行断言
        integer = str.replace(regSplite, '$1'),
        point = str.replace(regSplite, '$2'),
        number = []
    integer = integer && number.push(integer.replace(regInit, ','))
    point = point && number.push(point.replace(regDigit, ','))
    return number.join('.')
}
//递归
//排序
//1.冒泡
function bubbleSort(arr){
    console.time('bubbleSort耗时');
    for(let i=0;i<arr.length-1;i++){//控制循环次数
        for(let g=0;g<arr.length-i-1;g++){//值的对比
            let current=arr[g],next=arr[g+1]
            if(current>next){
                [arr[g+1],arr[g]]=[current,next]
            }
        }
    }
    console.timeEnd('bubbleSort耗时');
    return arr
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort(arr))
//2.选择排序
function selectionSort(arr){
    let len = arr.length;
    let minIndex, temp;
    console.time('选择排序耗时');
    for(let i=0;i<len-1;i++){
        minIndex=i
        for(let g=i+1;g<len;g++){
            if(arr[g]<arr[minIndex]){
                minIndex=g
            }
        }
        // if(minIndex!=1){
        //     temp = arr[i];
        //     arr[i] = arr[minIndex];
        //     arr[minIndex] = temp;
        // }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    console.timeEnd('选择排序耗时');
    return arr;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(selectionSort(arr))
//插入排序
function insertSort (arr){
    let len=arr.length
    console.time('插入排序耗时：');
    for(let i=1;i<len;i++){
        let g=i-1
        let tem=arr[i]
        while(g>=0&&arr[g]>tem){
            [arr[g],arr[g+1]]=[tem,arr[g]]
            g--
        }
    }
    console.timeEnd('插入排序耗时：');
    return arr;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// 3 38 44 5
console.log(insertSort(arr))
//3.希尔排序
//4.归并排序
//5.快速排序

function quickSort(arr,left,right){
    if (arr.length <= 1) { return arr; }

    　　var pivotIndex = Math.floor(arr.length / 2);
    
    　　var pivot = arr.splice(pivotIndex, 1)[0];
    
    　　var left = [];
    
    　　var right = [];
    
    　　for (var i = 0; i < arr.length; i++){
    
    　　　　if (arr[i] < pivot) {
    
    　　　　　　left.push(arr[i]);
    
    　　　　} else {
    
    　　　　　　right.push(arr[i]);
    
    　　　　}
    
    　　}
    　　return quickSort(left).concat([pivot], quickSort(right));
}

function quickSort(arr){
    if(arr.length<=1)return arr
    console.log(arr)
    let left=[],right=[]
    let middle=Math.floor(arr.length/2)
    console.log(middle)
    for(let i = 0; i< arr.length;i++){
        if(arr[i]>=arr[middle]){
            right.push(arr[i])
        }else{
            left.push(arr[i])
        }
    }
    console.log(left)
    console.log(right)
    return quickSort(left).concat(quickSort(right))
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(quickSort(arr))
//6.堆排序
//8.计数排序
//9.桶排序
//10.基数排序

//检索
//二叉树
//链表
// 数组方法
//forEach、Map、some,every,from,concat,copyWithin,fill,filter,find,findIndex,flat,
//flatMap,includes,indexOf,join,keys,lastIndexOf,pop,push,reduce,reduceRight,reverse,shift,sort,splice,values,unshift,toString
// 数组扁平化
function arrayFlay(arr) {
    return [].concat(...arr.map(val => !Array.isArray1(val) ? val : arrayFlay(val)))
}
Array.prototype.slice = function (start, end=this.length) {
    let Clone = []
    for (let i = start; i < end; i++) {
        Clone.push(this[i])
    }
    return Clone
}
Array.prototype.forEach = function (fn) {
    for (let i = 0; i < this.length; i++) {
        fn(this[i], i, this) && (this[i] = fn(this[i], i, this))
    }
}
Array.prototype.reduce1 = function (fn,init) {
    let len=this.length,result,k=0;
    if(this.length>=2){
        result=init
    }else{
        result=this[k]
        k++
    }
    while(k<len){
        result=fn(result,this[k],k,this)
        k++
    }
    return result
}

Array.prototype.splicek=function(start,n,item){
    let result,value=this.slice(0)
    this.length=start
    result=value.slice(start,start+n)
    Array.prototype.push.apply(this,[item,...value.slice(start+n)])
    return result
}

//fs删除非空文件夹1.深度优先(同步、异步:callback,promise) 2.广度优先
function delSync(dir, self = true) {
    let file = fs.readdirSync(dir)
    file.forEach(item => {
        let childpath = path.join(dir, item),
            child = fs.statSync(childpath)
        if (child.isDirectory()) {
            del(childpath)
        } else {
            fs.unlinkSync(childpath)
        }
    });
    fs.rmdirSync(dir)
}

function delASync(dir, del = true) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stat) => {
            if (err) return reject(err)
            if (stat.isDirectory()) {
                fs.readdir(dir, (err, child) => {
                    Promise.all(
                        child.filter(val => !ignore.includes(val)).map(item => {
                            return new Promise((resolve, reject) => {
                                delASync(path.join(dir, item)).then(() => {
                                    resolve(path.join(dir, item))
                                })
                            })
                        })
                    ).then((data) => {
                        if (del) {
                            fs.rmdir(dir, (err, data) => {
                                if (err) return reject(err)
                                resolve(data)
                            })
                        } else {
                            resolve('done')
                        }
                    })
                })
            } else {
                fs.unlink(dir, (err, data) => {
                    if (err) return reject(err)
                    resolve(data)
                })
            }
        })
    })
}
let copySync = function (src, dst) {
    let paths = fs.readdirSync(src);
    paths.forEach(function (val) {
        var _src = path.join(src, val)
        var _dst = path.join(dst, val)
        let stat = fs.statSync(_src)
        if (stat.isFile()) {
            let readable = fs.createReadStream(_src);
            let writable = fs.createWriteStream(_dst);
            readable.pipe(writable);
        } else {
            fs.access(_dst, fs.constants.F_OK, (err) => {
                if (err) {
                    fs.mkdirSync(_dst);
                    copySync(_src, _dst);
                } else {
                    copySync(_src, _dst);
                }
            });
        }
    });
}
let copy = function (src, dst) {
    return new Promise((resolve, reject) => {
        fs.stat(src, (err, stat) => {
            if (err) return reject(err)
            if (stat.isDirectory()) {
                fs.access(_dst, fs.constants.F_OK, (err) => {
                    if (err) {
                        fs.mkdirSync(_dst);
                        copy(_src, _dst);
                    } else {
                        copy(_src, _dst);
                    }
                });
            } else {
                let readable = fs.createReadStream(_src);
                let writable = fs.createWriteStream(_dst);
                readable.pipe(writable);
            }
            resolve('done')
        })
    })
}
//深度先序打印文件夹目录
//1.同步
function traversDirSync(dir) {
    const file = fs.readdirSync(dir)
    file.forEach(item => {
        const childpath = path.join(dir, item)
        const stat = fs.statSync(childpath)
        if (stat.isDirectory()) {
            traversDirSync(childpath)
        } else {
            console.log(childpath)
        }
    })
}
// traversDirSync(path.join('..','waterd'))
// traversDir(path.join('..','waterd'))
//2.异步
function traversDir(dir, cb) {
    console.log(dir)
    fs.readdir(dir, (err, files) => {
        if (err) return console.log(err) 
        !function next(i) {
            if (i > files.length - 1) return
            const childpath = path.join(dir, files[i])
            fs.stat(childpath, (err, stat) => {
                if (err) return console.log(err)
                if (stat.isDirectory()) {
                    traversDir(childpath, () => next(++i))
                } else {
                    console.log(childpath)
                    if (i == files.length - 1) {
                        cb && cb()
                    }
                    i++
                    next(i)
                }
            })
        }(0)
    })
}
//广度遍历
//1.同步
function breadthSync(dir) {
    const files = fs.readdirSync(dir),
        result = []
    let file = null
    while (file = files.shift()) {
        const filePath = path.join(dir, file)
        let stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
            files.push(...fs.readdirSync(filePath).map(val => path.join(filePath, val)))
        } else {
            result.push(filePath)
        }
    }
    return result
}
//2.异步
function breadth(dir) {
    const result = []
    fs.readdir(dir, (err, files) => {
        if (err) return console.log(err)
        !function next(files){
            let file=files.shift()
            if(!file)return
            const filePath = path.join(dir, file)
            fs.stat(filePath, (err, stat) => {
                if (err) return err
                if (stat.isDirectory()) {
                    files.push(breadth(filePath),()=>next(files))
                } else {
                    result.push(filePath)
                    if(files.length<0){
                        cb&cb()
                    }
                    console.log(result)
                    next(files)
                }
            })
        }(files)
        return result
    })
}

// console.log(breadth(path.join('..', 'water','waterd')))
// console.log(breadth(path.join('..','waterd')))


function flat1(arr){
    return [].concat(...arr.map(val=>Array.isArray(val)?flat1(val):val))
}
function flat2(arr){
    return arr.reduce((pre,cur)=>{
        pre.push(Array.isArray(cur)?flat2(cur):cur)
        return pre
    },[])
}
console.log(flat1([[1,2,3,4,[123]],5,6]))