import React, {useState} from 'react';

export default function LoginMessages() {
  const [Acc, setloginAcc] = useState('');
  const [passw,setpassw] = useState('')
  const [email,setemail] = useState('')
  const [Verificationcode,setVerificationcode] = useState('')
  return (
    <>
        帳號:<input type='text' onChange={(e)=>{setloginAcc(e.target.value)}}></input><br></br>
        密碼:<input type='text' onChange={(e)=>{setpassw(e.target.value)}}></input><br></br>
        電郵:<input type='text' onChange={(e)=>{setemail(e.target.value)}}></input><br></br>
        驗證碼:<input type='text' onChange={(e)=>{setVerificationcode(e.target.value)}}></input><br></br>
        
        <p>帳號:{Acc}<br></br>密碼:{passw}<br></br>電郵:{email}<br></br>驗證碼:{Verificationcode}</p>
    </>
  );
}