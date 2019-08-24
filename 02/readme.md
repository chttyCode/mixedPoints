# 异步解决方案

- 回调函数(Callback)
  
    ```JS
        ajax(url1, () => {
                // 处理逻辑
                ajax(url2, () => {
                    // 处理逻辑
                })
            })
        })
    ```

- 哨兵&计数器
  
    ```JS
        function read(file){
            fs.readFile(path.join(__dirname,file),'utf-8',(err,data)=>{
                sentry(file,data)
            })
        }
        function fetchMsg(params){
            console.log(params)
            console.log('fetch params')
        }
        const result={};
        function sentry(key,value) {
            result[key] = value
            if(Object.keys(result).length>=2){
                fetchMsg(result)
            }
        }
        read('tel.txt')
        read('ad.txt')
    ```

- 发布订阅
 
    ```JS
        class Pub{
            constructor(){
                this.subs=[]
            }
            addSub(fn){
                this.subs.push(fn)
            }
            nodity(...arg){
                this.subs.forEach(fn=>fn(...arg))
            }
        }

        function read(file){
            fs.readFile(path.join(__dirname,file),'utf-8',(err,data)=>{
                getMsg.nodity(file,data)
            })
        }
        function fetchMsg(params){
            console.log(params)
            console.log('fetch params')
        }
        const getMsg=new Pub(),result={}

        getMsg.addSub((key,value)=>{
            result[key] = value
            if(Object.keys(result).length>=2){
                fetchMsg(result)
            }
        })
        read('tel.txt')
        read('ad.txt')
    ```

- Promise/A+
  
    ```JS
        ajax(url)
        .then(res => {
            console.log(res)
            return ajax(url1)
        }).then(res => {
            console.log(res)
            return ajax(url2)
        }).then(res => console.log(res))
    ```

- 生成器Generators/ yield
  
    ```JS
        function read(file){
            return fs.readFileSync(path.join(__dirname,file),'utf-8')
        }

        function fetchMsg(params){
            console.log(params)
            console.log('fetch params')
        }


        function * personMsg(){
            let ad = yield read('ad.txt')
            let tel = yield read('tel.txt')
            let result = {'ad.txt':ad,'tel.txt':tel}
            fetchMsg(result)
        }
        let it=personMsg()

        let {value:ad} = it.next()
        let {value:tel}= it.next(ad)
        it.next(tel)


        /**
         * generator & iterator
         */

        let obj = {0:1,1:2,3:4,length:5}

        console.log(Array.from(obj))
        console.log([...obj])   //   obj is not Iterator

    ```

- async/await

    ```JS
        // function read(file){
        //     return fs.readFileSync(path.join(__dirname,file),'utf-8')
        // }

        // function read(file){
        //     fs.readFile(path.join(__dirname,file),'utf-8',(err,data)=>{
        //        return data
        //     })
        // }

        function read(file){
            return new Promise((resolve,reject)=>{
                fs.readFile(path.join(__dirname,file),'utf-8',(err,data)=>{
                    resolve(data)
                })
            })
        }

        function fetchMsg(params){
            console.log(params)
            console.log('fetch params')
        }


        async function personMsg(){
            let ad = await read('ad.txt')
            let tel = await read('tel.txt')
            let result = {'ad.txt':ad,'tel.txt':tel}
            fetchMsg(result)
        }
        personMsg()
    ```