//观察者
class Observer{
    constructor(){
        this.state='pading'
        this._arr=[]
    }
    addSub(fn){
        this._arr.push(fn)
    }
    setState(newValue){
        this._arr.forEach(fn=>fn.upDate(newValue,this.state))
        this.state=newValue
    }
}
class Wather{
    constructor(name){
        this.name=name
    }
    upDate(value,oldVlaue){
        console.log(`${this.name}get女孩的状态变化${value},之前的状态为${oldVlaue}`)
    }
}
const boy=new Wather('kds'),girl=new Observer()
girl.addSub(boy)
console.log(girl.state)
girl.setState('悲伤')
girl.setState('开心')