class Promise{
    race(fns){
        return new Promise((resolve,reject)=>{
            fns.forEach(fn=>Promise.resolve(fn).then(resolve,reject))
        })
    }
    all(fns){
        return new Promise((resolve,reject)=>{
            const result= [],count=0
            ,saveData=(i,value)=>{
                result[i]=value
                count++
                if(count>=fns.length){
                    resolve(resolve)
                }
            }
            fns.forEach((fn,i)=>{
                Promise.resolve(fn).then(value=>{
                    saveData(i,value)
                },reject)
            })
        })
    }
    finally(callback){
        return this.then(value=>{
            return Promise.resolve(callback()).then(()=>value)
        },err=>{
            return Promise.resolve(callback()).then(()=>{throw err})
        })
    }
    static resolve(value){
        return new Promise((resolve,reject)=>{
            resolve(value)
        })
    }
}