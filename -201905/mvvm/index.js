function Mvvm(options = {}) {
    this.options = options
    const data = this._data = this.options.data
    observer(data)
    for (let [key, value] of Object.entries(data)) {
        Object.defineProperty(this, key, {
            enumerable: true,
            get() {
                return data[key]
            },
            set(newVal) {
                data[key] = newVal
            }
        })
    }
    getComputed(options.computed,this)
    compiler(this, this.options.el)
}
function getComputed(data,vm){
    for (key of Object.keys(data)){
        let fn=data[key].bind(vm)
        Object.defineProperty(vm,key,{
            enumerable:true,
            get(){
                return fn()
            }
        })
    }
}
function Dep(){
    this.subs=[]
}
Dep.prototype.addSub=function(sub){
    this.subs.push(sub)
}
Dep.prototype.notify=function(){
    this.subs.forEach(fn=>fn.upDate())
}
function Watcher(vm,expr,fn){
    this.vm=vm
    this.expr=expr
    this.fn=fn
    Dep.target=this
    let newVal = this.vm,getKey=expr.slice()
    while (key = getKey.shift()) {
        newVal = newVal[key]
    }
    Dep.target=null
}
Watcher.prototype.upDate=function(){
    let newVal = this.vm,getKey=this.expr.slice()
    while (key = getKey.shift()) {
        newVal = newVal[key]
    }
    this.fn(newVal)
}

function compiler(vm, $el) {
    let content = document.querySelector($el),
        fragment = document.createDocumentFragment(),
        child, newVal
    while (child = content.firstChild) {
        fragment.appendChild(child)
    }
    replace(fragment,vm)
    content.appendChild(fragment)
}
function replace(fragment,vm){
    Array.from(fragment.childNodes).forEach(node => {
        let expr,textContent=node.textContent.replace(/^\s*|\s*$/,'')
        if (node.nodeType == 3&&textContent) {//文本节点
            let key
            textContent.replace(/\{\{(.*)\}\}/, '$1')
            expr = RegExp.$1.split('.')
            newVal = vm
            while (key = expr.shift()) {
                newVal = newVal[key]
            }
            new Watcher(vm,RegExp.$1.split('.'),function(newVal){
                node.textContent = textContent.replace(/\{\{(.*)\}\}/, newVal)
            })
            node.textContent = textContent.replace(/\{\{(.*)\}\}/, newVal)
        }else if(node.nodeType==1){
            Array.from(node.attributes).forEach(attr=>{
                if(attr.nodeName.includes('v-')){
                    attr.nodeValue.replace(/\{(.*)\}/,'$1')
                    let expr=RegExp.$1.split('.'),val
                    val = vm
                    while (key = expr.shift()) {
                        val = val[key]
                    }
                    node.value=val
                    new Watcher(vm,RegExp.$1.split('.'),function(newVal){
                        node.value = newVal
                    })
                    node.addEventListener('input',(e)=>{
                        attr.nodeValue.replace(/\{(.*)\}/,'$1')
                        let expr=RegExp.$1.split('.'),val = vm
                        while ((expr.length>1)&&(key = expr.shift())) {
                            val = val[key]
                            if(expr.length==1)break
                        }
                        val[expr[0]]=e.target.value
                    })
                }
            })
            replace(node,vm)
        }
    })
}
function observer(data) {
    if(typeof data != 'object')return
    return new Observer(data)
}

function Observer(data) {
    for (let [key, value] of Object.entries(data)) {
        let dep=new Dep()
        observer(value)
        Object.defineProperty(data, key, {
            enumerable: true,
            get() {
                if(Dep.target){
                    dep.addSub(Dep.target)
                }
                return value
            },
            set(newVal) {
                value = newVal
                observer(newVal)
                dep.notify()
            }
        })
    }
}
