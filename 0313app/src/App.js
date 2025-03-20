/* 1
import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';

function Hello(props){
  return(
    <div>
      <h1>hi,{props.name}</h1>
      <p>123</p>
    </div>
  )
}

function Accept(props){
  return(
    <div>
      <h1>你現在有,{props.number}</h1>
      <p>1234</p>
    </div>
  )
}

function App() {
  const [myMoney,addMyMoney]=useState(100);
  return (
    <div className='App'>
      <Hello name = 'andy'/>
      <Accept number={myMoney}/>
      <p onClick={e => {var currentMoney = myMoney + 100 ; addMyMoney(currentMoney);}}>更多錢</p>
      <p onClick={e => {var currentMoney = myMoney - 100 ; addMyMoney(currentMoney);}}>更少錢</p>
    </div>
  );
}

export default App;
*/

/*2
import './App.css';
import React from 'react';

function Compon(props){
  return(
    <h1>A Component. {props.item}</h1>
  );
}

const Compons = Array.from({length:4});
var ComponsList = [0,1,2,3,4,5,6,7,8,9];

function App(){
  return(
    <div>
      <main>

        <Compon item='A'/>
        <Compon item='B'/>
        <Compon item='C'/>
        <Compon item='D'/>

        {Compons.map(()=>(<Compon item='item'/>))}
        {ComponsList.map((_,index)=>(<Compon item={ComponsList[index]}/>))}

      </main>
    </div>
  )
}

export default App;
*/

/*
import './App.css';
import React from 'react';

function Compon(props){
  return(
    <ul>
      <li>{props.item}</li>
    </ul>
  );
}

const Compons = Array.from({length:3});
var ComponsList = ['第一項','第二項','第三項'];

function App(){
  return(
    <div>
      <main>

        {ComponsList.map((_,index)=>(<Compon item={ComponsList[index]}/>))}

      </main>
    </div>
  )
}

export default App;
*/

import './App.css';
import React from 'react';

function Compon(props){
  return(
    <ul>
      <li align='left'>{props.item}</li>
      <li align='left'>{props.item1}</li>
    </ul>
  );
}

const Compons = Array.from({length:5});
var ComponsList1 = ['A001','A002','A003','A004','A005'];
var ComponsList2 = ['EMY','LISA','JOHN','OSBORN','ELSA'];

function App(){
  return(
    <div className='App'>
      <main>
        
        {Compons.map((_,index)=>(<Compon item={ComponsList1[index]} item1={ComponsList2[index]}/>))}
        
      <hr></hr>

      <ol>
        {Compons.map((_,index)=>(
        <li key={index}>
          <h3 align='left'>student's num:{ComponsList1[index]} student's name:{ComponsList2[index]}</h3>
          </li>))}
      </ol>
      </main>
    </div>
  )
}

export default App;