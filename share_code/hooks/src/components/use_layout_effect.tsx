import React, { useState, useEffect, useRef,useLayoutEffect } from 'react'
export default function LayoutEffect() {
    const [color, setColor] = useState('red');
    useLayoutEffect(() => {
        alert(color);
        // setColor('green')
    });
    useEffect(() => {
        console.log('color', color);
        // setColor('green')
    });
    return (
        <>
            <div id="myDiv" style={{ background: color }}>颜色</div>
            <button onClick={() => setColor('red')}>红</button>
            <button onClick={() => setColor('yellow')}>黄</button>
            <button onClick={() => setColor('blue')}>蓝</button>
        </>
    );
}