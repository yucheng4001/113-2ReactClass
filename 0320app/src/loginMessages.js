import React, {useState} from 'react';

export default function LoginMessages() {
  const [Acc, setloginAcc] = useState('');
  const [passw,setpassw] = useState('')
  return (
    <>
        帳號:<input type='text' onChange={(e)=>{setloginAcc(e.target.value)}}></input><br></br>
        密碼:<input type='text' onChange={(e)=>{setpassw(e.target.value)}}></input>
        <p>帳號:{Acc}<br></br>密碼:{passw}</p>
    </>
  );
}