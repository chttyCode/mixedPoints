import React, {useState, forwardRef ,useRef,useImperativeHandle} from 'react'
function Child(props:any,ref:any){
    const inputRef = useRef() as any ;
    useImperativeHandle(ref,()=>(
      {
        focus(){
          inputRef.current.focus();
        }
      }
    ));
    return (
      <input type="text" ref={inputRef}/>
    )
  }
  const ChildForward = forwardRef(Child);
  
  
export default  function Parent(){
    let [number,setNumber] = useState(0); 
    const inputRef = useRef() as any;
    function getFocus(){
      console.log(inputRef.current);
      inputRef.current.value = 'focus';
      inputRef.current.focus();
    }
    return (
        <>
            <p> use_imperative_handle</p>
          <ChildForward ref={inputRef}/>
          <button onClick={()=>setNumber(number=>(number+1))}>+</button>
          <button onClick={getFocus}>获得焦点</button>
        </>
    )
  }