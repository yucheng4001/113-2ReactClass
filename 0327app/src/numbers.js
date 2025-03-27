
import React, {useState} from 'react';

export default function Numbers() {
  const [number, setNumber] = useState(5);
  return (
    <>
        <button onClick={()=>setNumber(number+1)}>+1</button>
        <button onClick={()=>setNumber(number-1)}>+1</button>
        <p>{number}</p>
    </>
  );
}

export function NumbersWithLimitByCSS() {
  const [number, setNumber] = useState(5);
  return (
    <>
        {number < 15 && (
        <button onClick={() => setNumber(number + 1)}>+1</button>
      )}
      <p>{number}</p>
      {number > 0 && (
        <button onClick={() => setNumber(number - 1)}>-1</button>
      )}
        
    </>
  );
};


export function NumbersWithLimitByHTML() {
  const [number, setNumber] = useState(5);
  return (
    <>
        <button 
        style={{visibility:number>=15 &&'hidden'}} 
        onClick={()=>setNumber(number+1)}>+1</button>

        <p>{number}</p>

        <button 
        style={{visibility:number<=0 &&'hidden'}}
        onClick={()=>setNumber(number-1)}>+1</button>
        
    </>
  );
};

