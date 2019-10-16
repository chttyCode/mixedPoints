import './index.css'
import './b'
import Logo from './timg.jpeg'
let a = require('./a.module')
console.log(a)


let img = document.createElement('img')


img.src='./timg.jpeg'
// img.src=Logo

document.body.appendChild(img)


//将es6=>es5

const fn=()=>{
    console.log('babel')
}
fn()
@logger
class Animate{
    name='class'
}
function logger(target){
    console.log(target)
}
let fly = new Animate()
console.log(fly.name)

//API 不转化高级语法 实例上的语法 promise

console.log([1,23,5].includes(5))