import React, {useState, forwardRef ,useRef} from 'react'
function Child(props:any, ref:any) {
    return (
        <input type="text" ref={ref} />
    )
}
const ChildForward = forwardRef(Child);

export default function Parent() {
    let [number, setNumber] = useState(0);
    const inputRef:any = useRef();
    function getFocus() {
        inputRef.current.value = 'focus';
        inputRef.current.focus();
    }
    return (
        <>
            <p>use_ref_forward</p>
            <ChildForward ref={inputRef} />
            <button onClick={() => setNumber(number=>(number+1))}>+</button>
            <button onClick={getFocus}>获得焦点</button>
        </>
    )
}