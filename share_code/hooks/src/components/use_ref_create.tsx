
import React, { useState, useEffect, useRef ,createRef} from 'react';
export default function Parent() {
    let [number, setNumber] = useState(0 );
    console.log(number)
    return (
        <>
            <Child />
    <button onClick={() => setNumber(number=> (number + 1) )}> {number}</button>
        </>
    )
}
// vs createRef
let input: any;
function Child() {
    // const inputRef :any= useRef();
    const inputRef :any= createRef();

    console.log('input===inputRef', input === inputRef);
    input = inputRef;
    function getFocus() {
        inputRef.current.focus();
    }
    return (
        <>
            <p>use_ref_create_vs_useRef</p>
            <input type="text" ref={inputRef} />
            <button onClick={getFocus}>获得焦点</button>
        </>
    )
}