import React, { useState, useEffect, useRef } from 'react'

//1.每次渲染都保留上次的state
//2.惰性初始化
let numFn: any;
export default () => {
    function getState() {
        console.log('惰性初始化')
        return { a: 1 }
    }
    //默认参数的惰性初始化
    // function inert(init=getState()){
    //     console.log('init',init)
    // }
    // inert(1)
    // console.log('numFn',numFn === getState)
    // numFn = getState
    // let [num,setNum] = useState(getState)
    // useEffect(() => {
    //     setInterval(()=>{
    //         setNum(num=>({a:num.a+1}))
    //     },1000)
    // },[])
    //函数式更新
    const [number, setNumber] = useState(0);
    let numberRef = useRef(number);
    numberRef.current = number;
    function alertNumber() {
        setTimeout(() => {
            alert(numberRef.current);
        }, 3000);
    }
    function lazy() {
        setTimeout(() => {
            setNumber(number + 1);
        }, 3000);
    }
    function lazyFunc() {
        setTimeout(() => {
            setNumber(number => number + 1);
        }, 3000);
    }
    return (
        <>
            <p>{number}</p>
            <button onClick={() => setNumber(number + 1)}>+</button>
            <button onClick={lazy}>lazy+</button>
            <button onClick={lazyFunc}>lazyFunc+</button>
            <button onClick={alertNumber}>alertNumber</button>
        </>
    )
}