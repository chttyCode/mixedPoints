
class Dep{
    constructor(){
        this.subs=[]
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    nodify(){
        this.subs.forEach(watcher=>watcher.update())
    }
}

class Watcher{
    constructor(vm,expr,fn){
        this.fn=fn
        this.expr=expr
        Dep.target=this
        let val=vm
        expr.forEach(key=>{
            val=val[key]
        })
        Dep.target=null
    }
    update(){
        let val=vm,expr=this.expr
        expr.forEach(key=>{
            val=val[key]
        })
        this.fn(val)
    }
}
function Vue(options){
    this.options=options
    this.el=options.el
    const data=_data=this.options.data
    //数据劫持
    Observer(data)
    //数据代理
    for(let key in _data){
        Object.defineProperty(this,key,{
            enumerable:true,
            configurable:true,
            get(){
                return data[key]
            },
            set(val){
                data[key]=val
            }
        })
    }
    computed.call(this,this)
    //模板编译
    compiler.call(this,this)
    //发布订阅
    //双向绑定
    //computed缓存
}
function computed(vm){
    let computed=vm.options.computed
    for(let key in computed){
        let val=computed[key]
        Object.defineProperty(vm,key,{
            enumerable:true,
            configurable:true,
            get:typeof val=='function'?computed[key]:vm[key]
        })
    }
}
function Observer(data){
    for(let key in data){
        observer(data,key,data[key])
    }
}
function observer(data,key,value){
    if(typeof value == 'object')Observer(value)
    let dep=new Dep()
    if(key == 'a'){
        console.log(dep)
    }
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get(){
            Dep.target&&(dep.addSub(Dep.target))
            return value
        },
        set(val){
            if(typeof value == 'object')Observer(value)
            dep.nodify()
            value=val
        }
    })
}
function compiler(vm){
    let el=this.options.el,data=this.options.data,dom,child,fragment=document.createDocumentFragment()
    //el节点
    dom=document.querySelector(el)
    while(child=dom.firstChild){
        fragment.appendChild(child)
    }
    function renderHtml(node){
        Array.from(node.childNodes).forEach(node=>{
            if(node.nodeType==3&&node.textContent.trim()){//Element 或者 Attr 中实际的  文字
                let content=node.textContent.trim()
                content.replace(/\{\{(.*)\}\}/,'$1')
                let val=vm,expr=RegExp.$1.split('.')
                expr.forEach(key=>{
                    val=val[key]
                })
                node.textContent=content.replace(/\{\{(.*)\}\}/,val)
                new Watcher(vm,expr,(newVal)=>{
                    node.textContent=content.replace(/\{\{(.*)\}\}/,newVal)
                })
           }
            if(node.nodeType==1){//一个 元素 节点
                renderHtml(node)
                Array.from(node.attributes).forEach(name=>{
                    if(name.nodeName.startsWith('v-')){
                        expr=name.nodeValue.split('.')
                        let val=vm
                        expr.forEach(key=>{
                            val=val[key]
                        })
                        node.value=val
                        node.addEventListener('input',(e)=>{
                            expr=name.nodeValue.split('.')
                            let val=vm
                            while ((expr.length>1)&&(key = expr.shift())) {
                                val = val[key]
                                if(expr.length==1)break
                            }
                            val[expr[0]]=e.target.value
                        }) 
                    }
                })
            }
        })
    }
    renderHtml(fragment)
    dom.appendChild(fragment)
}
