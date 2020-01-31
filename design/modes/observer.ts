export {}
abstract class Student {
    constructor(public teacher: Teacher) { }
    public abstract update();
}
class student_1 extends Student {
    public update() {
        console.log(this.teacher.getState() + ',抬头举手');
    }
}
class student_2 extends Student {
    public update() {
        console.log(this.teacher.getState() + ',低头祈祷');
    }
}

class Teacher {
    private students: Student[] = new Array<Student>();
    public state: string = '老师讲课'
    getState() {
        return this.state;
    }
    public askQuestion() {
        this.state = '老师提问';
        this.notifiy();
    }
    add(student: Student) {
        this.students.push(student);
    }
    notifiy() {
        this.students.forEach(student => student.update());
    }
}
let teacher = new Teacher();
teacher.add(new student_1(teacher));
teacher.add(new student_2(teacher));
teacher.askQuestion();

//1-1 自定义Dom事件

let event = new Event('build'),body  =  document.body;

// Listen for the event.
body.addEventListener('build', function (e) { }, false);

// Dispatch the event.
body.dispatchEvent(event);

//1-2

class Promise {
    private callbacks: Array<Function> = []
    constructor(fn) {
        let resolve = () => {
            this.callbacks.forEach(callback => callback())
        };
        fn(resolve);
    }
    then(callback) {
        this.callbacks.push(callback);
    }
}
let promise = new Promise(function (resolve) {
    setTimeout(function () {
        resolve(100);
    }, 1000);
});
promise.then(() => console.log(1));
promise.then(() => console.log(2));

//1-3 node event


class EventEmitter{
    private _events
    constructor() {
        this._events={};
    }
    on(type,listener) {
        let listeners=this._events[type];
        if (listeners) {
            listeners.push(listener);
        } else {
            this._events[type]=[listener];
        }
    }
    emit(type,...args) {
        let listeners=this._events[type];
        listeners.forEach(listener => listener(...args));
    }
}
let subject = new EventEmitter();
subject.on('click', function (name) {
    console.log(1, name);
});
subject.on('click', function (name) {
    console.log(2, name);
});
subject.emit('click', 'observer');



//1-4 stream node


let fs = require('fs');
let rs = fs.createReadStream('./1.txt', { highWaterMark: 3 });
rs.on('data', function (data) {
    console.log(data.toString());
});
rs.on('end', function () {
    console.log('end');
});


//1-5 http node
let http = require('http');
let server = http.createServer();
server.on('request', (req, res) => {
    res.end('observer');
});
server.listen(3000);


//1-6 react vue 生命周期

//1-7 vue 中的跨组件通信
    // eventBus
    let EventBus = new Vue();
    EventBus.$on("customEvent", name => {
        console.log(name);
    })
    EventBus.$emit("customEvent", 'observer')
    //A
    import EventBus from './EventBus';  
    EventBus.$on("customEvent", name => {
        console.log(name);
    })
    //B
    import EventBus from './EventBus';  
    EventBus.$emit("customEvent", 'observer')

//1-8 vue响应式 mvvm.js

//1-9 redux redux


//1-10 发布订阅

class publicSubscribe{
    private subs
    constructor(){
        this.subs=[]
    }
    sub(sub){
        this.subs.push(sub)
    }
    notifiy(...args){
        this.subs.forEach(fn=>fn(...args))
    }
}
let fetchEvent=new publicSubscribe(),parmas={},getParma=(key,value)=>{
    parmas[key]=value
    if(Object.keys(parmas).length>=2){
        console.log('fetch person msg')
    }
}
fetchEvent.sub(getParma)
function fetchApi (ms,key,value){
    setTimeout(()=>{
        fetchEvent.notifiy(key,value)
    },ms)
}
fetchApi(1000,'name','kds')
fetchApi(1000,'age','18')
