var promisesAplusTests = require("promises-aplus-tests");
const Promise = require('../Promise')  
const adapter={
    resolved:(y)=>new Promise((resolve,reject)=>{resolve(y)}),
    rejected:(r)=>new Promise((resolve,reject)=>{reject(r)}),
    deferred(){
        return { promise:new Promise(), resolve:(y)=>new Promise((resolve,reject)=>{resolve(y)}), reject:(r)=>new Promise((resolve,reject)=>{reject(r)})}
    }
}
promisesAplusTests(adapter, function (err) {
    if(err)console.log(err)
    console.lg('done')
    // All done; output is in the console. Or check `err` for number of failures.
});