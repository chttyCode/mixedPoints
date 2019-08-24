class Promise {
    // pending, fulfilled, or rejected.
    constructor( executor ){
        this.state='pending'
        this.value=null
        const _resolve=(value)=>{
            if(this.state=='pending'){
                this.state=='fulfilled'
                this.value=value
            }
        }
        const _reject=(value)=>{
            if(this.state=='pending'){
                this.state=='rejected'
                this.value=value
            }
        }
        try{
            executor(_resolve,_reject)
        }catch(e){
            _reject(e)
        }
    }

    static resolve(value){
    }
    static reject(value){
    }
}
module.exports=Promise