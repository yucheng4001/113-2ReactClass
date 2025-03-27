
import React, {useState} from 'react';

export default function Numbers() {
  const [number, setNumber] = useState(10);
  return (
    <>
        <button onClick={()=>setNumber(number+1)}>+1</button>
        <button onClick={()=>setNumber(number-1)}>+1</button>
        <p>{number}</p>
    </>
  );
}

