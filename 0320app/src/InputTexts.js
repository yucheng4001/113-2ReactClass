
import React, {useState} from 'react';

export default function InputTexts() {
  const [text, setText] = useState('alan');
  const [num,setNum] = useState('123')
  const [studentnum,setstudentnum] = useState('123')
  const [studentName,setstudentName] = useState('123')
  return (
    <>
        輸入文字<input type='text' onChange={(e)=>{setText(e.target.value)}}></input><br></br>
        輸入數字<input type='text' onChange={(e)=>{setNum(e.target.value)}}></input>
        <p>文字:{text},數字:{num}</p>

        輸入學號<input type='text' onChange={(e)=>{setstudentnum(e.target.value)}}></input><br></br>
        輸入姓名<input type='text' onChange={(e)=>{setstudentName(e.target.value)}}></input><br></br>
        <p>學號:{studentnum},姓名:{studentName}</p>
    </>
  );
}

