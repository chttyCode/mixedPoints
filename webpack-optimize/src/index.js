//1-2 css优化&图片优化
// import React from 'react'
// import ReactDom from 'react-dom'
// import './index.css'

// class Counter extends React.Component{
//     render(){
//         return <h1 className="logo">Hello</h1>
//     }
// }

// ReactDom.render(<Counter />,document.getElementById('root'))
// console.log('start')

//3.1cdn加载文件

// import $ from 'jquery'
// console.log($)

//4.tree-shaking&&scope-Hoisting 
// import {minus} from './tree-shaking'
// import test from './tree-shaking-side-effects'  //副作用 可能开发是无意义的
// import sum from './host-scope'

// console.log.log(minus(1,2))

// console.log(sum)

//5.动态链接库

// import React from 'react'
// import ReactDom from 'react-dom'
// import './index.css'

// class Counter extends React.Component{
//     render(){
//         return <h1 className="logo">Hello</h1>
//     }
// }

// ReactDom.render(<Counter />,document.getElementById('root'))


//6.动态加载

// let button = document.createElement('button')
// button.addEventListener('click',()=>{
//     console.log('点我')
//     import(/* webpackChunkName:'calc' */'./tree-shaking').then((data)=>{
//         console.log(data.add(1,2))
//     })
// })
// button.innerHTML='点我'
// document.body.appendChild(button)

