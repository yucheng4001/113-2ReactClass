import './App.css';
import React,{createContext,useState,useContext} from 'react';
import {MyText} from './myText';

export const AppContext =createContext();
export const ColorContext = createContext();
export const CountContext = createContext();
export const SizeContext = createContext();
function  App(){
  const [username,setUsername] = useState("hu");
  const [color,setcolor]=useState("gray");
  const [count,setCount] = useState(0);
  const [size,setsize] = useState(24);
  const addCount = (()=>{
    setCount(count+1);
  })
  const increasesize = (()=>{
    setsize(size+1);
  })
  return(
    <div  className="App">
      <ColorContext.Provider value={color}>
        <AppContext.Provider value={username}>
          <CountContext.Provider value={{count,addCount}}>
          <SizeContext.Provider value={size}>
            <MyText/>
          </SizeContext.Provider>
          </CountContext.Provider>  
        </AppContext.Provider>
      </ColorContext.Provider>
      

      <button onClick={e=>{setUsername("yucheng"); setcolor("blue");}}>yucheng</button>
      <button onClick={e=>{setUsername("hu"); setcolor("red");}}>hu</button>
      <button onClick={e=>{addCount()}}>+1+1</button>
      <button onClick={increasesize}>放大字體</button>
    </div>
  );
}
export default App;