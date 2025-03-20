
import React, {useState} from 'react';

export default function InputTexts() {
  const [text, setText] = useState('alan');
  const [num,setNum] = useState('123')
  return (
    <>
        輸入文字<input type='text' onChange={(e)=>{setText(e.target.value)}}></input><br></br>
        輸入數字<input type='text' onChange={(e)=>{setNum(e.target.value)}}></input>
        <p>文字:{text},數字:{num}</p>
    </>
  );
}

