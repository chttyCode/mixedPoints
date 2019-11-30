import React,{useState,useEffect} from 'react';
export default function Counter(){
    const [name,setName] = useState('计数器');
    const [number,setNumber] = useState(0);
    const [obj,setObj] = useState({a:1});
    //依赖项为值类型
    useEffect(() => {
        console.log(number);
     }, [number]);
    //依赖项为引用类型
    useEffect(() => {
        console.log(obj);
     }, [obj]);
    //模拟componentDidMount componentWillUnmount
    useEffect(() => {
        console.log('componentDidMount');
        return()=>{
            console.log('componentWillUnmount')
        }
     }, []);
     
    return (
        <>
            <p>{name}:{number}</p>
             <button onClick={()=>setName('计数器'+Date.now())}>修改名称</button>
            <button onClick={()=>setNumber(number+1)}>+</button>
            <button onClick={()=>setObj(obj=>(Object.assign(obj,{a:obj.a+1})))}>{obj.a}</button>
        </>
    )
}