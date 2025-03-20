import React, {useState} from 'react';

export default function Shopping() {
  const [Acc, setloginAcc] = useState('');
  const [passw,setpassw] = useState('')
  const [name,setname] = useState('')
  const [number, setNumber] = useState(0);
  const [number1, setNumber1] = useState(0);
  return (
    <>
        帳號:<input type='text' onChange={(e)=>{setloginAcc(e.target.value)}}></input><br></br>
        密碼:<input type='text' onChange={(e)=>{setpassw(e.target.value)}}></input><br></br>
        購買人:<input type='text' onChange={(e)=>{setname(e.target.value)}}></input>
        <p>帳號:{Acc}<br></br>密碼:{passw}<br></br>購買人:{name}</p>

        
        <h1>購物車</h1>
        <p>香蕉數量:
            <button onClick={()=>setNumber(number+1)}> +1 </button>
            {number}
            <button onClick={()=>setNumber(number-1)}> -1 </button>
            </p>

        <p>蘋果數量:
            <button onClick={()=>setNumber1(number1+1)}> +1 </button>
            {number1}
            <button onClick={()=>setNumber1(number1-1)}> -1 </button>
            </p>

        <button onClick={''}>購買</button>
    </>
  );
}