import logo from './logo.svg';
import './App.css';
import {React,useState,useRef} from 'react';

function App() {
  const txtitle = useRef();
  const hexcolor = useRef();
  const [studentnum,setstudentnum] = useState('123')

  const summit = e => {
    e.preventDefault();
    const title = txtitle.current.value;
    const color = hexcolor.current.value;
    console.log(title+color);
    console.log("summit");
    console.log(studentnum);
    txtitle.current.value = '';
    hexcolor.current.value = '#000000';
    
  }
  return (
    <div className="App">
      <form onSubmit={summit}>
        title:<input type="text" ref={txtitle} placeholder="請輸入標題" /><br></br>
        color:<input type="color" ref={hexcolor} /><br></br>
        輸入學號<input type='text' onChange={(e)=>{setstudentnum(e.target.value)}}></input><p>學號:{studentnum}</p><br></br>
        <button type="submit">送出</button>
      </form> 
    </div>
  );
}

export default App;
